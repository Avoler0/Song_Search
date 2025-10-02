from dotenv import load_dotenv
from supabase import create_client, Client
from typing import Optional, Dict, Any
import os
import datetime

load_dotenv()

url = os.getenv('SUPABASE_URL')
key = os.getenv('SUPABASE_KEY')

supabase = create_client(url,key)

def create_song_upsert_payload(source,song_data, artist_id, current_keyword):

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
        release_obj = datetime.datetime.strptime(song_data.get('release'), '%Y.%m')
        release_format = release_obj.strftime('%Y-%m-01')

        payload['song_no_ky'] = song_data.get('number')
        payload['release'] = release_format

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

def insertSong(source,data,keyword):

    try:
        artist_id = insertArtist(data['artist'])

        upsert_data = create_song_upsert_payload(source,data, artist_id,keyword)
        response = (
            supabase.table('songs')
            .upsert(upsert_data, on_conflict='title,artist_id')
            .execute()
        )

        print('데이터 저장',response)

    except Exception  as err:
        print('insertSong Error :',err)
        return None
