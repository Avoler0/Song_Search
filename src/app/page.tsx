import fs from 'fs/promises'; // 파일 시스템 import
import path from 'path';
import SongList from "@/app/components/song/SongList";

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


export default async function Home() {
    const filePath = path.join(process.cwd(), 'public', 'songs.json');
    const fileContents = await fs.readFile(filePath, 'utf8');
    const songs:Song[] = JSON.parse(fileContents);

    return (
        <div className="bg-bg-main media-w">

            <div className="p-4">
                <SongList songs={songs} />
            </div>
        </div>
    );
}
