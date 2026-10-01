import React, { useState, useRef, useEffect } from 'react';
import { SupervisionSession } from '../types/supervision';
import { 
  Bot, 
  Send, 
  Sparkles, 
  User, 
  Copy, 
  Check, 
  AlertCircle,
  HelpCircle,
  MessageSquare
} from 'lucide-react';

interface AiAssistantChatbotProps {
  session: SupervisionSession;
}

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  timestamp: string;
}

export const AiAssistantChatbot: React.FC<AiAssistantChatbotProps> = ({ session }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      text: `Assalamu'alaikum wr. wb. Saya adalah Asisten AI Supervisor Akademik untuk guru ${session.profile.namaGuru} (${session.profile.mataPelajaran}).\n\nSaya telah menelaah seluruh dokumen dan observasi video pembelajaran ini. Anda dapat menanyakan bukti indikator, analisis menit tertentu, perbandingan perangkat vs praktik, atau meminta draf narasi supervisi resmi.`,
      timestamp: 'Baru saja'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const quickPrompts = [
    'Apa bukti bahwa pembelajaran sudah berpusat pada siswa?',
    'Tampilkan indikator yang mendapat skor 1 dan 2.',
    'Bandingkan perangkat pembelajaran dengan pelaksanaan di video.',
    'Tampilkan evidence pada menit 10 sampai 25.',
    'Buatkan narasi resmi hasil supervisi untuk laporan madrasah.',
    'Apa rekomendasi prioritas utama untuk guru ini?'
  ];

  const handleSend = async (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      role: 'user',
      text: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputText('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMsg.text,
          sessionData: session,
          chatHistory: messages.map(m => ({ role: m.role, text: m.text }))
        })
      });

      const data = await response.json();
      
      const assistantMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        role: 'assistant',
        text: data.reply || data.error || 'Maaf, data belum cukup untuk menjawab pertanyaan tersebut.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, assistantMsg]);
    } catch (err: any) {
      setMessages(prev => [
        ...prev,
        {
          id: `ai-err-${Date.now()}`,
          role: 'assistant',
          text: 'Terjadi gangguan jaringan saat menghubungi AI Supervisor Assistant. Silakan coba lagi.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="bg-white rounded-xl shadow-xs border border-slate-200 overflow-hidden flex flex-col h-[700px]">
      
      {/* Chat Header */}
      <div className="bg-gradient-to-r from-emerald-800 to-teal-800 text-white p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-emerald-700/80 flex items-center justify-center border border-emerald-500/40">
            <Bot className="w-5 h-5 text-emerald-200" />
          </div>
          <div>
            <h3 className="font-bold text-sm flex items-center gap-1.5">
              <span>Asisten AI Supervisor Akademik</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            </h3>
            <p className="text-[11px] text-emerald-200">
              Grounded Evidence-Based Assistant • Guru: {session.profile.namaGuru}
            </p>
          </div>
        </div>

        <div className="text-right text-[11px] text-emerald-200 hidden sm:block">
          <div>Nilai Akhir: <b className="text-amber-300">{session.overallScore}%</b></div>
          <div>Status: <span className="text-emerald-100">{session.crossAnalysis.keselarasanUmum}</span></div>
        </div>
      </div>

      {/* Suggested Quick Prompts */}
      <div className="p-3 bg-slate-50 border-b border-slate-200 overflow-x-auto flex items-center gap-2">
        <span className="text-[11px] font-bold text-slate-500 whitespace-nowrap flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Tanya Cepat:
        </span>
        {quickPrompts.map((prompt, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => handleSend(prompt)}
            className="px-2.5 py-1 rounded-full bg-white hover:bg-emerald-50 border border-slate-300 hover:border-emerald-300 text-slate-700 hover:text-emerald-800 text-[11px] whitespace-nowrap transition-colors shadow-2xs cursor-pointer"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-50/50">
        {messages.map((msg) => {
          const isUser = msg.role === 'user';
          return (
            <div
              key={msg.id}
              className={`flex items-start gap-2.5 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
            >
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-xs font-bold ${
                  isUser 
                    ? 'bg-slate-800 text-white' 
                    : 'bg-emerald-700 text-white shadow-xs'
                }`}
              >
                {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              <div className={`relative max-w-[85%] sm:max-w-[75%] rounded-2xl p-3.5 text-xs leading-relaxed ${
                isUser
                  ? 'bg-slate-800 text-white rounded-tr-xs'
                  : 'bg-white text-slate-800 border border-slate-200 shadow-2xs rounded-tl-xs'
              }`}>
                <div className="whitespace-pre-wrap font-sans">
                  {msg.text}
                </div>

                <div className="flex items-center justify-between gap-3 mt-2 pt-1 border-t border-slate-100/50 text-[10px] text-slate-400">
                  <span>{msg.timestamp}</span>
                  {!isUser && (
                    <button
                      type="button"
                      onClick={() => handleCopy(msg.id, msg.text)}
                      className="text-slate-400 hover:text-slate-600 flex items-center gap-1 font-sans cursor-pointer"
                    >
                      {copiedId === msg.id ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-600" />
                          <span className="text-emerald-600">Disalin</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Salin</span>
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {isLoading && (
          <div className="flex items-start gap-2.5">
            <div className="w-7 h-7 rounded-full bg-emerald-700 text-white flex items-center justify-center shrink-0">
              <Bot className="w-4 h-4" />
            </div>
            <div className="bg-white border border-slate-200 rounded-2xl p-3 text-xs text-slate-500 flex items-center gap-2 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-ping"></span>
              <span>Menganalisis data supervisi dan evidence...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Box */}
      <div className="p-3 bg-white border-t border-slate-200">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Tanyakan hal spesifik tentang bukti dokumen, timestamp menit video, atau rekomendasi..."
            disabled={isLoading}
            className="flex-1 py-2.5 px-3.5 text-xs rounded-xl border border-slate-300 focus:outline-emerald-600 focus:border-emerald-600 bg-slate-50"
          />
          <button
            type="submit"
            disabled={isLoading || !inputText.trim()}
            className="p-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white font-bold transition-colors shadow-xs"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
        <div className="flex items-center justify-between text-[10px] text-slate-400 mt-1 px-1">
          <span>AI berpedoman pada aturan anti-halusinasi: tidak mengarang bukti yang tidak tercantum dalam data.</span>
          <span>Tekan Enter untuk mengirim</span>
        </div>
      </div>

    </div>
  );
};
