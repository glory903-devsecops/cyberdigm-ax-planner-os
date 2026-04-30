/**
 * ExportService.ts
 * 데이터 리스트를 CSV 형식으로 변환하여 다운로드합니다.
 */

export function exportToCSV(data: any[], filename: string) {
  if (!data || data.length === 0) return;

  // Header 추출 (첫 번째 객체의 키 기준)
  const headers = Object.keys(data[0]);
  const csvRows = [];

  // Header row 추가
  csvRows.push(headers.join(","));

  // Data rows 추가
  for (const row of data) {
    const values = headers.map(header => {
      const val = row[header];
      const escaped = ("" + val).replace(/"/g, '\\"'); // 따옴표 이스케이프
      return `"${escaped}"`; // 값을 따옴표로 감쌈
    });
    csvRows.push(values.join(","));
  }

  // Blob 생성 및 다운로드
  const csvString = csvRows.join("\n");
  const blob = new Blob(["\ufeff" + csvString], { type: "text/csv;charset=utf-8;" }); // UTF-8 BOM 추가 (Excel 한글 깨짐 방지)
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", `${filename}_${new Date().toISOString().split('T')[0]}.csv`);
  link.style.visibility = "hidden";
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
