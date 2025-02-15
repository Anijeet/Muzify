import { prismaClient } from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";
import {z} from "zod"
//@ts-ignore
import youtubesearchapi from "youtube-search-api"
import { getServerSession } from "next-auth";

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
        
        const preextracedId= data.url.split("be/")[1]
        const extracedId=preextracedId.split('?')[0]
        const res = await youtubesearchapi.GetVideoDetails(extracedId)
        console.log(extracedId)
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
            ...stream,
            haveUpvoted:false,
            upvotes:0
        })
    } catch (e) {
        console.log(e)
        return NextResponse.json({
            message:"Something went wrong"
        },{
            status:411
        })
    }
}


export async function GET(req:NextRequest){
     const session = await getServerSession();
        const user = await prismaClient.user.findFirst({
            where: {
              email: session?.user?.email ?? "",
            },
          });
          if (!user) {
            return NextResponse.json(
              {
                message: "Us not found",
              },
              {
                status: 411,
              }
            );
          }
    const creatorId = req.nextUrl.searchParams.get('creatorId')
    
    if(!creatorId){
        return NextResponse.json({
            msg:"Error"
        } , {
            status: 411
        })
    }
    const streams = await prismaClient.stream.findMany({
        where:{
            userId:creatorId
        },
        include:{
            _count:{
                select:{
                    upvotes:true
                }
            },
            upvotes:{
              where:{
                userId:user.id
              }
            }
        }
        })
    
        return NextResponse.json({
            streams:streams.map(({_count,...rest})=>({
                ...rest,
                upvotes: _count.upvotes,
                haveUpvoted:rest.upvotes.length ? true : false
            }))
        })
}