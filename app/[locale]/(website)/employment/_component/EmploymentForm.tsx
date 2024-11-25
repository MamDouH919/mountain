"use client"
import Grid from '@mui/material/Unstable_Grid2'
import React, { useEffect, useState } from 'react'
import { SelectElement, TextFieldElement, RadioButtonGroup } from 'react-hook-form-mui'
import { useTranslation } from 'react-i18next'
import { Controller, useForm } from 'react-hook-form';
import { Button, Container, Paper, Typography } from '@mui/material'
import governorates from './governorates.json'
import { MuiFileInput } from "mui-file-input";
import { AttachFile, Close } from '@mui/icons-material'
import { MuiTelInput } from 'mui-tel-input'
import * as z from "zod"
import { addJobSchema } from "@/schemas"
import { addNewJob } from '../_actions'
import { enqueueSnackbarFunc } from '@/component/helperFunctions/snackBar'
import LoadingButton from '@mui/lab/LoadingButton'
import ControlMUITextField from '@/component/ui/ControlMUItextField'
import MUIselect from '@/component/MUI/Select'
import MUIRadioGroup from '@/component/MUI/RadioGroup'

const EmploymentForm = ({
    availableJobs
}: {
    availableJobs: {
        id: string;
        labelEn: string;
        labelAr: string;
    }[]
}) => {
    const { control, handleSubmit, setError, reset } = useForm<z.infer<typeof addJobSchema>>()
    const { t, i18n } = useTranslation()
    const [loading, setLoading] = useState(false)

    let governoratesOptions: {
        key: string;
        value: string | number;
    }[] = []

    governorates.forEach((governorate) => {
        governoratesOptions.push({
            key: i18n.language === 'ar' ? governorate.governorate_name_ar : governorate.governorate_name_en,
            value: i18n.language === 'ar' ? governorate.governorate_name_ar : governorate.governorate_name_en,
        })
    })

    const onSubmit = async (data: z.infer<typeof addJobSchema>) => {
        setLoading(true)
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("email", data.email);
        formData.append("phone", data.phone);
        formData.append("governorate", data.governorate);
        formData.append("jobName", data.jobName);
        if (data.file) {
            formData.append("file", data.file);
        }

        const result = await addNewJob(formData);
        if (result) {
            setLoading(false)
            // Handle validation errors
            for (const [field, messages] of Object.entries(result)) {
                setError(field as keyof z.infer<typeof addJobSchema>, {
                    type: "validate",
                    message: messages[0] // Assuming we take the first message
                });
            }
        } else {
            setLoading(false)
            reset()
            enqueueSnackbarFunc(t("yourDataHasBeenSent"), "success")
            // Handle success
        }
    }

    return (
        <Container maxWidth="sm">
            <Paper sx={{ padding: "20px" }}>
                <Typography variant="h5" component="h2" gutterBottom>
                    {t('PersonalData')}
                </Typography>
                <form noValidate onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={2} m={0}>
                        <Grid xs={12}>
                            <ControlMUITextField
                                name='name'
                                label={t('fullName')}
                                control={control}
                                variant='filled'
                                rules={{
                                    required: t("fieldIsRequired"),
                                }}
                            />
                        </Grid>
                        <Grid xs={12}>
                            <ControlMUITextField
                                name='email'
                                variant='filled'
                                label={t('email')}
                                type='email'
                                control={control}
                                rules={{
                                    required: t("fieldIsRequired"),
                                }}
                            />
                        </Grid>
                        <Grid xs={12}>
                            {/* <MuiTelInput value={phone} onChange={handleChange} /> */}
                            <Controller
                                name="phone"
                                control={control}
                                rules={{ required: true }}
                                render={({ field, fieldState }) => {
                                    if (fieldState.error?.type === "required") {
                                        fieldState.error.message = t("fieldIsRequired")
                                    }
                                    return (
                                        <MuiTelInput
                                            {...field}
                                            forceCallingCode
                                            sx={{ direction: (theme) => theme.direction }}
                                            label={t('phone')}
                                            variant='filled'
                                            error={fieldState.invalid}
                                            helperText={fieldState.error && fieldState.error.message}
                                            fullWidth
                                            defaultCountry='EG'
                                        />
                                    )
                                }}
                            />
                        </Grid>
                        <Grid xs={12}>
                            <MUIselect
                                name='governorate'
                                label={t('governorate')}
                                control={control}
                                variant='filled'
                                data={governoratesOptions}
                                rules={{
                                    required: t("fieldIsRequired"),
                                }}
                            />
                        </Grid>
                        <Grid xs={12}>
                            <MUIRadioGroup
                                name='jobName'
                                label={t('ThePositionAppliedFor')}
                                rules={{
                                    required: t("fieldIsRequired"),
                                }}
                                control={control}
                                data={availableJobs.map((job) => ({
                                    key: i18n.language === 'ar' ? job.labelAr : job.labelEn,
                                    value: i18n.language === 'ar' ? job.labelAr : job.labelEn,
                                }))}
                                // options={availableJobs.map((job) => ({
                                //     id: i18n.language === 'ar' ? job.labelAr : job.labelEn,
                                //     value: i18n.language === 'ar' ? job.labelAr : job.labelEn,
                                //     label: i18n.language === 'ar' ? job.labelAr : job.labelEn,
                                // }))}
                            />
                        </Grid>
                        <Grid xs={12}>
                            <Controller
                                name="file"
                                control={control}
                                rules={{ required: true }}
                                render={({ field, fieldState }) => {
                                    if (fieldState.error?.type === "required") {
                                        fieldState.error.message = t("fieldIsRequired")
                                    }
                                    return (
                                        <MuiFileInput
                                            {...field}
                                            variant='filled'
                                            helperText={fieldState.error && fieldState.error.message}
                                            error={fieldState.invalid}
                                            fullWidth
                                            required
                                            clearIconButtonProps={{
                                                title: "Remove",
                                                children: <Close fontSize="small" />
                                            }}
                                            placeholder={t('insertFile')}
                                            InputProps={{
                                                inputProps: {
                                                    accept: 'application/pdf',
                                                },
                                                startAdornment: <AttachFile sx={{ mb: "16px" }} />
                                            }}
                                        />
                                    )
                                }
                                }
                            />
                        </Grid>
                        <Grid xs={12}>
                            <LoadingButton variant='contained' type='submit' fullWidth loading={loading}>
                                {t('submit')}
                            </LoadingButton>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    )
}

export default EmploymentForm
