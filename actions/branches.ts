
"use server"

import db from "@/db/db"
import { notFound } from "next/navigation"
import { revalidatePath } from "next/cache"
import { AddBranchesSchema, UpdateBranchesSchema } from "@/schemas"
import { saveImage } from "./saveImage"
import { storage } from "@/firebase"
import { deleteObject, ref } from "firebase/storage"

export async function getBranches() {
    const branches = await db.branches.findMany({
        select: {
            id: true,
            imageName: true,
            imagePath: true,
            nameAr: true,
            name: true,
            locationAr: true,
            location: true,
            mobile: true,
            whatsApp: true,
        },
        orderBy: { createdAt: "asc" },
    })

    return branches
}

export async function getBranchesDropDown() {
    const branches = await db.branches.findMany({
        select: {
            nameAr: true,
            name: true,
        },
        orderBy: { createdAt: "asc" },
    })

    return branches
}

export async function deleteBranch(id: string) {
    const branch = await db.branches.delete({ where: { id } })

    if (branch == null) return notFound()

    const imageName = branch.imageName
    const desertRef = ref(storage, imageName);

    deleteObject(desertRef)

    revalidatePath("/")
    revalidatePath("/admin/branches")
}

export async function addBranch(formData: FormData) {
    const name = formData.get("name") as string;
    const nameAr = formData.get("nameAr") as string;
    const locationAr = formData.get("locationAr") as string;
    const location = formData.get("location") as string;
    const whatsApp = formData.get("whatsApp") as string;
    const mobile = formData.get("mobile") as string;
    const gps = formData.get("gps") as string;
    const image = formData.get("image") as File | null;

    const parsedData = {
        name,
        nameAr,
        locationAr,
        location,
        whatsApp,
        mobile,
        gps,
        image,
    };

    const result = AddBranchesSchema.safeParse(parsedData)

    if (!result.success) {
        return result.error.formErrors.fieldErrors;
    }

    const data = result.data;

    if (data.image) {
        const { imagePath, imageName } = await saveImage(data.image!, "branches")

        await db.branches.create({
            data: {
                nameAr: data.nameAr,
                name: data.name,
                locationAr: data.locationAr,
                location: data.location,
                whatsApp: data.whatsApp,
                mobile: data.mobile,
                imageName: imageName,
                imagePath: imagePath,
                gps: data.gps
            }
        })
    }

    revalidatePath("/")
    revalidatePath("/branches")
    revalidatePath("/admin/branches")
}

export async function updateBranch(formData: FormData, id: string) {
    const name = formData.get("name") as string;
    const nameAr = formData.get("nameAr") as string;
    const locationAr = formData.get("locationAr") as string;
    const location = formData.get("location") as string;
    const whatsApp = formData.get("whatsApp") as string;
    const mobile = formData.get("mobile") as string;
    const gps = formData.get("gps") as string;
    const image = formData.get("image") as File | null;

    const parsedData = {
        name,
        nameAr,
        locationAr,
        location,
        whatsApp,
        mobile,
        gps,
        ...(image && { image })
    };

    const result = UpdateBranchesSchema.safeParse(parsedData)

    if (!result.success) {
        return result.error.formErrors.fieldErrors;
    }

    const data = result.data
    const branch = await db.branches.findUnique({ where: { id } })

    if (branch == null) return notFound()

    let prevImageName = branch.imageName

    if (data.image != null && data.image.size > 0) {
        const desertRef = ref(storage, prevImageName);
        deleteObject(desertRef)

        const { imagePath, imageName } = await saveImage(data.image!, "clients")
        await db.branches.update({
            where: { id },
            data: {
                nameAr: data.nameAr,
                name: data.name,
                locationAr: data.locationAr,
                location: data.location,
                whatsApp: data.whatsApp,
                mobile: data.mobile,
                gps: data.gps,
                imageName: imageName,
                imagePath: imagePath,
            },
        })
    } else {
        await db.branches.update({
            where: { id },
            data: {
                nameAr: data.nameAr,
                name: data.name,
                locationAr: data.locationAr,
                location: data.location,
                whatsApp: data.whatsApp,
                gps: data.gps,
                mobile: data.mobile,
            },
        })
    }

    revalidatePath("/")
    revalidatePath("/branches")
    revalidatePath("/admin/branches")
}

export async function getBranchById(id: string) {
    const branches = await db.branches.findUnique({
        where: { id },
        select: {
            id: true,
            nameAr: true,
            name: true,
            locationAr: true,
            location: true,
            whatsApp: true,
            mobile: true,
            imageName: true,
            imagePath: true,
            gps: true
        }
    });
    return branches;
}
