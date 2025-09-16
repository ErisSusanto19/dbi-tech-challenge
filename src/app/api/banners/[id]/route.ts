import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";

interface Params {
    params: {
        id: string;
    }
}

export async function PUT(request: Request, { params }: Params) {
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

export async function DELETE(request: Request, {params}: Params) {
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

        const deletedBanner = await prisma.banner.delete({
            where: {
                id
            }
        })

        return new NextResponse(null, {status: 204})
    } catch (error) {
        console.error("Error deleting banner:", error)

        if (error instanceof Error && 'http_code' in error) {
            return NextResponse.json({ message: `Cloudinary error: ${error.message}` }, { status: (error as any).http_code });
        }

        return NextResponse.json(
            {message: "Failed to delete banner"},
            {status: 500}
        )
    }
}