"use server"

import db from "@/db/db"
import { z } from "zod"
import { notFound } from "next/navigation"
import { revalidatePath } from "next/cache"
import { AddAvailableJobsSchema } from "@/schemas"

export async function getAvailableJob(id: string) {
    const job = await db.availableJobs.findUnique({ where: { id } });
    return job;
}

export async function addAvailableJob(formData: z.infer<typeof AddAvailableJobsSchema>) {
    const result = AddAvailableJobsSchema.safeParse(formData)

    if (result.success === false) {
        return result.error.formErrors.fieldErrors
    }

    await db.availableJobs.create({
        data: {
            jobNameEn: result.data.jobNameEn,
            jobNameAr: result.data.jobNameAr,
            available: result.data.available,
        }
    })
}

export async function updateAvailableJob(formData: z.infer<typeof AddAvailableJobsSchema>, id: string) {
    const result = AddAvailableJobsSchema.safeParse(formData)

    if (result.success === false) {
        return result.error.formErrors.fieldErrors
    }

    await db.availableJobs.update({
        where: { id },
        data: {
            jobNameEn: result.data.jobNameEn,
            jobNameAr: result.data.jobNameAr,
            available: result.data.available,
        }
    })

    revalidatePath("/admin")
    revalidatePath("/admin/available-jobs")
}

export async function deleteAvailableJob(id: string) {
    const product = await db.availableJobs.delete({ where: { id } })

    if (product == null) return notFound()

    revalidatePath("/")
    revalidatePath("/admin/available-jobs")
}

