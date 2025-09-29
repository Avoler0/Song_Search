import React from "react";
import {HiXMark, HiMagnifyingGlass} from "react-icons/hi2";

export default function SearchPanel({ isSearchOpen } : any){
    const [selected, setSelected] = React.useState('all');
    const [isSelectOpen, setIsSelectOpen] = React.useState(false);
    const searchPlace = {
        all: '노래, 가수 검색',
        singer: '가수 검색',
        song: '노래 검색'
    }

    function selectedOption(str:string){
        setSelected(str);
        setIsSelectOpen(false);
    }

    const selectRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            console.log('핸들클릭',event)
            if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
                setIsSelectOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [selectRef]);

    return (
        <div
            className={`fixed top-14 z-10 bg-surface py-3 px-4 shadow-md transition-all visible' duration-300 ease-in-out w-full
                ${isSearchOpen ? 
                "opacity-100 translate-0" :
                "opacity-0 -translate-y-full"
                }
            `}
        >
            <div className="bg-surface-raised border border-outline flex rounded-md relative">
                <div className="border-r border-outline relative">
                    <button
                        type="button"
                        onClick={prev => setIsSelectOpen(prev => !prev) }
                        className="h-full px-3 font-medium text-content-primary text-xs text-nowrap"
                    >
                        {selected === 'all' ? '전체' : selected === 'song' ? '노래' : '가수' }
                        
                    </button>
                    <div
                        ref={selectRef}
                        className={`bg-surface-raised absolute top-full transition-all translate-y-1 w-full
                            ${isSelectOpen ? 'opacity-100 top-full translate-y-1' : 'opacity-0 top-0 translate-y-0'}
                        `} >
                        <ul className="border border-outline rounded-xs text-xs">
                            <li><button
                                onClick={() => selectedOption('all')}
                                className="px-1.5 py-1 text-content-secondary text-left w-full hover:bg-gray-100 focus:bg-gray-100">전체</button></li>
                            <li><button
                                onClick={() => selectedOption('song')}
                                className="px-1.5 py-1 text-content-secondary text-left w-full hover:bg-gray-100 focus:bg-gray-100">노래</button></li>
                            <li><button
                                onClick={() => selectedOption('singer')}
                                className="px-1.5 py-1 text-content-secondary text-left w-full hover:bg-gray-100 focus:bg-gray-100">가수</button></li>
                        </ul>
                    </div>
                </div>
                <input
                    type="text"
                    placeholder={searchPlace[selected]}
                    className="w-full py-1.5 px-4 text-sm text-content-secondary placeholder:text-content-tertiary focus:border-brand focus:outline-none"
                />
                <button className="text-content-secondary px-3" type="button">
                    <HiMagnifyingGlass className="h-5 w-5" />
                </button>
            </div>
        </div>
    )
}