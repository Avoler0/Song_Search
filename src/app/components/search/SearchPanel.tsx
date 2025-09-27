import {HiXMark} from "react-icons/hi2";
import React from "react";


export default function SearchPanel({ isSearchOpen } : any){
    return (
        <div
            className={`fixed top-[60px] z-10 bg-surface p-4 shadow-md transition-all opacity-100 -translate-y-full visible' duration-300 ease-in-out w-full`}
        >
            <div className="relative">
                <input
                    type="text"
                    placeholder="노래, 가수 검색"
                    className="w-full rounded-md border border-outline bg-surface-raised py-2 px-4 text-content focus:border-brand focus:outline-none"
                />
            </div>
            {/* 카테고리 버튼 추가 (이미지에 맞춰 다시 넣었습니다) */}
            <button className="mt-3 flex w-full items-center justify-center whitespace-nowrap rounded-md border border-outline bg-surface-raised px-3 py-2 text-content-subtle">
                카테고리
                <HiXMark className="ml-2 h-4 w-4" /> {/* 카테고리 옆 작은 X 아이콘은 예시입니다. */}
            </button>
        </div>
    )
}