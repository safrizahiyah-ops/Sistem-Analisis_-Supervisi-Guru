import mammoth from 'mammoth';

/**
 * Utility to extract plain text from uploaded files (DOCX, PDF, TXT, MD, etc.)
 */
export async function extractTextFromFile(file: File): Promise<{ text: string; pageEstimate?: number }> {
  const fileName = file.name.toLowerCase();

  // 1. Plain text formats (.txt, .md, .csv, .json, .html, .rtf)
  if (
    fileName.endsWith('.txt') || 
    fileName.endsWith('.md') || 
    fileName.endsWith('.csv') || 
    fileName.endsWith('.json') || 
    fileName.endsWith('.html') ||
    file.type.startsWith('text/')
  ) {
    const text = await file.text();
    return { text: text.trim() };
  }

  // 2. Modern Word Document (.docx)
  if (fileName.endsWith('.docx') || file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
    try {
      const arrayBuffer = await file.arrayBuffer();
      const result = await mammoth.extractRawText({ arrayBuffer });
      const extracted = result.value.trim();
      if (extracted.length > 20) {
        return { text: extracted };
      }
    } catch (err) {
      console.warn('Client-side mammoth extraction failed, falling back to server /api/extract:', err);
    }
  }

  // 3. PDF or legacy .doc or fallback: Send base64 to server /api/extract
  try {
    const base64 = await fileToBase64(file);
    const response = await fetch('/api/extract', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fileName: file.name,
        fileType: file.type,
        base64Data: base64
      })
    });

    if (response.ok) {
      const data = await response.json();
      if (data.text && data.text.trim().length > 0) {
        return { text: data.text.trim(), pageEstimate: data.pageEstimate };
      }
    }
  } catch (serverErr) {
    console.warn('Server-side extraction failed:', serverErr);
  }

  // 4. Binary text fallback: Extract readable ASCII/Unicode text strings from file
  try {
    const buffer = await file.arrayBuffer();
    const bytes = new Uint8Array(buffer);
    let str = '';
    let currentWord = '';
    
    // Scan readable characters
    for (let i = 0; i < Math.min(bytes.length, 500000); i++) {
      const charCode = bytes[i];
      // Printable ASCII or newline/tab
      if ((charCode >= 32 && charCode <= 126) || charCode === 10 || charCode === 13) {
        currentWord += String.fromCharCode(charCode);
      } else {
        if (currentWord.length >= 4) {
          str += currentWord + ' ';
        }
        currentWord = '';
      }
    }
    if (currentWord.length >= 4) str += currentWord;

    const cleaned = str.replace(/[\x00-\x1F\x7F-\x9F]/g, ' ').replace(/\s+/g, ' ').trim();
    if (cleaned.length > 50) {
      return { text: `[Teks diekstraksi dari ${file.name}]:\n${cleaned.slice(0, 15000)}` };
    }
  } catch (binErr) {
    console.warn('Binary string fallback failed:', binErr);
  }

  return { text: `[Dokumen ${file.name} (${Math.round(file.size / 1024)} KB) berhasil diunggah untuk analisis supervisi].` };
}

/**
 * Converts File to Base64 string
 */
export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      const base64 = result.includes(',') ? result.split(',')[1] : result;
      resolve(base64);
    };
    reader.onerror = error => reject(error);
    reader.readAsDataURL(file);
  });
}
