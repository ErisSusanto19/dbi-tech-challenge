import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const username = searchParams.get('username');

    if (!username) {
        return NextResponse.json({ message: "Username is required" }, { status: 400 });
    }

    const targetUrl = `https://sprintpedia.id/page/instagram_tools?username=${username}`;

    try {
        const response = await fetch(targetUrl, {
            headers: {
                'Cookie': process.env.SPRINTPEDIA_COOKIE!,
                'X-Requested-With': 'XMLHttpRequest',
            },
            cache: 'no-store',
        });
        
        if (!response.ok) {
            const errorData = await response.text();
            throw new Error(`API target responded with status ${response.status}: ${errorData}`);
        }

        const data = await response.json();
        return NextResponse.json(data);

    } catch (error: any) {
        console.error("Error in proxy API:", error);
        return NextResponse.json({ message: `Failed to fetch data: ${error.message}` }, { status: 502 }); // 502 Bad Gateway
    }
}