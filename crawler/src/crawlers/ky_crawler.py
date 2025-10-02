import time
import random
import requests
from ... import config
from bs4 import BeautifulSoup as bs
from crawler.src.database import db_manager as db
from . import crawler_log as log

# 검색결과 HTML 변환
def _get_tj_html(search_keyword,pageNo):
    base_url = f"https://kysing.kr/search/?category=7&keyword={search_keyword}&s_page={pageNo}"
    response = requests.get(base_url).text

    return bs(response, 'html.parser')

# 검색결과 노래 리스트
def _parse_and_structure_songs(html):
    songs_list = []
    chart_list = html.select_one('.search_daily_chart_wrap')

    if not chart_list:
        print('빈거 리턴')
        return []

    if chart_list:
        list_items = chart_list.find_all(class_='search_chart_list', recursive=False)
        for item in list_items[1:]:


            number   = item.select_one('.search_chart_num').get_text().strip()
            title    = item.select_one('.search_chart_tit span.tit').get_text().strip()
            artist   = item.select_one('.search_chart_sng').get_text().strip()
            lyricist = item.select_one('.search_chart_wrt').get_text().strip()
            composer = item.select_one('.search_chart_cmp').get_text().strip()
            release  = item.select_one('.search_chart_rel').get_text().strip()

            songs_list.append({
                "number"  : number,
                "title"   : title,
                "artist"  : artist,
                "lyricist": lyricist,
                "composer": composer,
                "release" : release
            })

    return songs_list

# 검색결과 페이지 크롤링
def crawl_ky_artist():

    for keyword in config.ALL_KEYWORDS:
        page = 1

        while True:
            html  = _get_tj_html(keyword,page)
            songs = _parse_and_structure_songs(html)

            if len(songs) == 0:
                break

            for song in songs:
                db.insertSong('KY',song,keyword)


            log._save_current_state(keyword,page)
            page += 1
            time.sleep(1)

        time.sleep(1)

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