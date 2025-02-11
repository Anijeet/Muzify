import { prismaClient } from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";
import {z} from "zod"
//@ts-ignore
import youtubesearchapi from "youtube-search-api"

const YT_Regrex= /^(?:https?:\/\/)?(?:www\.)?(?:m\.)?(?:youtube\.com\/(?:watch\?(?!.*\blist=)(?:.*&)?v=|embed\/|v\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})(?:[?&]\S+)?$/
const CreateStreamSchema= z.object({
    creatorId:z.string(),
    url:z.string()
})

export async function POST(req:NextRequest){
    try {
        const data = CreateStreamSchema.parse(await req.json())
        const isYT = data.url.match(YT_Regrex)
        if(!isYT){
            return NextResponse.json({
                message:"Wrong url"
            },{
                status:411
            })
        }
        const extracedId= data.url.split("?v=")[1]
        const res = await youtubesearchapi.GetVideoDetails(extracedId)
        const thumbnails=res.thumbnail.thumbnails
        thumbnails.sort((a:{width:number},b:{width:number})=>a.width<b.width ? -1 :1)
        const stream =await prismaClient.stream.create({
            data:{
                userId:data.creatorId,
                url:data.url,
                extracedId,
                type:"Youtube",
                title:res.title ?? "Cannot find Video",
                smallImg:(thumbnails.length>1 ? thumbnails[thumbnails.length-2].url : thumbnails[thumbnails.length-1].url) ?? "https://tse1.mm.bing.net/th?id=OIP.Nn37ffqkhJadETMlz1WuWAHaHa&pid=Api&P=0&h=180",
                bigImg:thumbnails[thumbnails.length-1].url ?? "https://tse1.mm.bing.net/th?id=OIP.Nn37ffqkhJadETMlz1WuWAHaHa&pid=Api&P=0&h=180"
            }
        })
        return NextResponse.json({
            msg:"Stream has been created",
            id:stream.id
        })
    } catch (e) {
        return NextResponse.json({
            message:"Something went wrong"
        },{
            status:411
        })
    }
}


export async function GET(req:NextRequest){
    const creatorId = req.nextUrl.searchParams.get('creatorId')
    const streams = await prismaClient.stream.findMany({
    where:{
        userId:creatorId ?? ""
    }
    })

    return NextResponse.json({
        data:streams
    })
}