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


export default function Header({ isSearchOpen, setIsSearchOpen  }: any){

    return (
        <header className={`
            sticky top-0 z-20 flex h-14 media-w items-center justify-between bg-surface px-2 py-4 
            ${ isSearchOpen ? 'border-b border-outline' : 'shadow-sm' }
        `}>
            <button className="cursor-pointer p-2">
                <HiBars3 className="h-7 w-7 text-content-secondary" />
            </button>

            <div className="flex items-center">
                <button
                    onClick={() => { setIsSearchOpen(prev => !prev); }}
                    className="cursor-pointer p-2"
                >
                    {
                        isSearchOpen ? (
                            <HiXMark className="h-6 w-6 text-content-secondary" />
                        ) : (
                            <HiMagnifyingGlass className="h-6 w-6 text-content-secondary" />
                        )

                    }
                </button>
                {/* 사용자 아이콘 */}
                <button className="cursor-pointer p-2">
                    <HiUserCircle className="h-7 w-7 text-content-secondary" />
                </button>
            </div>
        </header>
    );
}