import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const username = searchParams.get('username');

    if (!username) {
        return NextResponse.json({ message: "Username is required" }, { status: 400 });
    }

    try {
        const jsonFilePath = path.join(process.cwd(), 'data', 'mockInstagramResponse.json');
        const fileContents = await fs.readFile(jsonFilePath, 'utf8');
        const mockData = JSON.parse(fileContents);
        
        mockData.data.username = username.toLowerCase();
        mockData.data.full_name = `Profile for ${username}`;
        mockData.data.follower_count = Math.floor(Math.random() * 10000000);

        await new Promise(resolve => setTimeout(resolve, 1000));

        return NextResponse.json(mockData);

    } catch (error: any) {
        console.error("Error in proxy API:", error);
        return NextResponse.json({ message: `Failed to fetch data: ${error.message}` }, { status: 502 }); // 502 Bad Gateway
    }
}