import {supabase} from "@/app/lib/supabse";
import {SearchCategorys} from "@/app/lib/type";


export function getAllSongs(){

}

export function getSearchSongs(category:SearchCategorys,keyword:string){

}

export async function getTopChartSongs(){
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