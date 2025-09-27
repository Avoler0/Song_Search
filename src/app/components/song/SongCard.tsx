import { TiStarOutline } from "react-icons/ti";
import { TiStarFullOutline } from "react-icons/ti";
import {
    HiMagnifyingGlass,
    HiChevronDown,
    HiUserCircle,
    HiPlay,
    HiStar,
    HiOutlineStar,
    HiXMark
} from 'react-icons/hi2';
import { FaYoutube } from 'react-icons/fa';

export default function SongCard({song}:any) {
    return (
        <div className="border border-gray-200 bg-surface-raised rounded-md  flex items-start space-x-4 p-4 w-full">
            <div className="bg-gray-400 rounded-sm overflow-hidden relative object-cover h-16 w-16">

            </div>
            <div className="flex justify-between flex-grow space-x-3">
                <div className="flex-grow">
                    <h3 className="leading-none text-lg font-semibold text-gray-900 leading-tight">오늘밤이 지나기 전에</h3>
                    <p className="leading-none mt-2 text-xs text-contet-secondary">정윤서</p>
                    <p className="leading-none text-xs text-content-secondary mt-2">작곡: Enemy / 작사: Haruto</p>
                </div>
                <div className="flex flex-col justify-between flex-shrink-0">
                    <div className="items-center flex justify-between space-x-2">
                        <a
                            href="https://www.youtube.com/watch?v=your-video-id" // 실제 유튜브 링크
                            target="_blank" // 새 탭에서 열기
                            rel="noopener noreferrer" // 보안을 위한 속성
                            className="text-youtube" // 색상 및 호버 효과
                        >
                            <FaYoutube className="h-6 w-6" />
                        </a>
                        <button type="button" className="cursor-pointer">
                            {/*<TiStarOutline fontSize="2xl" />*/}
                            <HiOutlineStar className="w-5 h-5 text-highlight" />
                            {/*<HiStar className="w-5 h-5 text-highlight" />*/}
                        </button>
                    </div>
                    <div className=''>
                        <span className="block text-sm text-content-secondary font-medium">TJ 12345</span>
                        <span className="block text-sm text-content-secondary font-medium">KY 67890</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
