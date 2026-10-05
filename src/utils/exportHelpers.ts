import { SupervisionSession } from '../types/supervision';
import { calculateScores } from '../data/indicatorsData';

/**
 * Exports supervision data as Word Document (.doc format compatible with MS Word)
 */
export function exportToWord(session: SupervisionSession) {
  const { componentSummaries, overallScore } = calculateScores(session.indicators);

  const htmlContent = `
  <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
  <head>
    <meta charset="utf-8">
    <title>Laporan Supervisi Akademik - ${session.profile.namaGuru}</title>
    <style>
      body { font-family: 'Calibri', 'Arial', sans-serif; font-size: 11pt; line-height: 1.5; color: #1e293b; }
      h1 { font-size: 18pt; color: #065f46; text-align: center; margin-bottom: 4px; }
      h2 { font-size: 13pt; color: #0f766e; border-bottom: 2px solid #0f766e; padding-bottom: 4px; margin-top: 24px; }
      h3 { font-size: 11pt; color: #1e293b; margin-top: 14px; }
      table { width: 100%; border-collapse: collapse; margin-top: 10px; margin-bottom: 16px; }
      th, td { border: 1px solid #cbd5e1; padding: 6px 10px; font-size: 10pt; text-align: left; }
      th { background-color: #f1f5f9; color: #0f172a; font-weight: bold; }
      .text-center { text-align: center; }
      .badge { display: inline-block; padding: 2px 6px; font-size: 9pt; border-radius: 4px; font-weight: bold; }
      .badge-green { background-color: #d1fae5; color: #065f46; }
      .badge-blue { background-color: #e0f2fe; color: #0369a1; }
      .badge-amber { background-color: #fef3c7; color: #92400e; }
      .badge-red { background-color: #fee2e2; color: #991b1b; }
      .badge-rose { background-color: #ffe4e6; color: #9f1239; }
      .box { border: 1px solid #e2e8f0; background-color: #f8fafc; padding: 12px; border-radius: 6px; margin-bottom: 12px; }
      .arabic { font-family: 'Traditional Arabic', 'Amiri', 'Scheherazade', serif; font-size: 14pt; direction: rtl; text-align: right; color: #064e3b; }
      .signature-table td { border: none; padding: 20px 10px; text-align: center; }
    </style>
  </head>
  <body>
    <h1>LAPORAN ANALISIS PEMBELAJARAN GURU</h1>
    <p class="text-center" style="font-size: 12pt; color: #475569; margin-top: 0;">
      Supervisi Akademik Berbasis 6 Indikator Terpadu Dokumen, Video, & Khazanah Tarbiyah Islamiyah
    </p>
    <hr style="border: 0; border-top: 2px solid #065f46; margin-bottom: 20px;" />

    <h2>I. IDENTITAS GURU & SUPERVISI</h2>
    <table>
      <tr><th width="30%">Nama Guru</th><td><b>${session.profile.namaGuru}</b></td></tr>
      <tr><th>NIP / NUPTK</th><td>${session.profile.nipNuptk || '-'}</td></tr>
      <tr><th>Madrasah / Sekolah</th><td>${session.profile.madrasahSekolah}</td></tr>
      <tr><th>Mata Pelajaran</th><td>${session.profile.mataPelajaran}</td></tr>
      <tr><th>Kelas / Fase</th><td>${session.profile.kelas} (${session.profile.fase})</td></tr>
      <tr><th>Tahun Pelajaran / Semester</th><td>${session.profile.tahunPelajaran} - Semester ${session.profile.semester}</td></tr>
      <tr><th>Topik Pembelajaran</th><td>${session.profile.topikPembelajaran || '-'}</td></tr>
      <tr><th>Jenis Supervisi</th><td>${session.profile.jenisSupervisi}</td></tr>
      <tr><th>Nama Supervisor</th><td>${session.profile.namaSupervisor}</td></tr>
      <tr><th>Tanggal Supervisi</th><td>${session.profile.tanggalSupervisi}</td></tr>
      <tr><th>Nilai Akhir Supervisi</th><td><b style="font-size: 14pt; color: #065f46;">${overallScore}%</b></td></tr>
    </table>

    <h2>II. PROFIL SKOR 6 KOMPONEN SUPERVISI</h2>
    <table>
      <thead>
        <tr>
          <th>No</th>
          <th>Komponen Pembelajaran</th>
          <th class="text-center">Skor Diperoleh</th>
          <th class="text-center">Skor Maksimal</th>
          <th class="text-center">Rata-rata</th>
          <th class="text-center">Keterpenuhan (%)</th>
        </tr>
      </thead>
      <tbody>
        ${componentSummaries.map((c, i) => `
          <tr>
            <td class="text-center">${i + 1}</td>
            <td><b>${c.nama}</b></td>
            <td class="text-center">${c.totalSkorDiperoleh}</td>
            <td class="text-center">${c.totalSkorMaksimal}</td>
            <td class="text-center">${c.skorRataRata} / 4.00</td>
            <td class="text-center"><b>${c.persentase}%</b></td>
          </tr>
        `).join('')}
      </tbody>
    </table>

    <h2>III. TEMUAN UTAMA & RINGKASAN EKSEKUTIF</h2>
    <h3>A. Kekuatan Utama</h3>
    <ul>
      ${session.summary.kekuatanUtama.map(k => `<li>${k}</li>`).join('')}
    </ul>

    <h3>B. Area yang Perlu Ditingkatkan</h3>
    <ul>
      ${session.summary.areaPerluDitingkatkan.map(a => `<li>${a}</li>`).join('')}
    </ul>

    <h3>C. Konsistensi Dokumen & Video</h3>
    <div class="box">
      <b>Status Keselarasan:</b> ${session.crossAnalysis.keselarasanUmum}<br/>
      <p>${session.crossAnalysis.catatanKeselarasan}</p>
    </div>

    <h2>IV. ANALISIS DETAIL 36 INDIKATOR SUPERVISI</h2>
    <table>
      <thead>
        <tr>
          <th width="8%">Kode</th>
          <th width="30%">Indikator</th>
          <th width="8%" class="text-center">Skor</th>
          <th width="27%">Bukti & Sumber Autentik</th>
          <th width="27%">Analisis & Rekomendasi</th>
        </tr>
      </thead>
      <tbody>
        ${session.indicators.map(ind => {
          const score = ind.diverifikasiSupervisor && ind.skorSupervisor !== undefined ? ind.skorSupervisor : ind.skorAi;
          return `
            <tr>
              <td class="text-center"><b>${ind.id}</b></td>
              <td>
                <b>${ind.namaIndikator}</b><br/>
                <small style="color: #64748b;">${ind.statusKeterpenuhan}</small>
                ${ind.diverifikasiSupervisor ? '<br/><span class="badge badge-blue">Diverifikasi Supervisor</span>' : ''}
              </td>
              <td class="text-center">
                <b style="font-size: 12pt;">${score}</b>/4
              </td>
              <td>
                <b>Sumber:</b> ${ind.sumberBukti || 'Bukti belum ditemukan'}<br/>
                ${ind.documentEvidence ? `<small><b>Dok:</b> "${ind.documentEvidence.kutipanTeks}"</small><br/>` : ''}
                ${ind.videoEvidence ? `<small><b>Video (${ind.videoEvidence.timestamp}):</b> ${ind.videoEvidence.transkrip || ind.videoEvidence.aktivitasTerdeteksi}</small>` : ''}
              </td>
              <td>
                <small><b>Alasan:</b> ${ind.alasanSkor}</small><br/>
                ${ind.rekomendasi ? `<small style="color: #065f46;"><b>Rekomendasi:</b> ${ind.rekomendasi.tindakanDisarankan}</small>` : ''}
              </td>
            </tr>
          `;
        }).join('')}
      </tbody>
    </table>

    <h2>V. ANALISIS POTONGAN ADEGAN VIDEO & IMPLEMENTASI PANCA CINTA (KBC)</h2>
    <div class="box">
      <b>Evaluasi Kurikulum Berbasis Cinta (KBC):</b><br/>
      ${session.pancaCintaSummary?.catatanKurikulumBerbasisCinta || 'Pembelajaran mengintegrasikan nilai Panca Cinta dalam lakon tindakan dan tutur kata santun.'}
    </div>
    <table>
      <thead>
        <tr>
          <th width="10%">Waktu</th>
          <th width="15%">Fase Kegiatan</th>
          <th width="25%">Potongan Adegan Visual yang Dilakonkan</th>
          <th width="30%">Kalimat / Teks Unsur Cinta yang Diucapkan</th>
          <th width="20%">Pilar Panca Cinta (KBC) & Makna</th>
        </tr>
      </thead>
      <tbody>
        ${session.timeline.map((seg) => `
          <tr>
            <td class="text-center"><b>${seg.timeRange}</b></td>
            <td><b>${seg.faseKegiatan}</b><br/><small style="color: #64748b;">Kamera: ${seg.sceneSnapshot?.fokusKamera || '-'}</small></td>
            <td>
              <b>${seg.sceneSnapshot?.title || '-'}</b><br/>
              <small><b>Adegan:</b> ${seg.sceneSnapshot?.adeganKunci || seg.deskripsiAktivitas}</small>
            </td>
            <td>
              ${seg.pancaCintaKbc ? `
                <div style="background-color: #fff1f2; padding: 4px 6px; border-left: 3px solid #e11d48; margin-bottom: 4px;">
                  <i style="color: #881337;">"${seg.pancaCintaKbc.kalimatUcapanLakon}"</i>
                </div>
                <small><b>Aksi Lakon:</b> ${seg.pancaCintaKbc.deskripsiLakon}</small>
              ` : `<small style="color: #64748b;">"${seg.transkripExcerpt}"</small>`}
            </td>
            <td>
              ${seg.pancaCintaKbc ? `
                <span class="badge badge-rose">${seg.pancaCintaKbc.pilar}</span><br/>
                <small style="color: #065f46;"><b>Makna:</b> ${seg.pancaCintaKbc.maknaPedagogis}</small>
              ` : '<span style="color: #94a3b8;">-</span>'}
            </td>
          </tr>
        `).join('')}
      </tbody>
    </table>

    ${session.deepLearning ? `
    <h2>VI. ANALISIS MENDALAM (DEEP LEARNING) & TAKSONOMI BERPIKIR TINGKAT TINGGI</h2>
    <table>
      <tr>
        <th width="35%">Tingkat Berpikir (Taksonomi Bloom)</th>
        <td>
          Mengingat & Memahami (C1-C2): <b>${session.deepLearning.bloomLevelDistribution.mengingatMemahami}%</b><br/>
          Menerapkan (C3): <b>${session.deepLearning.bloomLevelDistribution.menerapkan}%</b><br/>
          Menganalisis & Mengevaluasi (C4-C5 HOTS): <b>${session.deepLearning.bloomLevelDistribution.menganalisisMengevaluasi}%</b><br/>
          Mencipta & Berkreasi (C6 HOTS): <b>${session.deepLearning.bloomLevelDistribution.menciptaKreasi}%</b>
        </td>
      </tr>
      <tr>
        <th>Level & Kedalaman Metakognisi</th>
        <td><b>${session.deepLearning.levelMetakognisi}</b> (Skor: ${session.deepLearning.skorKedalamanMetakognisi}/100)</td>
      </tr>
      <tr>
        <th>Transfer Belajar ke Kehidupan Nyata</th>
        <td>${session.deepLearning.transferBelajarKehidupanNyata}</td>
      </tr>
      <tr>
        <th>Student Agency & Kemandirian Belajar</th>
        <td>${session.deepLearning.studentAgencyDanKemandirian}</td>
      </tr>
      <tr>
        <th>Catatan Analisis Mendalam</th>
        <td><i>"${session.deepLearning.catatanAnalisisMendalam}"</i></td>
      </tr>
    </table>
    ` : ''}

    ${session.turatsStudy ? `
    <h2>VII. KAJIAN AYAT AL-QUR'AN, HADITS NABAWI, & KITAB TURATS PENDIDIKAN</h2>
    
    <h3>A. Rujukan Ayat-Ayat Al-Qur'an Al-Karim</h3>
    ${session.turatsStudy.ayatAlQuran.map(a => `
      <div class="box">
        <b>${a.suratAyat}</b>
        <p class="arabic">${a.teksArab}</p>
        <p><i>${a.terjemah}</i></p>
        <small><b>Tafsir Kontekstual:</b> ${a.tafsirKontekstual}</small><br/>
        <small style="color: #065f46;"><b>Kaitan Pedagogis:</b> ${a.kaitanPedagogis}</small>
      </div>
    `).join('')}

    <h3>B. Rujukan Hadits Nabawi</h3>
    ${session.turatsStudy.haditsNabawi.map(h => `
      <div class="box">
        <b>${h.perawi}</b>
        <p class="arabic">${h.matanArab}</p>
        <p><i>${h.terjemah}</i></p>
        <small><b>Hikmah Tarbiyah:</b> ${h.hikmahTarbiyah}</small><br/>
        <small style="color: #065f46;"><b>Kaitan Pedagogis:</b> ${h.kaitanPedagogis}</small>
      </div>
    `).join('')}

    <h3>C. Rujukan Khazanah Kitab Turats Klasik</h3>
    ${session.turatsStudy.kitabTurats.map(k => `
      <div class="box">
        <b>${k.judulKitab}</b> - Karya: ${k.pengarang} (${k.babKutipan})
        <p class="arabic">${k.teksNaskah}</p>
        <p><small><b>Syarah Pedagogis:</b> ${k.syarahPedagogis}</small></p>
        <small style="color: #065f46;"><b>Implementasi Supervisi:</b> ${k.kaitanPedagogis}</small>
      </div>
    `).join('')}

    <div class="box" style="background-color: #ecfdf5; border-color: #a7f3d0;">
      <b>Sintesis Tarbiyah Islamiyah:</b><br/>
      <i>"${session.turatsStudy.kesimpulanTarbiyahIslamiyah}"</i>
    </div>
    ` : ''}

    <h2>VIII. RENCANA TINDAK LANJUT (RTL)</h2>
    <table>
      <thead>
        <tr>
          <th>Prioritas</th>
          <th>Indikator</th>
          <th>Kondisi Saat Ini</th>
          <th>Tindakan Perbaikan</th>
          <th>Target</th>
          <th>Waktu</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        ${session.followUpPlans.map(p => `
          <tr>
            <td class="text-center"><b>${p.prioritas}</b></td>
            <td><b>${p.indikator}</b></td>
            <td><small>${p.kondisiSaatIni}</small></td>
            <td><small>${p.tindakanPerbaikan}</small></td>
            <td><small>${p.targetPencapaian}</small></td>
            <td><small>${p.waktuPelaksanaan}</small></td>
            <td><span class="badge ${p.status === 'Selesai' ? 'badge-green' : p.status === 'Dalam Proses' ? 'badge-amber' : 'badge-red'}">${p.status}</span></td>
          </tr>
        `).join('')}
      </tbody>
    </table>

    <br/><br/>
    <table class="signature-table">
      <tr>
        <td width="50%">
          Mengetahui / Mengamati,<br/>
          <b>Guru yang Dinilai</b><br/><br/><br/><br/>
          <u><b>${session.profile.namaGuru}</b></u><br/>
          NIP. ${session.profile.nipNuptk || '...........................................'}
        </td>
        <td width="50%">
          ${session.profile.madrasahSekolah}, ${session.profile.tanggalSupervisi}<br/>
          <b>Supervisor Akademik</b><br/><br/><br/><br/>
          <u><b>${session.profile.namaSupervisor}</b></u><br/>
          Pengawas / Kepala Madrasah
        </td>
      </tr>
    </table>
  </body>
  </html>
  `;

  const blob = new Blob(['\ufeff', htmlContent], {
    type: 'application/msword;charset=utf-8'
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `Laporan_Supervisi_${session.profile.namaGuru.replace(/[^a-zA-Z0-9]/g, '_')}.doc`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Exports supervision data as Excel Spreadsheet (.xls XML format supporting rich tables & formatting)
 */
export function exportToExcel(session: SupervisionSession) {
  const { componentSummaries, overallScore } = calculateScores(session.indicators);

  const excelXml = `<?xml version="1.0"?>
<?mso-application progid="Excel.Sheet"?>
<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet"
 xmlns:o="urn:schemas-microsoft-com:office:office"
 xmlns:x="urn:schemas-microsoft-com:office:excel"
 xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet"
 xmlns:html="http://www.w3.org/TR/REC-html40">
 <Styles>
  <Style ss:ID="Default" ss:Name="Normal">
   <Alignment ss:Vertical="Center"/>
   <Font ss:FontName="Calibri" x:Family="Swiss" ss:Size="11" ss:Color="#1E293B"/>
  </Style>
  <Style ss:ID="Header">
   <Font ss:FontName="Calibri" ss:Size="12" ss:Bold="1" ss:Color="#FFFFFF"/>
   <Interior ss:Color="#065F46" ss:Pattern="Solid"/>
   <Alignment ss:Horizontal="Center" ss:Vertical="Center"/>
  </Style>
  <Style ss:ID="SubHeader">
   <Font ss:FontName="Calibri" ss:Size="11" ss:Bold="1" ss:Color="#0F172A"/>
   <Interior ss:Color="#E2E8F0" ss:Pattern="Solid"/>
  </Style>
  <Style ss:ID="BoldCell">
   <Font ss:FontName="Calibri" ss:Bold="1" ss:Color="#0F172A"/>
  </Style>
  <Style ss:ID="CenterCell">
   <Alignment ss:Horizontal="Center" ss:Vertical="Center"/>
  </Style>
 </Styles>

 <!-- SHEET 1: REKAPITULASI PROFIL -->
 <Worksheet ss:Name="Profil Supervisi">
  <Table ss:DefaultColumnWidth="140">
   <Column ss:Width="180"/>
   <Column ss:Width="300"/>

   <Row ss:Height="25">
    <Cell ss:MergeAcross="1" ss:StyleID="Header">
     <Data ss:Type="String">LAPORAN SUPERVISI PEMBELAJARAN GURU</Data>
    </Cell>
   </Row>
   <Row><Cell><Data ss:Type="String"></Data></Cell></Row>

   <Row><Cell ss:StyleID="BoldCell"><Data ss:Type="String">Nama Guru</Data></Cell><Cell><Data ss:Type="String">${session.profile.namaGuru}</Data></Cell></Row>
   <Row><Cell ss:StyleID="BoldCell"><Data ss:Type="String">NIP / NUPTK</Data></Cell><Cell><Data ss:Type="String">${session.profile.nipNuptk || '-'}</Data></Cell></Row>
   <Row><Cell ss:StyleID="BoldCell"><Data ss:Type="String">Madrasah / Sekolah</Data></Cell><Cell><Data ss:Type="String">${session.profile.madrasahSekolah}</Data></Cell></Row>
   <Row><Cell ss:StyleID="BoldCell"><Data ss:Type="String">Mata Pelajaran</Data></Cell><Cell><Data ss:Type="String">${session.profile.mataPelajaran}</Data></Cell></Row>
   <Row><Cell ss:StyleID="BoldCell"><Data ss:Type="String">Kelas / Fase</Data></Cell><Cell><Data ss:Type="String">${session.profile.kelas} (${session.profile.fase})</Data></Cell></Row>
   <Row><Cell ss:StyleID="BoldCell"><Data ss:Type="String">Tahun Pelajaran</Data></Cell><Cell><Data ss:Type="String">${session.profile.tahunPelajaran} Semester ${session.profile.semester}</Data></Cell></Row>
   <Row><Cell ss:StyleID="BoldCell"><Data ss:Type="String">Supervisor</Data></Cell><Cell><Data ss:Type="String">${session.profile.namaSupervisor}</Data></Cell></Row>
   <Row><Cell ss:StyleID="BoldCell"><Data ss:Type="String">Tanggal Supervisi</Data></Cell><Cell><Data ss:Type="String">${session.profile.tanggalSupervisi}</Data></Cell></Row>
   <Row><Cell ss:StyleID="BoldCell"><Data ss:Type="String">Nilai Akhir</Data></Cell><Cell ss:StyleID="BoldCell"><Data ss:Type="String">${overallScore}%</Data></Cell></Row>
   
   <Row><Cell><Data ss:Type="String"></Data></Cell></Row>
   <Row ss:Height="22">
    <Cell ss:MergeAcross="1" ss:StyleID="SubHeader"><Data ss:Type="String">NILAI PER 6 KOMPONEN</Data></Cell>
   </Row>
   ${componentSummaries.map(c => `
   <Row>
    <Cell ss:StyleID="BoldCell"><Data ss:Type="String">${c.nama}</Data></Cell>
    <Cell><Data ss:Type="String">${c.totalSkorDiperoleh} / ${c.totalSkorMaksimal} (${c.persentase}%)</Data></Cell>
   </Row>
   `).join('')}
  </Table>
 </Worksheet>

 <!-- SHEET 2: MATRIKS 36 INDIKATOR -->
 <Worksheet ss:Name="36 Indikator Supervisi">
  <Table ss:DefaultColumnWidth="120">
   <Column ss:Width="50"/>
   <Column ss:Width="160"/>
   <Column ss:Width="250"/>
   <Column ss:Width="60"/>
   <Column ss:Width="100"/>
   <Column ss:Width="260"/>
   <Column ss:Width="260"/>

   <Row ss:Height="25">
    <Cell ss:StyleID="Header"><Data ss:Type="String">No</Data></Cell>
    <Cell ss:StyleID="Header"><Data ss:Type="String">Komponen</Data></Cell>
    <Cell ss:StyleID="Header"><Data ss:Type="String">Indikator</Data></Cell>
    <Cell ss:StyleID="Header"><Data ss:Type="String">Skor</Data></Cell>
    <Cell ss:StyleID="Header"><Data ss:Type="String">Keterpenuhan</Data></Cell>
    <Cell ss:StyleID="Header"><Data ss:Type="String">Sumber &amp; Bukti</Data></Cell>
    <Cell ss:StyleID="Header"><Data ss:Type="String">Alasan &amp; Rekomendasi</Data></Cell>
   </Row>
   ${session.indicators.map((ind) => {
     const score = ind.diverifikasiSupervisor && ind.skorSupervisor !== undefined ? ind.skorSupervisor : ind.skorAi;
     return `
     <Row>
      <Cell ss:StyleID="CenterCell"><Data ss:Type="String">${ind.id}</Data></Cell>
      <Cell><Data ss:Type="String">Komponen ${ind.componentId}</Data></Cell>
      <Cell ss:StyleID="BoldCell"><Data ss:Type="String">${ind.namaIndikator}</Data></Cell>
      <Cell ss:StyleID="CenterCell"><Data ss:Type="String">${score}</Data></Cell>
      <Cell ss:StyleID="CenterCell"><Data ss:Type="String">${ind.statusKeterpenuhan}</Data></Cell>
      <Cell><Data ss:Type="String">${ind.sumberBukti} ${ind.documentEvidence ? `(Dok: ${ind.documentEvidence.kutipanTeks})` : ''} ${ind.videoEvidence ? `(Video: ${ind.videoEvidence.timestamp} - ${ind.videoEvidence.transkrip})` : ''}</Data></Cell>
      <Cell><Data ss:Type="String">${ind.alasanSkor} - Saran: ${ind.rekomendasi ? ind.rekomendasi.tindakanDisarankan : '-'}</Data></Cell>
     </Row>
     `;
   }).join('')}
  </Table>
 </Worksheet>

 <!-- SHEET 3: RENCANA TINDAK LANJUT -->
 <Worksheet ss:Name="RTL Tindak Lanjut">
  <Table ss:DefaultColumnWidth="140">
   <Column ss:Width="80"/>
   <Column ss:Width="160"/>
   <Column ss:Width="200"/>
   <Column ss:Width="250"/>
   <Column ss:Width="180"/>
   <Column ss:Width="120"/>
   <Column ss:Width="100"/>

   <Row ss:Height="25">
    <Cell ss:StyleID="Header"><Data ss:Type="String">Prioritas</Data></Cell>
    <Cell ss:StyleID="Header"><Data ss:Type="String">Indikator</Data></Cell>
    <Cell ss:StyleID="Header"><Data ss:Type="String">Kondisi Saat Ini</Data></Cell>
    <Cell ss:StyleID="Header"><Data ss:Type="String">Tindakan Perbaikan</Data></Cell>
    <Cell ss:StyleID="Header"><Data ss:Type="String">Target Pencapaian</Data></Cell>
    <Cell ss:StyleID="Header"><Data ss:Type="String">Waktu</Data></Cell>
    <Cell ss:StyleID="Header"><Data ss:Type="String">Status</Data></Cell>
   </Row>
   ${session.followUpPlans.map(p => `
   <Row>
    <Cell ss:StyleID="CenterCell"><Data ss:Type="String">${p.prioritas}</Data></Cell>
    <Cell ss:StyleID="BoldCell"><Data ss:Type="String">${p.indikator}</Data></Cell>
    <Cell><Data ss:Type="String">${p.kondisiSaatIni}</Data></Cell>
    <Cell><Data ss:Type="String">${p.tindakanPerbaikan}</Data></Cell>
    <Cell><Data ss:Type="String">${p.targetPencapaian}</Data></Cell>
    <Cell><Data ss:Type="String">${p.waktuPelaksanaan}</Data></Cell>
    <Cell ss:StyleID="CenterCell"><Data ss:Type="String">${p.status}</Data></Cell>
   </Row>
   `).join('')}
  </Table>
 </Worksheet>

 <!-- SHEET 4: PANCA CINTA & POTONGAN VIDEO -->
 <Worksheet ss:Name="Panca Cinta &amp; Video">
  <Table ss:DefaultColumnWidth="160">
   <Column ss:Width="90"/>
   <Column ss:Width="140"/>
   <Column ss:Width="240"/>
   <Column ss:Width="260"/>
   <Column ss:Width="180"/>
   <Column ss:Width="200"/>

   <Row ss:Height="25">
    <Cell ss:StyleID="Header"><Data ss:Type="String">Waktu</Data></Cell>
    <Cell ss:StyleID="Header"><Data ss:Type="String">Fase Kegiatan</Data></Cell>
    <Cell ss:StyleID="Header"><Data ss:Type="String">Potongan Adegan Visual yang Dilakonkan</Data></Cell>
    <Cell ss:StyleID="Header"><Data ss:Type="String">Kalimat / Teks Unsur Cinta yang Diucapkan</Data></Cell>
    <Cell ss:StyleID="Header"><Data ss:Type="String">Pilar Panca Cinta (KBC)</Data></Cell>
    <Cell ss:StyleID="Header"><Data ss:Type="String">Makna Nilai Cinta</Data></Cell>
   </Row>
   ${session.timeline.map(seg => `
   <Row>
    <Cell ss:StyleID="CenterCell"><Data ss:Type="String">${seg.timeRange}</Data></Cell>
    <Cell ss:StyleID="BoldCell"><Data ss:Type="String">${seg.faseKegiatan}</Data></Cell>
    <Cell><Data ss:Type="String">${seg.sceneSnapshot?.adeganKunci || seg.deskripsiAktivitas}</Data></Cell>
    <Cell><Data ss:Type="String">${seg.pancaCintaKbc?.kalimatUcapanLakon || seg.transkripExcerpt}</Data></Cell>
    <Cell ss:StyleID="BoldCell"><Data ss:Type="String">${seg.pancaCintaKbc?.pilar || '-'}</Data></Cell>
    <Cell><Data ss:Type="String">${seg.pancaCintaKbc?.maknaPedagogis || '-'}</Data></Cell>
   </Row>
   `).join('')}
  </Table>
 </Worksheet>

 <!-- SHEET 5: DEEP LEARNING & TURATS -->
 <Worksheet ss:Name="Deep Learning &amp; Turats">
  <Table ss:DefaultColumnWidth="180">
   <Column ss:Width="200"/>
   <Column ss:Width="380"/>

   <Row ss:Height="25">
    <Cell ss:MergeAcross="1" ss:StyleID="Header"><Data ss:Type="String">ANALISIS MENDALAM &amp; KAJIAN TURATS</Data></Cell>
   </Row>
   ${session.deepLearning ? `
   <Row><Cell ss:StyleID="BoldCell"><Data ss:Type="String">Taksonomi Bloom C1-C2</Data></Cell><Cell><Data ss:Type="String">${session.deepLearning.bloomLevelDistribution.mengingatMemahami}% (Mengingat/Memahami)</Data></Cell></Row>
   <Row><Cell ss:StyleID="BoldCell"><Data ss:Type="String">Taksonomi Bloom C3</Data></Cell><Cell><Data ss:Type="String">${session.deepLearning.bloomLevelDistribution.menerapkan}% (Menerapkan)</Data></Cell></Row>
   <Row><Cell ss:StyleID="BoldCell"><Data ss:Type="String">Taksonomi Bloom C4-C5 (HOTS)</Data></Cell><Cell><Data ss:Type="String">${session.deepLearning.bloomLevelDistribution.menganalisisMengevaluasi}% (Menganalisis/Mengevaluasi)</Data></Cell></Row>
   <Row><Cell ss:StyleID="BoldCell"><Data ss:Type="String">Taksonomi Bloom C6 (HOTS)</Data></Cell><Cell><Data ss:Type="String">${session.deepLearning.bloomLevelDistribution.menciptaKreasi}% (Mencipta/Kreasi)</Data></Cell></Row>
   <Row><Cell ss:StyleID="BoldCell"><Data ss:Type="String">Kedalaman Metakognisi</Data></Cell><Cell><Data ss:Type="String">${session.deepLearning.levelMetakognisi} (Skor: ${session.deepLearning.skorKedalamanMetakognisi}/100)</Data></Cell></Row>
   <Row><Cell ss:StyleID="BoldCell"><Data ss:Type="String">Transfer ke Masalah Nyata</Data></Cell><Cell><Data ss:Type="String">${session.deepLearning.transferBelajarKehidupanNyata}</Data></Cell></Row>
   <Row><Cell ss:StyleID="BoldCell"><Data ss:Type="String">Student Agency / Otonomi</Data></Cell><Cell><Data ss:Type="String">${session.deepLearning.studentAgencyDanKemandirian}</Data></Cell></Row>
   ` : ''}
   ${session.turatsStudy ? `
   <Row><Cell><Data ss:Type="String"></Data></Cell></Row>
   <Row ss:Height="20"><Cell ss:MergeAcross="1" ss:StyleID="SubHeader"><Data ss:Type="String">SINTESIS KAJIAN TURATS &amp; TARBIYAH</Data></Cell></Row>
   <Row><Cell ss:StyleID="BoldCell"><Data ss:Type="String">Kesimpulan Tarbiyah</Data></Cell><Cell><Data ss:Type="String">${session.turatsStudy.kesimpulanTarbiyahIslamiyah}</Data></Cell></Row>
   ` : ''}
  </Table>
 </Worksheet>
</Workbook>`;

  const blob = new Blob([excelXml], {
    type: 'application/vnd.ms-excel;charset=utf-8'
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `Data_Supervisi_${session.profile.namaGuru.replace(/[^a-zA-Z0-9]/g, '_')}.xls`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Exports complete supervision session as formatted JSON file
 */
export function exportToJson(session: SupervisionSession) {
  const jsonStr = JSON.stringify(session, null, 2);
  const blob = new Blob([jsonStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `Cadangan_Supervisi_${session.profile.namaGuru.replace(/[^a-zA-Z0-9]/g, '_')}_${session.profile.tanggalSupervisi}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
