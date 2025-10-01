"use client" ;

import React from "react";
import Header from "@/app/components/layout/Header";
import SearchPanel from "@/app/components/search/SearchPanel";


export default function HeaderLayout(){
    const [isSearchOpen, setIsSearchOpen] = React.useState(true);

    return(
        <>
            <Header isSearchOpen={isSearchOpen}
                    setIsSearchOpen={setIsSearchOpen}
            />
            <SearchPanel isSearchOpen={isSearchOpen} />
        </>
    )
}