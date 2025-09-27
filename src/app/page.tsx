import SongList from "@/app/components/song/SongList";

export default function Home() {

  return (
    <div className="bg-bg-main max-w-[768px]">

        <div className="p-4">
            <SongList />
        </div>
    </div>
  );
}
