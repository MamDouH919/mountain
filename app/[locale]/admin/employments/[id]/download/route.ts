import db from "@/db/db"
import { notFound } from "next/navigation"
import { NextRequest, NextResponse } from "next/server"
import fs from "fs/promises"

export async function GET(
    req: NextRequest,
    { params: { id } }: { params: { id: string } }
) {
    const product = await db.jobs.findUnique({
        where: { id: id },
        select: { file: true, name: true },
    })

    if (product == null) return notFound()

    const { size } = await fs.stat(product.file)
    const file = await fs.readFile(product.file)
    const extension = product.file.split(".").pop()

    return new NextResponse(file, {
        headers: {
            "Content-Disposition": `attachment; filename="${product.name}.${extension}"`,
            "Content-Length": size.toString(),
        },
    })
}
