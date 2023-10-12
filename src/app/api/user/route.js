import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function GET() {
    try {
        const users = await prisma.user.findMany();
        return NextResponse.json({ data: users });
    } catch (err) {
        return NextResponse.json({ status: 'failed', data: err.message });
    }
}

export async function POST(req, res) {
    try {
        const body = await req.json();
        const newUser = await prisma.user.create({
            data: body,
        });

        return NextResponse.json({ data: newUser });
    } catch (err) {
        return NextResponse.json({ status: 'failed', data: err.message });
    }
}

export async function PUT(req, res) {
    try {
        const body = await req.json();
        const { id } = body || {};
        const updatedUser = await prisma.user.update({
            where: {
                id: Number(id),
            },
            data: body,
        });
        return NextResponse.json({ data: updatedUser });
    } catch (err) {
        return NextResponse.json({ status: 'failed', data: err.message });
    }
}

export async function DELETE(req) {
    try {
        const body = await req.json();
        const { id } = body;
        const deletedData = await prisma.user.delete({
            where: {
                id: Number(id),
            },
        });
        return NextResponse.json({ data: deletedData }, { status: 200 });
    } catch (err) {
        return NextResponse.json({ status: 'failed', data: err.message });
    }
}
