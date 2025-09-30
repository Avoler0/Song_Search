import {getSongs, Song} from "@/app/lib/data";
import SongList from "@/app/components/song/SongList";

export default async function Home() {
    const songs:Song[] = await getSongs();

    return (
        <div className="bg-bg-main media-w">

            <div className="p-4">
                <SongList songs={songs} />
            </div>
        </div>
    );
}
