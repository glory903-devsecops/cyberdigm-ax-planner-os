import requests

url = "https://www.ntis.go.kr/rndgate/eg/un/ra/mng.do"
headers = {
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
    "Referer": "https://www.ntis.go.kr/ThMain.do"
}

try:
    response = requests.get(url, headers=headers, timeout=10)
    html = response.text
    
    # "하이브리드 발전시스템" 텍스트 주변 5000자 추출
    target_text = "하이브리드 발전시스템"
    idx = html.find(target_text)
    
    if idx != -1:
        snippet = html[max(0, idx-1000):idx+4000]
        with open("ntis_list_snippet.html", "w", encoding="utf-8") as f:
            f.write(snippet)
        print(f"✅ 리스트 주변 소스 저장 완료: ntis_list_snippet.html (위치: {idx})")
    else:
        print("❌ 타겟 텍스트를 찾지 못했습니다. 전체 소스를 저장합니다.")
        with open("ntis_full_source.html", "w", encoding="utf-8") as f:
            f.write(html)
except Exception as e:
    print(f"❌ 오류: {e}")
