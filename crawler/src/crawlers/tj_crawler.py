import requests
from bs4 import BeautifulSoup as bs
from ... import config
import time

def _get_tj_html(search_keyword,pageNo):
    base_url = f"https://www.tjmedia.com/song/accompaniment_search?pageNo={pageNo}&pageRowCnt=15&strSotrGubun=ASC&strSortType=&nationType=&strType=2&searchTxt={search_keyword}"

    response = requests.get(base_url).text

    html = bs(response, 'html.parser')

    return html

def _parse_and_structure_songs(html):
    songs_list = []
    chart_list = html.select_one('.chart-list-area')


    if chart_list:

        list_items = chart_list.find_all('li', recursive=False)
        # ... TJ 노래 목록 HTML을 분석하는 코드 ...

        for item in list_items:
            top = item.select_one('.grid-container.top')

            if top:
                continue

            number = item.select_one('.grid-item.pos-type .count span.num2').get_text().strip()
            title = item.select_one('.grid-item.title3 .flex-box > p > span').get_text().strip()
            singer = item.select_one('.grid-item.singer > p > span').get_text().strip()
            lyricist = item.select_one('.grid-item.title5 > p > span').get_text().strip()
            composer = item.select_one('.grid-item.title6 > p > span').get_text().strip()

            songs_list.append({
              "number": number,
              "title": title,
              "singer": singer,
              "lyricist": lyricist,
              "composer": composer
            })
#             print("노래 리스트 ------------")


    print(songs_list)
    pass


# ----------------------------------------------------

def crawl_bulk_by_artist():
    for keyword in config.ALL_KEYWORDS:
        html = _get_tj_html(keyword,1)
        songs = _parse_and_structure_songs(html)

        time.sleep(100)
#             page = 1
#             while True:
#                 print(f"Crawling keyword '{keyword}', page {page}...")
#                 html = _get_tj_html(keyword, page_no=page)
#
#                 if not html or _is_last_page(html):
#                     print(f"Finished crawling for keyword '{keyword}'.")
#                     break # 루프 탈출
#
#                 # 여기에 HTML을 분석하고 DB에 저장하는 로직을 넣습니다.
#                 # songs = _parse_and_structure_songs(html)
#                 # db_manager.save_songs(songs) # 바로 db에 넣기
#
#                 page += 1 # 다음 페이지로
#                 time.sleep(1) # 서버에 부담을 주지 않기 위해 잠시 대기

#         pass

# def crawl_latest_songs():
#     """업무 2: 최신곡 업데이트"""
#     print("TJ 최신곡을 수집합니다.")
#     # ... '최신곡' 페이지를 크롤링하는 로직 ...
#     pass
#
# def crawl_popular_charts():
#     """업무 3: 인기차트 업데이트"""
#     print("TJ 인기차트를 수집합니다.")
#     # ... '인기차트' 페이지를 크롤링하는 로직 ...
#     pass