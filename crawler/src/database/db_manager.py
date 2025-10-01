from dotenv import load_dotenv
from supabase import create_client, Client
import os

load_dotenv()

url = os.getenv('SUPABASE_URL')
key = os.getenv('SUPABASE_KEY')

supabase = create_client(url,key)


def insertArtist(artist):
    try:
        response = (
            supabase.table('artists')
            .upsert({ "name": artist }, on_conflict='name')
            .execute()
        )

        print('아티스트 넣었음')
        return response.data[0]['id']

    except Exception  as err:
        print('아티스트 인서트 오류',err)
        return None

def insertSongTj(data):

    try:
        artist_id = insertArtist(data['artist'])
        
        print('송 넣자')
        response = (
            supabase.table('songs')
            .upsert({
                "song_no_tj": data['number'],
                "title": data['title'],
                "lyricist": data['lyricist'],
                "composer": data['composer'],
                "youtube_link": data['youtube_link'],
                "artist_id": artist_id
            })
            .execute()
        )

        print('송 너ㅗㅎ엇다!!!',response)

    except Exception  as err:
        print('송 인서트 오류',err)
        return None
