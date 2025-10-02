"use client";

import {Song} from "@/app/page";
import { HiStar, HiOutlineStar } from 'react-icons/hi2';
import { FaYoutube } from 'react-icons/fa';
import Image from "next/image";
import {CopyToClipboard} from "react-copy-to-clipboard/src";

export default function SongCard({song}:{ song: Song }) {
    const isDupComp = song.composer == song.lyricist

    function clickPaste(text:string){
        if(!text) return

        navigator.clipboard.writeText(text);
        alert('노래번호가 복사 되었습니다.');
    }

    return (
        <li className="border border-gray-200 bg-surface-raised rounded-md select-none flex items-start space-x-4 p-4 w-full">
            <div className="rounded-sm overflow-hidden shrink-0 relative object-cover h-16 mr-3 w-16">
                {
                    song.album_art ?
                        <Image src={song.album_art} alt={song.title} className="object-cover" fill /> :
                        <Image src="/assets/images/default_album.png" alt={song.title} className="object-cover" fill />
                }
            </div>
            <div className="flex justify-between flex-grow space-x-3">
                <div className="flex-grow">
                    <h3 className="leading-none text-lg font-semibold text-gray-900">{song.title}</h3>
                    <p className="leading-none mt-1 text-xs text-contet-secondary line-clamp-1">{song.artists.name}</p>
                    <p className="leading-none text-xs text-content-secondary mt-1.5 line-clamp-1">작곡: {song.composer}</p>
                    <p className="leading-none text-xs text-content-secondary mt-0.5 line-clamp-1">작사: {song.lyricist}</p>
                </div>
                <div className="flex flex-col justify-between flex-shrink-0">
                    <div className="items-center flex justify-between space-x-2">
                        <a
                            href={song.youtubeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-youtube"
                        >
                            <FaYoutube className="h-6 w-6" />
                        </a>
                        <button type="button" className="cursor-pointer">
                            {
                                song.isBookmarked ?
                                    <HiOutlineStar className="w-5 h-5 text-highlight" /> :
                                    <HiStar className="w-5 h-5 text-highlight" />

                            }
                        </button>
                    </div>
                    <div className=''>
                        <p
                            onClick={() => {clickPaste(song.song_no_tj)}}
                            className={`
                                block leading-none text-sm text-content-secondary font-medium mt-0.5 ${song.song_no_tj &&  'cursor-pointer'}
                            `}>
                            <em className="inline-block not-italic mr-1 w-4.5">TJ</em>
                            <span className="select-text">{song.song_no_tj}</span>
                        </p>
                        <p
                            onClick={() => {clickPaste(song.song_no_ky)}}
                            className={`
                                block leading-none text-sm text-content-secondary font-medium mt-0.5 ${song.song_no_ky &&  'cursor-pointer'}
                            `}>
                            <em className="inline-block not-italic mr-1 w-4.5">KY</em>
                            <span className="select-text">{song.song_no_ky}</span>
                        </p>
                    </div>
                </div>
            </div>
        </li>
    );
}
