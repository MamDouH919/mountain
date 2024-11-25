"use client"
import CustomDialog from '@/component/ui/customDialog'
import { Box, Button, Stack, Typography } from '@mui/material'
import React, { use, useEffect, useState } from 'react'
import { addHighlights, getHighlight, updateHighlights } from '../_actions'
import { useRouter } from 'next/navigation'
import Grid from '@mui/material/Unstable_Grid2'
import * as z from 'zod'
import { AddHighlightsSchema } from '@/schemas'
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next'
import db from '@/db/db'
import LoadingButton from '@mui/lab/LoadingButton'
import ControlMUITextField from '@/component/ui/ControlMUItextField'

const FormItem = ({ children, id, data }: { children: React.ReactNode, id?: string, data?: z.infer<typeof AddHighlightsSchema> }) => {
    const [openDialog, setOpenDialog] = useState(false)
    const router = useRouter()
    const [loading, setLoading] = useState(false)

    const { handleSubmit, setValue, control, setError, reset } = useForm<z.infer<typeof AddHighlightsSchema>>();

    useEffect(() => {
        if (id && openDialog) {
            getHighlight(id).then((data) => {
                setValue('nameEn', data?.nameEn ?? '')
                setValue('nameAr', data?.nameAr ?? '')
                setValue('number', data?.number ?? NaN)
                // You can update your form's default values here
            })
        }
    }, [id, openDialog, setValue])

    const onSubmit = async (data: z.infer<typeof AddHighlightsSchema>) => {
        setLoading(true)
        if (id) {
            await updateHighlights(data, id).
                then((res) => {
                    if (res) {
                        setLoading(true)

                        for (const [field, messages] of Object.entries(res)) {
                            setError(field as keyof z.infer<typeof AddHighlightsSchema>, {
                                type: "validate",
                                message: messages[0] // Assuming we take the first message
                            });
                        }
                    } else {
                        closeDialog()
                        router.refresh()
                    }
                })
            return
        }
        await addHighlights(data).
            then((res) => {
                setLoading(false)

                if (res) {
                    for (const [field, messages] of Object.entries(res)) {
                        setError(field as keyof z.infer<typeof AddHighlightsSchema>, {
                            type: "validate",
                            message: messages[0] // Assuming we take the first message
                        });
                    }
                } else {
                    closeDialog()
                    router.refresh()
                }
            })
    }

    const closeDialog = () => {
        setOpenDialog(false)
        reset()
    }

    const openDialogFun = () => {
        setOpenDialog(true)
    }

    const { t } = useTranslation(['dashboard'])

    return (
        <>
            {openDialog && <CustomDialog
                open={openDialog}
                handleClose={closeDialog}
                title={t("addNew")}
                maxWidth='md'
                PaperProps={{
                    component: 'form',
                    onSubmit: handleSubmit(onSubmit),
                    noValidate: true,
                }}
                content={
                    <Box py={2}>
                        <Grid container spacing={2} m={0}>
                            <Grid xs={12}>
                                <ControlMUITextField
                                    name='nameEn'
                                    label={t('nameEn')}
                                    control={control}
                                    fullWidth
                                    rules={{
                                        required: t("fieldIsRequired")
                                    }}
                                />
                            </Grid>
                            <Grid xs={12}>
                                <ControlMUITextField
                                    name='nameAr'
                                    label={t('nameAr')}
                                    fullWidth
                                    control={control}
                                    rules={{
                                        required: t("fieldIsRequired")
                                    }}
                                />
                            </Grid>
                            <Grid xs={12}>
                                <ControlMUITextField
                                    name='number'
                                    label={t('number')}
                                    type='number'
                                    fullWidth
                                    control={control}
                                    rules={{
                                        required: t("fieldIsRequired")
                                    }}
                                />
                            </Grid>
                        </Grid>
                    </Box>
                }
                actions={
                    <Stack justifyContent={"flex-end"} direction={"row"} spacing={1}>
                        <LoadingButton loading={loading} variant='contained' color='success' type='submit'>{t("save")}</LoadingButton>
                        <Button variant='contained' color='inherit' onClick={closeDialog}>{t("cancel")}</Button>
                    </Stack>
                }
            />}
            <div onClick={openDialogFun}>
                {children}
            </div>
        </>
    )
}

export default FormItem
