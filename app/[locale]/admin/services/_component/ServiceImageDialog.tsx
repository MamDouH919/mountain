import { saveServiceImage } from '@/actions/services'
import CustomDialog from '@/component/ui/customDialog'
import UploadFile from '@/component/ui/UploadFile'
import { ServicesImagesSchema } from '@/schemas'
import LoadingButton from '@mui/lab/LoadingButton'
import { Box, Button, Stack } from '@mui/material'
import Image from 'next/image'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import * as z from 'zod'
import { imageType } from '../_Form'

interface InputProps {
    openDialog: boolean
    closeDialog: (data?: imageType) => void
    id: string
}

const ServiceImageDialog = (props: InputProps) => {
    const { openDialog, closeDialog, id } = props
    const [loading, setLoading] = useState(false)
    const { t } = useTranslation(["dashboard"])
    const { handleSubmit, control, reset, setValue, watch, setError } = useForm<z.infer<typeof ServicesImagesSchema>>()

    const previewImage = (file: File | string) => {
        let previewUrl
        if (file && typeof file !== "string") {
            previewUrl = URL.createObjectURL(file);
            return previewUrl
        }
        return "/noImage.jpg"
    }

    const onSubmit = async (data: z.infer<typeof ServicesImagesSchema>) => {
        setLoading(true)
        const formData = new FormData();
        formData.append("image", data?.image);
        const result = await saveServiceImage(id, formData)
        if (result.status === "error") {
            if (result.errors) {
                setLoading(false)
                for (const [field, messages] of Object.entries(result.errors)) {
                    setError(field as keyof z.infer<typeof ServicesImagesSchema>, {
                        type: "validate",
                        message: messages[0] // Assuming we take the first message
                    });
                }
            }
        } else {
            closeDialog(result?.data)
        }

    }

    return (
        <CustomDialog
            open={openDialog}
            handleClose={() => closeDialog()}
            title={t("newImage")}
            maxWidth='md'
            PaperProps={{
                component: 'form',
                onSubmit: handleSubmit(onSubmit),
                noValidate: true
            }}
            content={
                <Stack p={2} alignItems={"center"}>
                    <Image
                        src={previewImage(watch("image"))}
                        alt="new service image"
                        width={200}
                        height={200}
                        objectFit='cover'
                    />

                    <UploadFile
                        control={control}
                        setValue={setValue}
                        name={"image"}
                        icon={"add_photo_alternate"}
                        label={t("uploadImage")}
                        accept=".png,.jpg,.jpeg"
                        maxSize={250 * 1024}
                        rules={{
                            validate: {
                                require: (value: any) =>
                                    value ? true : t("fieldIsRequired"),
                            },
                        }}
                    />
                </Stack>
            }
            actions={
                <Stack justifyContent={"flex-end"} direction={"row"} spacing={1}>
                    <LoadingButton variant='contained' type='submit' loading={loading}>{t("save")}</LoadingButton>
                    <Button variant='contained' color='error' disabled={loading} onClick={() => closeDialog()}>{t("cancel")}</Button>
                </Stack>
            }
        />
    )
}

export default ServiceImageDialog