import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    try {
        const banners = await prisma.banner.findMany({
            take: 5,
            where: {
                isActive: true
            },
            orderBy: {
                updatedAt: "desc"
            }
        })

        return NextResponse.json(banners)
        
    } catch (error) {
        console.error("Error fetching banners: ", error);
        return NextResponse.json(
            { message: "Failed to fetch banners" },
            { status: 500 }
        )
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const { imageUrl, title, ctaLink, isActive } = body

        if(!imageUrl){
            return NextResponse.json(
                { message: "Image URL is required."},
                { status: 400 }
            )
        }

        const newBanner = await prisma.banner.create({
            data: {
                imageUrl,
                title,
                ctaLink,
                isActive
            }
        })

        return NextResponse.json(newBanner, { status: 201 })

    } catch (error) {
        console.error("Error creating banner: ", error)
        return NextResponse.json(
            { message: "Failed to create banner"},
            { status: 500 }
        )
    }
}