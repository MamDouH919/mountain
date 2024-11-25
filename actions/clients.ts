
"use server"

import db from "@/db/db"
import { notFound } from "next/navigation"
import { revalidatePath } from "next/cache"
import { AddClientsSchema, UpdateClientsSchema } from "@/schemas"
import { storage } from '@/firebase'
import { deleteObject, ref } from 'firebase/storage'
import { saveImage } from "./saveImage"

export async function getClientsById(id: string) {
    const client = await db.clients.findUnique({
        where: { id },
        select: {
            id: true,
            nameAr: true,
            name: true,
            type: true,
            createdAt: true,
            imageName: true,
            imagePath: true,
        }
    });
    return client;
}


export async function deleteClient(id: string) {
    const client = await db.clients.delete({ where: { id } })

    if (client == null) return notFound()

    const imageName = client.imageName
    const desertRef = ref(storage, imageName);

    deleteObject(desertRef)

    revalidatePath("/")
    revalidatePath("/admin/clients")
}

export async function addClient(formData: FormData) {
    const name = formData.get("name") as string;
    const nameAr = formData.get("nameAr") as string;
    const type = formData.get("type");
    const image = formData.get("image") as File | null;

    const parsedData = {
        name,
        nameAr,
        type,
        image,
    };

    const result = AddClientsSchema.safeParse(parsedData)

    if (!result.success) {
        return {
            status: "error",
            data: result.error.formErrors.fieldErrors
        };
    }

    const data = result.data;

    if (data.image) {
        const { imagePath, imageName } = await saveImage(data.image!, "clients")

        await db.clients.create({
            data: {
                nameAr: data.nameAr,
                name: data.name,
                type: data.type,
                imagePath: imagePath,
                imageName: imageName,
            }
        })
    }

    revalidatePath("/")
    revalidatePath("/clients")
    revalidatePath("/admin/clients")
}

export async function updateClient(formData: FormData, id: string) {
    const name = formData.get("name") as string;
    const nameAr = formData.get("nameAr") as string;
    const type = formData.get("type") as string;
    const image = formData.get("image") as File | null;;

    const parsedData = {
        name,
        nameAr,
        type,
        ...(image && { image })
    };

    const result = UpdateClientsSchema.safeParse(parsedData)

    if (!result.success) {
        return {
            status: "error",
            data: result.error.formErrors.fieldErrors
        };
    }

    const data = result.data
    const client = await db.clients.findUnique({ where: { id } })

    if (client == null) return notFound()

    let prevImageName = client.imageName

    if (data.image != null && data.image.size > 0) {
        const desertRef = ref(storage, prevImageName);
        deleteObject(desertRef)

        const { imagePath, imageName } = await saveImage(data.image!, "clients")
        await db.clients.update({
            where: { id },
            data: {
                nameAr: data.nameAr,
                name: data.name,
                type: data.type,
                imageName: imageName,
                imagePath: imagePath,
            },
        })

        return {
            status: "done",
            data: {
                id: id,
                nameAr: data.nameAr,
                name: data.name,
                type: data.type,
                imagePath: imagePath,
            }
        }
    } else {
        await db.clients.update({
            where: { id },
            data: {
                nameAr: data.nameAr,
                name: data.name,
                type: data.type,
            },
        })

        return {
            status: "done",
            data: {
                id: id,
                nameAr: data.nameAr,
                name: data.name,
                type: data.type,
            }
        }
    }





}