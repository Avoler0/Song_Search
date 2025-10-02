from dotenv import load_dotenv
from supabase import create_client, Client
from typing import Optional, Dict, Any
import os

load_dotenv()

url = os.getenv('SUPABASE_URL')
key = os.getenv('SUPABASE_KEY')

supabase = create_client(url,key)

def create_song_upsert_payload(song_data: Dict[str, Any], artist_id: int, current_keyword, source: str) -> Dict[str, Any]:

    payload = {
        "title": song_data.get('title'),
        "artist_id": artist_id,
        "song_no_tj": song_data.get('number'),
        "lyricist": song_data.get('lyricist'),
        "composer": song_data.get('composer'),
        "cr_keyword": current_keyword,
        "youtube_link": song_data.get("youtube_link")
    }

    if source == 'TJ':
            payload['song_no_tj'] = song_data.get('number')
        elif source == 'KY':
            payload['song_no_ky'] = song_data.get('number')
            payload['release_date'] = song_data.get('release')

    # None 값이 아닌 필드만 추출하여 반환 (MERGE 전략의 핵심)
    return {k: v for k, v in payload.items() if v is not None}

def insertArtist(artist):
    try:
        response = (
            supabase.table('artists')
            .upsert({ "name": artist }, on_conflict='name')
            .execute()
        )

        return response.data[0]['id']

    except Exception  as err:
        print('insertArtist Error :',err)
        return None

def insertSongTj(data,keyword,source):

    try:
        artist_id = insertArtist(data['artist'])

        upsert_data = create_song_upsert_payload(data, artist_id,keyword,source)
        response = (
            supabase.table('songs')
            .upsert(upsert_data, on_conflict='title,artist_id')
            .execute()
        )

    except Exception  as err:
        print('insertSongTj Error :',err)
        return None
