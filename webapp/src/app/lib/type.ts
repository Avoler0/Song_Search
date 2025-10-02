import fs from 'fs/promises';
import path from 'path';

export type Song =  {
    id: string,
    artist_id: number,
    song_no_tj: string | null,
    song_no_ky: string | null,
    title: string,
    lyricist: string | null,
    composer: string | null,
    cr_keyword: string,
    album_art: string | null,
    youtube_link: string | null,
    release:string | null,
    createAt: string
}


export type SearchCategorys = ['All','Title','Artist'];