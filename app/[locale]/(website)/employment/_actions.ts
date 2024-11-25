"use server"
import fs from "fs/promises"
import db from "@/db/db";
import { addJobSchema } from "@/schemas";

export async function getAvailableJobs() {
    const highlight = await db.availableJobs.findMany({
        where: { available: true },
        select: {
            id: true,
            jobNameAr: true,
            jobNameEn: true,
        }
    });
    return highlight;
}

export async function addNewJob(formData: FormData) {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const governorate = formData.get("governorate") as string;
    const jobName = formData.get("jobName") as string;
    const file = formData.get("file") as File | null;

    const parsedData = {
        name,
        email,
        phone,
        governorate,
        jobName,
        file,
    };

    const result = addJobSchema.safeParse(parsedData);
    if (!result.success) {
        return result.error.formErrors.fieldErrors;
    }

    const data = result.data;

    if (data.file) {
        await fs.mkdir("CVs", { recursive: true });
        const filePath = `CVs/${crypto.randomUUID()}-${data.file.name}`;
        // await fs.writeFile(filePath, Buffer.from(await data.file.arrayBuffer()));
        await fs.writeFile(filePath, new Uint8Array(await data.file.arrayBuffer()));

        await db.jobs.create({
            data: {
                jobName: data.jobName,
                file: filePath,
                email: data.email,
                governorate: data.governorate,
                name: data.name,
                phone: data.phone,
            }
        });
    }
}