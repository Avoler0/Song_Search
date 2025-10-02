from crawler.src.crawlers import tj_crawler as tj_expert
from crawler.src.crawlers import ky_crawler as ky_expert



import sys
print(sys.executable)

if __name__ == "__main__":
    print("메인 컨트롤러를 시작합니다.")

#     print("TJ 대규모 수집 작업을 시작합니다...")
#     tj_expert.crawl_tj_artist()
#     print("TJ 대규모 수집 작업을 완료했습니다.")

    print("KY 대규모 수집 작업을 시작합니다...")
    ky_expert.crawl_ky_artist()
    print("KY 대규모 수집 작업을 완료했습니다.")