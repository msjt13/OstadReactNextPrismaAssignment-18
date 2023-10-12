import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function GET() {
    try {
        const data = await prisma.post_comment.findMany();
        return NextResponse.json({ data: data });
    } catch (err) {
        return NextResponse.json({ status: 'failed', data: err.message });
    }
}

export async function POST(req, res) {
    try {
        const body = await req.json();
        const Data = await prisma.post_comment.create({
            data: body,
        });

        return NextResponse.json({ data: Data });
    } catch (err) {
        return NextResponse.json({ status: 'failed', data: err.message });
    }
}

export async function PUT(req, res) {
    try {
        const body = await req.json();
        const { id } = body || {};
        const updatedData = await prisma.post_comment.update({
            where: {
                id: Number(id),
            },
            data: body,
        });
        return NextResponse.json({ data: updatedData });
    } catch (err) {
        return NextResponse.json({ status: 'failed', data: err.message });
    }
}

export async function DELETE(req) {
    try {
        const body = await req.json();
        const { id } = body;
        const deletedData = await prisma.post_comment.delete({
            where: {
                id: Number(id),
            },
        });
        return NextResponse.json({ data: deletedData }, { status: 200 });
    } catch (err) {
        return NextResponse.json({ status: 'failed', data: err.message });
    }
}
