"use server"

import db from "@/db/db"
import { notFound } from "next/navigation"
import { revalidatePath } from "next/cache"
import fs from "fs/promises"

export async function deleteJob(id: string) {
    const job = await db.jobs.delete({ where: { id } })

    if (job == null) return notFound()

    await fs.unlink(job.file)

    revalidatePath("/")
    revalidatePath("/admin/employments")
}

