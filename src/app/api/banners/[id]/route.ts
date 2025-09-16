import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";

export async function PUT(request: NextRequest, { params }: { params: { id: string }}) {
    try {
        const { id } = params
        const body = await request.json()
        const { imageUrl, title, ctaLink, isActive } = body

        const banner = await prisma.banner.findUnique({
            where: {
                id
            }
        })

        if(!banner){
            return NextResponse.json(
                {message: "Banner not found"},
                {status: 404}
            )
        }

        const updatedBanner = await prisma.banner.update({
            where: {
                id
            },
            data: {
                imageUrl,
                title,
                ctaLink,
                isActive
            }
        })

        return NextResponse.json(updatedBanner, {status: 200})
        
    } catch (error) {
        console.error("Error updating banner: ", error)
        return NextResponse.json(
            {message: "Failed to update banner"}, 
            {status: 500}
        )
    }
}

const getPublicIdFromUrl = (url: string): string | null => {
    const regex = /\/v\d+\/([^\/]+)\.\w{3,4}$/;
    const match = url.match(regex);
    return match ? match[1] : null;
}

export async function DELETE(request: NextRequest, {params}: { params: { id: string }}) {
    try {
        const { id } = params

        const banner = await prisma.banner.findUnique({
            where: {
                id
            }
        })
       
        if(!banner) {
            return NextResponse.json(
                {message: "Banner not found"},
                {status: 404}
            )
        }

        if (banner.imageUrl) {
            const publicId = getPublicIdFromUrl(banner.imageUrl);
            
            if (publicId) {
                await cloudinary.uploader.destroy(publicId);
            } else {
                console.warn(`Could not extract public_id from URL: ${banner.imageUrl}`);
            }
        }

        await prisma.banner.delete({
            where: {
                id
            }
        })

        return new NextResponse(null, {status: 204})
    } catch (error) {
        console.error("Error deleting banner:", error)

        if (
            typeof error === 'object' && 
            error !== null && 
            'message' in error && 
            'http_code' in error
        ) {
            const cloudinaryError = error as { message: string; http_code: number };
            return NextResponse.json(
                { message: `Cloudinary error: ${cloudinaryError.message}` },
                { status: cloudinaryError.http_code }
            );
        }

        if (error instanceof Error) {
            return NextResponse.json({ message: `Failed to delete banner: ${error.message}` }, { status: 500 });
        }

        return NextResponse.json(
            {message: "An unknown error occurred"},
            {status: 500}
        )
    }
}