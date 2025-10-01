import time
import random

# 로그 파일 경로 설정
LOG_FILE_PATH = 'last_crawler.txt'

def _load_last_state():
    """마지막 크롤링 지점(키워드, 페이지)을 파일에서 읽어옵니다."""
    if not os.path.exists(LOG_FILE_PATH):
        return None, 1 # 파일이 없으면 처음부터 시작

    with open(LOG_FILE_PATH, 'r', encoding='utf-8') as f:
        line = f.readline().strip()

    try:
        # 파일 내용을 파싱하여 키워드와 페이지 번호를 추출
        parts = line.split(',')
        keyword = parts[0].split(':')[1]
        page = int(parts[1].split(':')[1])
        return keyword, page
    except:
        # 파싱 오류 시 처음부터 시작하도록 설정
        return None, 1


def _save_current_state(keyword, page):
    """현재 진행 상황(키워드, 페이지)을 파일에 저장합니다."""
    with open(LOG_FILE_PATH, 'w', encoding='utf-8') as f:
        f.write(f'키워드 : {keyword}, 페이지 : {page}')


def crawl_bulk_by_artist():

    # 1. 마지막 크롤링 지점 로드
    last_keyword, last_page = _load_last_state()

    # 키워드 리스트를 순회할 때 재시작 지점 찾기
    start_index = 0
    if last_keyword:
        try:
            start_index = config.ALL_KEYWORDS.index(last_keyword)
        except ValueError:
            # 마지막 키워드가 목록에 없으면 처음부터 시작
            start_index = 0

    # 키워드 리스트 순회 (시작 지점부터)
    for i in range(start_index, len(config.ALL_KEYWORDS)):
        keyword = config.ALL_KEYWORDS[i]

        # 이전 키워드에서 중단되었으면 중단된 페이지부터 시작
        page = last_page if keyword == last_keyword else 1

        # 이 키워드의 크롤링이 시작되었으므로 last_page를 1로 초기화 (다음 키워드를 위해)
        last_page = 1

        while True:
            # 2. 크롤링 진행 상황 로그 기록 (각 페이지마다 기록)
            _save_current_state(keyword, page)
            print(f'반복문 While : {keyword}, 페이지: {page}')

            html  = _get_tj_html(keyword, page)
            songs = _parse_and_structure_songs(html)

            if len(songs) == 0:
                break

            for song in songs:
                db.insertSongTj(song)

            page += 1
            time.sleep(random.uniform(3, 7)) # 랜덤 지연 시간 권장

    # 3. 모든 크롤링 완료 후 로그 파일 삭제 또는 '완료' 기록
    if os.path.exists(LOG_FILE_PATH):
        os.remove(LOG_FILE_PATH)
        print("크롤링 완료. 로그 파일 삭제.")