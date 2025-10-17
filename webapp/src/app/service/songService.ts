import {supabase} from "@/app/lib/supabse";
import {SearchCategorys} from "@/app/lib/type";
import {prisma, songs} from "@/app/lib/prisma";

interface SearchSongsResult extends songs {
    match_type: 'TITLE' | 'ARTIST';
    artists: { name: string | null } | null;
}

export async function getSeachSongs(keyword:string,category:SearchCategory){

    if(category === 'all' || category === 'song'){
        const titleFind = await prisma.songs.findMany({
            where: { title: { contains: keyword , mode: 'insensitive'} },
            include: { artists: { select: { name: true } } },
            orderBy: { title: 'asc' },
            take: 20,
        });

        const flaggedTitleMatches: SearchSongsResult[] = titleFind.map(song => ({
            ...song,
            match_type: 'TITLE',
        })) as SearchSongsResult[];

        if(category === 'song'){
            return flaggedTitleMatches;
        }

        const artistsFind = await prisma.songs.findMany({
            where: {
                artists:{
                    name: { contains: keyword, mode: 'insensitive' },
                },
                id: { notIn: flaggedTitleMatches.map(s => s.id) }
            },
            include: { artists: { select: { name:true } } },
            orderBy: { title:'asc' },
            take: 20,
        })

        const flaggedArtistsFind:SearchSongsResult[] = artistsFind.map(artist => ({
            ...artist,
            match_type: 'ARTIST',
        })) as SearchSongsResult[]

        return [...flaggedTitleMatches, ...flaggedArtistsFind ];
    }else if(category === 'artist'){
        const artistsFind = await prisma.songs.findMany({
            where: { artists: { name: { contains: cleanKeyword, mode: 'insensitive' } } },
            include: { artists: { select: { name: true } } },
            orderBy: { title: 'asc' },
            take: 20, // 💡 가수 검색 결과 20개 제한
        });

        return artistsFind.map(artist => ({
            ...artist,
            match_type: 'ARTIST',
        })) as SearchSongsResult[]
    }

    return [];
}

export async function getSearchSongsByTitle(songName:string){
    const data = await prisma.songs.findMany({
        take:20,
        //skip:0
        where: {
            title: songName,
        },
        include: {
            artists: true
        }
    })

    console.log(data)
}

export async function getSearchSongsByArtist(artistName:string){
    const data = await prisma.songs.findMany({
        take:20,
        //skip:0
        where: {
            artists:{
                name: {
                    contains: artistName,
                    mode: 'insensitive'
                }
            }
        },
    })

    console.log(data)
}

export async function getTopChartSongs(){

    const d = prisma.songs.findMany(
        {}
    );
    const { data, error } = await supabase
        .from('songs')
        .select(`
            *,
            artists (
                name
              )
        `)
        .limit(100)

    if(error){
        console.error('인기순위가 없습니다.',error);
        return [];
    }

    return data;
}

export function getLatestSongs(){

}