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
      h2 { font-size: 14pt; color: #0f766e; border-bottom: 2px solid #0f766e; padding-bottom: 4px; margin-top: 24px; }
      h3 { font-size: 12pt; color: #1e293b; margin-top: 14px; }
      table { width: 100%; border-collapse: collapse; margin-top: 10px; margin-bottom: 16px; }
      th, td { border: 1px solid #cbd5e1; padding: 6px 10px; font-size: 10pt; text-align: left; }
      th { background-color: #f1f5f9; color: #0f172a; font-weight: bold; }
      .text-center { text-align: center; }
      .badge { display: inline-block; padding: 2px 6px; font-size: 9pt; border-radius: 4px; font-weight: bold; }
      .badge-green { background-color: #d1fae5; color: #065f46; }
      .badge-blue { background-color: #e0f2fe; color: #0369a1; }
      .badge-amber { background-color: #fef3c7; color: #92400e; }
      .badge-red { background-color: #fee2e2; color: #991b1b; }
      .box { border: 1px solid #e2e8f0; background-color: #f8fafc; padding: 12px; border-radius: 6px; margin-bottom: 12px; }
      .signature-table td { border: none; padding: 20px 10px; text-align: center; }
    </style>
  </head>
  <body>
    <h1>LAPORAN ANALISIS PEMBELAJARAN GURU</h1>
    <p class="text-center" style="font-size: 12pt; color: #475569; margin-top: 0;">
      Supervisi Akademik Berbasis 6 Indikator Terpadu Dokumen & Video
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
          <th width="32%">Indikator</th>
          <th width="10%" class="text-center">Skor</th>
          <th width="25%">Bukti & Sumber</th>
          <th width="25%">Analisis & Rekomendasi</th>
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
                ${ind.documentEvidence ? `<small><b>Dok:</b> ${ind.documentEvidence.kutipanTeks}</small><br/>` : ''}
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

    <h2>V. RENCANA TINDAK LANJUT (RTL)</h2>
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
   <Alignment ss:Horizontal="Center" ss:Vertical="Center" ss:WrapText="1"/>
  </Style>
  <Style ss:ID="Title">
   <Font ss:FontName="Calibri" ss:Size="16" ss:Bold="1" ss:Color="#065F46"/>
   <Alignment ss:Horizontal="Center" ss:Vertical="Center"/>
  </Style>
  <Style ss:ID="BoldCell">
   <Font ss:FontName="Calibri" ss:Bold="1" ss:Color="#1E293B"/>
  </Style>
  <Style ss:ID="CenterCell">
   <Alignment ss:Horizontal="Center" ss:Vertical="Center"/>
  </Style>
 </Styles>

 <!-- SHEET 1: DASHBOARD & REKAPITULASI -->
 <Worksheet ss:Name="Dashboard &amp; Rekapitulasi">
  <Table ss:DefaultColumnWidth="120">
   <Column ss:Width="40"/>
   <Column ss:Width="260"/>
   <Column ss:Width="100"/>
   <Column ss:Width="100"/>
   <Column ss:Width="100"/>
   <Column ss:Width="120"/>

   <Row ss:Height="30">
    <Cell ss:MergeAcross="5" ss:StyleID="Title"><Data ss:Type="String">SISTEM ANALISIS PEMBELAJARAN GURU - REKAPITULASI SUPERVISI</Data></Cell>
   </Row>
   <Row><Cell><Data ss:Type="String"></Data></Cell></Row>
   
   <Row><Cell ss:StyleID="BoldCell"><Data ss:Type="String">Nama Guru:</Data></Cell><Cell><Data ss:Type="String">${session.profile.namaGuru}</Data></Cell></Row>
   <Row><Cell ss:StyleID="BoldCell"><Data ss:Type="String">NIP / NUPTK:</Data></Cell><Cell><Data ss:Type="String">${session.profile.nipNuptk || '-'}</Data></Cell></Row>
   <Row><Cell ss:StyleID="BoldCell"><Data ss:Type="String">Madrasah:</Data></Cell><Cell><Data ss:Type="String">${session.profile.madrasahSekolah}</Data></Cell></Row>
   <Row><Cell ss:StyleID="BoldCell"><Data ss:Type="String">Mata Pelajaran:</Data></Cell><Cell><Data ss:Type="String">${session.profile.mataPelajaran}</Data></Cell></Row>
   <Row><Cell ss:StyleID="BoldCell"><Data ss:Type="String">Kelas / Fase:</Data></Cell><Cell><Data ss:Type="String">${session.profile.kelas} (${session.profile.fase})</Data></Cell></Row>
   <Row><Cell ss:StyleID="BoldCell"><Data ss:Type="String">Supervisor:</Data></Cell><Cell><Data ss:Type="String">${session.profile.namaSupervisor}</Data></Cell></Row>
   <Row><Cell ss:StyleID="BoldCell"><Data ss:Type="String">Tanggal Supervisi:</Data></Cell><Cell><Data ss:Type="String">${session.profile.tanggalSupervisi}</Data></Cell></Row>
   <Row><Cell ss:StyleID="BoldCell"><Data ss:Type="String">Nilai Keseluruhan:</Data></Cell><Cell ss:StyleID="BoldCell"><Data ss:Type="String">${overallScore}%</Data></Cell></Row>
   
   <Row><Cell><Data ss:Type="String"></Data></Cell></Row>
   <Row ss:Height="25">
    <Cell ss:StyleID="Header"><Data ss:Type="String">No</Data></Cell>
    <Cell ss:StyleID="Header"><Data ss:Type="String">Komponen Supervisi</Data></Cell>
    <Cell ss:StyleID="Header"><Data ss:Type="String">Skor Diperoleh</Data></Cell>
    <Cell ss:StyleID="Header"><Data ss:Type="String">Skor Maksimal</Data></Cell>
    <Cell ss:StyleID="Header"><Data ss:Type="String">Rata-rata</Data></Cell>
    <Cell ss:StyleID="Header"><Data ss:Type="String">Keterpenuhan (%)</Data></Cell>
   </Row>
   ${componentSummaries.map((c, i) => `
   <Row>
    <Cell ss:StyleID="CenterCell"><Data ss:Type="Number">${i + 1}</Data></Cell>
    <Cell ss:StyleID="BoldCell"><Data ss:Type="String">${c.nama}</Data></Cell>
    <Cell ss:StyleID="CenterCell"><Data ss:Type="Number">${c.totalSkorDiperoleh}</Data></Cell>
    <Cell ss:StyleID="CenterCell"><Data ss:Type="Number">${c.totalSkorMaksimal}</Data></Cell>
    <Cell ss:StyleID="CenterCell"><Data ss:Type="Number">${c.skorRataRata}</Data></Cell>
    <Cell ss:StyleID="CenterCell"><Data ss:Type="Number">${c.persentase}</Data></Cell>
   </Row>
   `).join('')}
  </Table>
 </Worksheet>

 <!-- SHEET 2: 36 INDIKATOR -->
 <Worksheet ss:Name="36 Indikator Supervisi">
  <Table ss:DefaultColumnWidth="140">
   <Column ss:Width="50"/>
   <Column ss:Width="160"/>
   <Column ss:Width="260"/>
   <Column ss:Width="70"/>
   <Column ss:Width="110"/>
   <Column ss:Width="200"/>
   <Column ss:Width="240"/>
   <Column ss:Width="200"/>

   <Row ss:Height="25">
    <Cell ss:StyleID="Header"><Data ss:Type="String">Kode</Data></Cell>
    <Cell ss:StyleID="Header"><Data ss:Type="String">Komponen</Data></Cell>
    <Cell ss:StyleID="Header"><Data ss:Type="String">Indikator</Data></Cell>
    <Cell ss:StyleID="Header"><Data ss:Type="String">Skor</Data></Cell>
    <Cell ss:StyleID="Header"><Data ss:Type="String">Status</Data></Cell>
    <Cell ss:StyleID="Header"><Data ss:Type="String">Sumber Bukti</Data></Cell>
    <Cell ss:StyleID="Header"><Data ss:Type="String">Alasan Pemberian Skor</Data></Cell>
    <Cell ss:StyleID="Header"><Data ss:Type="String">Rekomendasi Perbaikan</Data></Cell>
   </Row>
   ${session.indicators.map(ind => {
     const score = ind.diverifikasiSupervisor && ind.skorSupervisor !== undefined ? ind.skorSupervisor : ind.skorAi;
     return `
   <Row>
    <Cell ss:StyleID="CenterCell"><Data ss:Type="String">${ind.id}</Data></Cell>
    <Cell><Data ss:Type="String">Komponen ${ind.componentId}</Data></Cell>
    <Cell><Data ss:Type="String">${ind.namaIndikator}</Data></Cell>
    <Cell ss:StyleID="CenterCell"><Data ss:Type="String">${score}</Data></Cell>
    <Cell ss:StyleID="CenterCell"><Data ss:Type="String">${ind.statusKeterpenuhan}</Data></Cell>
    <Cell><Data ss:Type="String">${ind.sumberBukti || 'Bukti belum ditemukan'}</Data></Cell>
    <Cell><Data ss:Type="String">${ind.alasanSkor}</Data></Cell>
    <Cell><Data ss:Type="String">${ind.rekomendasi?.tindakanDisarankan || '-'}</Data></Cell>
   </Row>
     `;
   }).join('')}
  </Table>
 </Worksheet>

 <!-- SHEET 3: RENCANA TINDAK LANJUT -->
 <Worksheet ss:Name="Rencana Tindak Lanjut (RTL)">
  <Table ss:DefaultColumnWidth="150">
   <Column ss:Width="80"/>
   <Column ss:Width="200"/>
   <Column ss:Width="220"/>
   <Column ss:Width="240"/>
   <Column ss:Width="160"/>
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
