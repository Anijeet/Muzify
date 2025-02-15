import { prismaClient } from "@/app/lib/db";
import { getServerSession } from "next-auth";
import { getSession } from "next-auth/react";
import { NextRequest, NextResponse } from "next/server";
import { string, z } from "zod";

const UpvoteSchema=z.object({
    streamId: z.string()
})

export async function POST(req: NextRequest) {
  const session = await getServerSession();

  const user = await prismaClient.user.findFirst({
    where: {
      email: session?.user?.email ?? "",
    },
  });
  if (!user) {
    return NextResponse.json(
      {
        message: "USer not found",
      },
      {
        status: 411,
      }
    );
  }

  try {
    const data =UpvoteSchema.parse(await req.json())
    await prismaClient.upvote.delete({
        where:{
            userId_streamId:{
                userId:user.id,
                streamId:data.streamId
            }
        }
    });
    return NextResponse.json({
      msg:"Done!"
    })
  } catch (error) {
    return NextResponse.json({
        message:"Something went wrong"
    },{
        status:411
    })
}
  
}
