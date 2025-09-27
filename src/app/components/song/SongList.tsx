import SongCard from "@/app/components/song/SongCard";


export default function  () {
    return (
        <div>
            <div className="mb-3">
                <h2 className="font-medium text-xl text-content-primary">노래방 인기 순위</h2>
            </div>
            <div className="space-y-2">
                <SongCard />
                <SongCard />
                <SongCard />
                <SongCard />
                <SongCard />
                <SongCard />
                <SongCard />
                <SongCard />
                <SongCard />
                <SongCard />
            </div>
        </div>
    )
}