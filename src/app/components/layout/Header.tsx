'use client';

import {
    HiMagnifyingGlass,
    HiChevronDown,
    HiUserCircle,
    HiPlay,
    HiStar,
    HiBars3,
    HiXMark
} from 'react-icons/hi2';
import React from "react";


export default function Header({ isSearchOpen }: any){

    return (
        <header className="sticky top-0 z-20 flex h-[60px] w-full items-center justify-between bg-surface p-4 shadow-sm">
            {/* 왼쪽: 햄버거 메뉴 아이콘 */}
            <button className="p-2">
                <HiBars3 className="h-7 w-7 text-content-secondary" />
            </button>

            {/* 오른쪽: 검색 아이콘 (클릭 시 토글) + 사용자 아이콘 */}
            <div className="flex items-center">
                {/* 검색 아이콘 (클릭 시 검색창 토글) */}
                <button
                    onClick={() => { isSearchOpen.value = true }}
                    className="p-2"
                >
                    {/*<HiXMark className="h-6 w-6 text-content-secondary" />*/}
                    <HiMagnifyingGlass className="h-6 w-6 text-content-secondary" />
                </button>
                {/* 사용자 아이콘 */}
                <button className="p-2">
                    <HiUserCircle className="h-7 w-7 text-content-secondary" />
                </button>
            </div>
        </header>
    );
}