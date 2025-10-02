import {Song} from "@/app/lib/type";
import SongList from "@/app/components/song/SongList";
import {supabase} from "@/app/lib/supabse";
import {getTopChartSongs} from "@/app/service/songService";

export default async function Home() {
    const songs:Song[] = await getTopChartSongs();

    return (
        <div className="bg-bg-main media-w">

            <div className="p-4">
                <SongList songs={songs} />
            </div>
        </div>
    );
}
