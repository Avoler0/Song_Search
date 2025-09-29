import {Song} from "@/app/page";
import SongCard from "@/app/components/song/SongCard";

export default function SongList ({songs}:  { songs: Song[] }) {
    return (
        <div>
            <div className="mb-3">
                <h2 className="font-medium text-xl text-content-primary">노래방 인기 순위</h2>
            </div>
            <div>
                <ul className="space-y-2">
                    {songs.map((s: Song) => (
                        <SongCard song={s} key={s.id} />
                    ))}
                </ul>
            </div>
        </div>
    )
}