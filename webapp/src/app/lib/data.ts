import fs from 'fs/promises';
import path from 'path';

export type Song =  {
    id: string,
    title: string,
    artist: string,
    lyricist: string,
    composer: string,
    tjNumber: string,
    kyNumber: string,
    youtubeUrl: string,
    isBookmarked: boolean,
}

export async function getSongs(): Promise<Song[]> {
    // 나중에 DB로 바꿀 때, 이 함수 내부만 수정하면 됩니다.
    console.log('Fetching songs from songs.json...');

    const filePath = path.join(process.cwd(), 'public', 'songs.json');
    const fileContents = await fs.readFile(filePath, 'utf8');

    // 파일 내용이 비어있으면 빈 배열을 반환
    if (!fileContents) {
        return [];
    }

    const songs: Song[] = JSON.parse(fileContents);
    return songs;
}