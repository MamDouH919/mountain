
"use server"

import db from "@/db/db"
import { notFound } from "next/navigation"
import { revalidatePath } from "next/cache"
import { AddNewsSchema, UpdateNewsSchema } from "@/schemas"
import { saveImage } from "./saveImage"
import { deleteObject, ref } from "firebase/storage"
import { storage } from "@/firebase"

export async function deleteNews(id: string) {
    const news = await db.news.delete({ where: { id } })

    if (news == null) return notFound()

    const imageName = news.imageName
    const desertRef = ref(storage, imageName);
    deleteObject(desertRef)

    revalidatePath("/")
    revalidatePath("/admin/news")
}

export async function addNews(formData: FormData) {
    const titleAr = formData.get("titleAr") as string;
    const title = formData.get("title") as string;
    const descriptionAr = formData.get("descriptionAr") as string;
    const description = formData.get("description") as string;
    const image = formData.get("image") as File | null;

    const parsedData = {
        titleAr,
        title,
        descriptionAr,
        description,
        image,
    };

    const result = AddNewsSchema.safeParse(parsedData)

    if (!result.success) {
        return result.error.formErrors.fieldErrors;
    }

    const data = result.data;

    if (data.image) {
        const { imagePath, imageName } = await saveImage(data.image!, "news")
        await db.news.create({
            data: {
                titleAr: data.titleAr,
                title: data.title,
                descriptionAr: data.descriptionAr,
                description: data.description,
                imagePath: imagePath,
                imageName: imageName,
            }
        })
    }

    revalidatePath("/")
    revalidatePath("/news")
    revalidatePath("/admin/news")
}

export async function updateNews(formData: FormData, id: string) {
    const titleAr = formData.get("titleAr") as string;
    const title = formData.get("title") as string;
    const descriptionAr = formData.get("descriptionAr") as string;
    const description = formData.get("description") as string;
    const image = formData.get("image") as File | null;

    const parsedData = {
        titleAr,
        title,
        descriptionAr,
        description,
        ...(image && { image })
    };

    const result = UpdateNewsSchema.safeParse(parsedData)

    if (!result.success) {
        return result.error.formErrors.fieldErrors;
    }

    const data = result.data
    const news = await db.news.findUnique({ where: { id } })

    if (news == null) return notFound()

    let prevImageName = news.imageName

    if (data.image != null && data.image.size > 0) {
        const desertRef = ref(storage, prevImageName);
        deleteObject(desertRef)

        const { imagePath, imageName } = await saveImage(data.image!, "clients")
        await db.news.update({
            where: { id },
            data: {
                titleAr: data.titleAr,
                title: data.title,
                descriptionAr: data.descriptionAr,
                description: data.description,
                imageName: imageName,
                imagePath: imagePath
            },
        })
    } else {
        await db.news.update({
            where: { id },
            data: {
                titleAr: data.titleAr,
                title: data.title,
                descriptionAr: data.descriptionAr,
                description: data.description,
            },
        })
    }



    revalidatePath("/")
    revalidatePath("/news")
    revalidatePath("/admin/news")
}

export async function getNewsById(id: string) {
    const news = await db.news.findUnique({
        where: { id },
        select: {
            id: true,
            titleAr: true,
            title: true,
            descriptionAr: true,
            description: true,
            imagePath: true,
        }
    });
    return news;
}
