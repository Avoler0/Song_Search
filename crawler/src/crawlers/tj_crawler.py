import time
import random
import requests
from ... import config
from bs4 import BeautifulSoup as bs
from crawler.src.database import db_manager as db
from . import crawler_log as log

# 검색결과 HTML 변환
def _get_tj_html(search_keyword,pageNo):
    base_url = f"https://www.tjmedia.com/song/accompaniment_search?pageNo={pageNo}&pageRowCnt=15&strSotrGubun=ASC&strSortType=&nationType=&strType=2&searchTxt={search_keyword}"
    response = requests.get(base_url).text

    return bs(response, 'html.parser')

# 검색결과 노래 리스트
def _parse_and_structure_songs(html):
    songs_list = []
    chart_list = html.select_one('.chart-list-area')

    if chart_list:
        no_data    = chart_list.select_one('.no-date')
        list_items = chart_list.find_all('li', recursive=False)

        if no_data:
            return []

        for item in list_items:
            top = item.select_one('.grid-container.top')

            if top:
                continue
            youtube_element = item.select_one('.grid-item.youtube > a')

            number   = item.select_one('.grid-item.pos-type .count span.num2').get_text().strip()
            title    = item.select_one('.grid-item.title3 .flex-box > p > span').get_text().strip()
            artist   = item.select_one('.grid-item.singer > p > span').get_text().strip()
            lyricist = item.select_one('.grid-item.title5 > p > span').get_text().strip()
            composer = item.select_one('.grid-item.title6 > p > span').get_text().strip()
            youtube_link = youtube_element.get_text().strip() if youtube_element else None

            songs_list.append({
                "number": number,
                "title": title,
                "artist": artist,
                "lyricist": lyricist,
                "composer": composer,
                "youtube_link":youtube_link
            })

    return songs_list

# 검색결과 페이지 크롤링
def crawl_bulk_by_artist():

    for keyword in config.ALL_KEYWORDS:
        page = 1

        while True:
            print('반복문 While :',keyword,page)

            html  = _get_tj_html(keyword,page)
            songs = _parse_and_structure_songs(html)

            if len(songs) == 0:
                break

            for song in songs:
                db.insertSongTj(song,keyword)


            log._save_current_state(keyword,page)
            page += 1
            time.sleep(random.uniform(2, 5))

        time.sleep(random.uniform(1, 3))

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