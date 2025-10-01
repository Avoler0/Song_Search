import requests
from bs4 import BeautifulSoup as bs
import json
import os

search_keyword = '유우리'

url = f'https://www.tjmedia.com/song/accompaniment_search?nationType=&strType=0&searchTxt={search_keyword}'

response = requests.get(url)

html_text = response.text

soup = bs(html_text, 'html.parser')

all_search = soup.select('.music-search-list.type2')


def processSection():
    for idx,val in enumerate(all_search) :
        title =  val.select_one('.title-select-area').get_text().strip()
        isMore = bool(val.select_one('.more-area.type2'))
        isResult = not bool(val.select_one('.chart-list-area .no-date'))

        if  title == '작사가':
            continue
        elif  title == '작곡가':
            continue
        elif  title == '곡 번호':
            continue
        elif  title == '메들리':
            continue
        elif isResult:
            print('데이터가 없습니다.')

        if isMore:
            songList(val)


def songList(val):
    list = val.select('.chart-list-area.music > li')
    processSongs = []

    for item in list:
        top = bool(item.select_one('.grid-container.top'))

        if top:
            continue

        number = item.select_one('.grid-item.pos-type .count span.num2').get_text().strip()
        title = item.select_one('.grid-item.title3 .flex-box > p > span').get_text().strip()
        singer = item.select_one('.grid-item.singer > p > span').get_text().strip()
        lyricist = item.select_one('.grid-item.title5 > p > span').get_text().strip()
        composer = item.select_one('.grid-item.title6 > p > span').get_text().strip()

        processSongs.append({
            "number": number,
            "title": title,
            "singer": singer,
            "lyricist": lyricist,
            "composer": composer
        })

        print('------ 반복 -------')
        print('곡 번호 :',number, '곡 제목 :', title, '가수 :',singer, '작사가 :',lyricist, '작곡가 :',composer)


    print('완료 데이터 :',processSongs)
    tempJsonSave(processSongs)
    # print('반복 ----------------------',)
    # print(list)

def tempJsonSave(data):
    file_path = './public/crawl_songs.json'

    dir_path = os.path.dirname(file_path)

    absolute_path = os.path.abspath(file_path)

    print(absolute_path)
    if dir_path:
        os.makedirs(dir_path, exist_ok=True)

    try:
        with open(dir_path, 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False, indent=4)
        print(f"✅ 데이터가 '{absolute_path}'에 성공적으로 저장되었습니다.")
    except Exception as e:
        print(f"❌ 파일 저장 중 오류 발생: {e}")
        print('위치',absolute_path)


processSection()