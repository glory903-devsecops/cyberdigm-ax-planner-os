import requests

url = "https://www.ntis.go.kr/rndgate/eg/un/ra/mng.do"
headers = {
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
    "Referer": "https://www.ntis.go.kr/ThMain.do"
}

print(f"🌐 {url} HTML 소스 가져오는 중...")
try:
    response = requests.get(url, headers=headers, timeout=10)
    if response.status_code == 200:
        html = response.text
        # 리스트 테이블 주변의 소스만 추출 (분석 용도)
        start_idx = html.find("<table")
        end_idx = html.find("</table>") + 8
        if start_idx != -1:
            snippet = html[start_idx:end_idx]
            with open("ntis_table_snippet.html", "w", encoding="utf-8") as f:
                f.write(snippet)
            print("✅ 테이블 소스 저장 완료: ntis_table_snippet.html")
        else:
            print("❌ 테이블 태그를 찾지 못했습니다.")
            with open("ntis_full_source.html", "w", encoding="utf-8") as f:
                f.write(html)
            print("💾 전체 소스 저장 완료 (테이블 미발견 시)")
    else:
        print(f"❌ 실패: 상태 코드 {response.status_code}")
except Exception as e:
    print(f"❌ 오류: {e}")
