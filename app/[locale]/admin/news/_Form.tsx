"use client"
import { ListHeaderTitle } from '@/component/ui/ListHeader'
import { AddNewsSchema, UpdateNewsSchema } from '@/schemas'
import { Box, Button, Paper, Skeleton, Stack, TextField, Typography } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import React, { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { TextFieldElement } from 'react-hook-form-mui'
import { useTranslation } from 'react-i18next'
import { styled } from "@mui/material/styles";
import 'react-quill/dist/quill.snow.css';
import dynamic from 'next/dynamic';
import * as z from 'zod'
import UploadImage from '@/component/ui/UploadImage'
import { useRouter } from 'next/navigation'
import { addNews, updateNews } from '@/actions/new'
import UploadFile from '@/component/ui/UploadFile'
import ControlMUITextField from '@/component/ui/ControlMUItextField'
import clsx from 'clsx'
import LoadingButton from '@mui/lab/LoadingButton'

// Loading component to display while ReactQuill is being loaded
const Loading = () => <Skeleton height={"300px"} animation="wave" variant="rectangular" />;

const ReactQuill = dynamic(() => import('react-quill'), {
    ssr: false, // Disable server-side rendering for this component
    loading: () => <Loading />, // Show Loading component while loading
});

const PREFIX = "Counter";
const classes = {
    editor: `${PREFIX}-editor`,
    editorError: `${PREFIX}-editorError`,
};

const Root = styled(Stack)(({ theme }) => ({
    [`& .${classes.editor}`]: {
        ".ql-toolbar": {
            background: "#fff",
            direction: theme.direction,
        },
        ".ql-editor": {
            minHeight: "300px",
            direction: theme.direction,
        },
    },
    [`& .${classes.editorError}`]: {
        border: "1px solid red",
    },
}));

interface News {
    id: string
    titleAr: string
    title: string
    descriptionAr: string
    description: string
    imagePath: string
}

const Form = ({ id, data }: { id?: string, data?: News }) => {
    const schema = id ? UpdateNewsSchema : AddNewsSchema;
    const [loading, setLoading] = useState(false)

    const { t } = useTranslation(['dashboard']);
    const { control, handleSubmit, setError, setValue, watch } = useForm<z.infer<typeof schema> & { fileName: string }>({
        defaultValues: {
            titleAr: data?.titleAr ?? '',
            title: data?.title ?? '',
            fileName: data?.imagePath ?? '',
            descriptionAr: data?.descriptionAr ?? '',
            description: data?.description ?? '',
        }
    });

    const router = useRouter()

    const modules = {
        toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            ['link', 'image', 'video', 'formula'],

            [{ 'header': 1 }, { 'header': 2 }],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'list': 'check' }],
            [{ 'script': 'sub' }, { 'script': 'super' }],
            [{ 'indent': '-1' }, { 'indent': '+1' }],
            [{ 'direction': 'rtl' }],

            [{ 'size': ['small', false, 'large', 'huge'] }],
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

            [{ 'color': ["#6999d5", "#bc161a", "red", "green", "blue"] }, { 'background': [] }],
            [{ 'font': [] }],
            [{ 'align': [] }],

            ['clean']
        ]
    };


    const onSubmit = async (data: z.infer<typeof schema>) => {
        setLoading(true)
        const formData = new FormData();
        formData.append("titleAr", data.titleAr);
        formData.append("title", data.title);
        formData.append("descriptionAr", data.descriptionAr);
        formData.append("description", data.description);

        if (data.image) {
            formData.append("image", data?.image);
        }

        const result = id ? await updateNews(formData, id) : await addNews(formData);

        if (result) {
            console.log(result);
            
            setLoading(false)
            for (const [field, messages] of Object.entries(result)) {
                if (field === "image") {
                    setError("fileName", {
                        type: "validate",
                        message: messages[0] // Assuming we take the first message
                    });
                }

                setError(field as keyof z.infer<typeof schema>, {
                    type: "validate",
                    message: messages[0] // Assuming we take the first message
                });

            }
        } else {
            router.refresh()
            router.push("/admin/news")
        }
    }

    return (
        <Root spacing={2}>
            <Stack direction={"row"} spacing={2} justifyContent={"space-between"} useFlexGap>
                <ListHeaderTitle title={id ? "edit" : "addNew"} />
            </Stack>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <Paper sx={{ padding: 3 }}>
                    <Grid container spacing={2} m={0} justifyContent={"center"}>
                        <Grid md={12} xs={12} display={"flex"} justifyContent={"center"}>
                            <UploadFile
                                control={control}
                                setValue={setValue}
                                name="image"
                                icon={"add_photo_alternate"}
                                label={t("uploadImage")}
                                accept=".png,.jpg,.jpeg"
                                rules={{
                                    validate: {
                                        require: (value: any) =>
                                            value ? true : t("fieldIsRequired"),
                                    },
                                }}
                                maxSize={150 * 1024}
                            />
                        </Grid>
                        <Grid md={6} xs={12}>
                            <Box width={"100%"}>
                                <Typography variant='h5'>
                                    {t("dataInArabic")}
                                </Typography>
                                <Grid container spacing={3} m={0}>
                                    <Grid xs={12}>
                                        <ControlMUITextField
                                            name='titleAr'
                                            label={t('titleAr')}
                                            control={control}
                                            variant='outlined'
                                            rules={{
                                                required: t("fieldIsRequired"),
                                            }}
                                        />
                                    </Grid>
                                    <Grid xs={12}>
                                        <Typography variant='h5' mb={2}>{t("descriptionAr")}</Typography>
                                        <Controller
                                            name="descriptionAr"
                                            control={control}
                                            rules={{
                                                required: t("fieldIsRequired"),
                                            }}
                                            render={({ field, fieldState }) => (
                                                <div>
                                                    <ReactQuill
                                                        theme="snow"
                                                        value={field.value}
                                                        onChange={field.onChange}
                                                        modules={modules}
                                                        className={clsx(classes.editor, {
                                                            [classes.editorError]: fieldState.error,
                                                        })}
                                                    />
                                                    {fieldState.error && (
                                                        <Typography color="error">
                                                            {fieldState.error.message}
                                                        </Typography>
                                                    )}
                                                </div>
                                            )}
                                        />
                                    </Grid>
                                </Grid>
                            </Box>
                        </Grid>
                        <Grid md={6} xs={12}>
                            <Box width={"100%"}>
                                <Typography variant='h5'>
                                    {t("dataInEnglish")}
                                </Typography>
                                <Grid container spacing={3} m={0}>
                                    <Grid xs={12}>
                                        <ControlMUITextField
                                            name='title'
                                            label={t('titleEn')}
                                            control={control}
                                            variant='outlined'
                                            rules={{
                                                required: t("fieldIsRequired"),
                                            }}
                                        />
                                    </Grid>
                                    <Grid xs={12}>
                                        <Typography variant='h5' mb={2}>{t("descriptionEn")}</Typography>
                                        <Controller
                                            name="description"
                                            control={control}
                                            rules={{
                                                required: t("fieldIsRequired"),
                                            }}
                                            render={({ field, fieldState }) => (
                                                <div>
                                                    <ReactQuill
                                                        theme="snow"
                                                        value={field.value}
                                                        onChange={field.onChange}
                                                        modules={modules}
                                                        className={clsx(classes.editor, {
                                                            [classes.editorError]: fieldState.error,
                                                        })}
                                                    />
                                                    {fieldState.error && (
                                                        <Typography color="error">
                                                            {fieldState.error.message}
                                                        </Typography>
                                                    )}
                                                </div>
                                            )}
                                        />
                                    </Grid>
                                </Grid>
                            </Box>
                        </Grid>
                        <Grid md={12} xs={12} display={"flex"} justifyContent={"flex-end"}>
                            <LoadingButton loading={loading} variant={"contained"} type={"submit"}>{t("save")}</LoadingButton>
                        </Grid>
                    </Grid>
                </Paper>
            </form>
        </Root>
    )
}

export default Form;
