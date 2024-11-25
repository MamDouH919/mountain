"use client";
import { Box, Button, Container, Stack } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2/Grid2'
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import contactUsImage from "@/public/staticImages/contactDark.png";
import { styled } from "@mui/material/styles";
import { isMobile } from 'react-device-detect';
import Image from 'next/image';
import SectionTitle from '../ui/SectionTitle';
import ControlMUITextField from '../ui/ControlMUItextField';
import Select from '../MUI/Select';
import { useEffect, useState } from 'react';
import { getBranchesDropDown } from '@/actions/branches';
import * as z from 'zod';
import { AddContactsSchema } from '@/schemas';
import { enqueueSnackbarFunc } from '../helperFunctions/snackBar';
import { addContacts } from '@/actions/contacts';
import LoadingButton from '@mui/lab/LoadingButton';

const PREFIX = "Contact";

const classes = {
    bannerBack: `${PREFIX}-bannerBack`,
    content: `${PREFIX}-content`,
    qrLink: `${PREFIX}-qrLink`,
};

const Root = styled(Box)(({ theme }) => ({
    borderTop: `1px solid ${theme.palette.divider}`,
    borderBottom: `1px solid ${theme.palette.divider}`,
    position: "relative",
    [`& .${classes.content}`]: {
        paddingTop: theme.spacing(10),
        background: theme.palette.divider,
    },
    [`& .${classes.bannerBack}`]: {
        [`& svg`]: {
            [`& path`]: {
                fill: theme.palette.divider,
            },
        },
    },
    [`& .${classes.qrLink}`]: {
        color: theme.palette.primary.main,
        margin: 0,
        fontSize: 20,
        textDecoration: "none",
        [`&:hover`]: {
            textDecoration: "underline",
        },
    },
}));

const Contact = () => {
    const { t, i18n } = useTranslation()
    const { control, handleSubmit, reset, setError } = useForm<z.infer<typeof AddContactsSchema>>()
    const [loading, setLoading] = useState(false)

    const [branches, setBranches] = useState<{
        key: string,
        value: string
    }[]>([])

    const onSubmit = async (data: z.infer<typeof AddContactsSchema>) => {
        setLoading(true)
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("email", data.email);
        formData.append("mobile", data.mobile);
        data.branch && formData.append("branch", data.branch);
        formData.append("message", data.message);

        const result = await addContacts(formData);

        if (result) {
            setLoading(false)
            // Handle validation errors
            for (const [field, messages] of Object.entries(result)) {
                setError(field as keyof z.infer<typeof AddContactsSchema>, {
                    type: "validate",
                    message: messages[0] // Assuming we take the first message
                });
            }
        } else {
            setLoading(false)
            reset()
            enqueueSnackbarFunc(t("yorMessageHasBeenSent"), "success")
        }
    }

    useEffect(() => {
        const Branches = async () => {
            const data = await getBranchesDropDown()
            const ss = data.map((item) => {
                return {
                    key: i18n.language === "ar" ? item.nameAr : item.name,
                    value: i18n.language === "ar" ? item.nameAr : item.name,
                }
            })
            setBranches(ss)
        }
        Branches()

    }, [i18n])


    return (
        <Stack sx={{ background: (theme) => theme.palette.background.default }}>
            {/* <a href="https://wa.me/+201157143609/?text=urlencodedtext" target='_blank' rel="noreferrer">sdfsd</a> */}
            <Root
                sx={{
                    backgroundImage: `url('/staticImages/contactDark.png')`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center center',
                    backgroundSize: 'cover',
                    backgroundAttachment: isMobile ? "inherit" : "fixed",
                }}
                py={2}
            >
                <SectionTitle
                    sectionTitle={t("contact")}
                />
                <div style={{ margin: "32px 0", }}>
                    <Container maxWidth={'md'}>
                        <Grid container m={0} spacing={2} alignItems={"center"}>
                            <Grid md={4} xs={12}>
                                <Stack alignItems={"center"} spacing={2}>
                                    <Image src={'/staticImages/qr-code.webp'} alt='Qr' width={"150"} height={"150"} />
                                    <a href={''} rel="noopener noreferrer" target="_blank">
                                        <Button variant='contained'>{t("forMoreInformation")}</Button>
                                    </a>
                                </Stack>
                            </Grid>
                            <Grid md={8} xs={12}>
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <Box width={"100%"}>
                                        <Grid container spacing={2} m={0} alignItems={"center"} justifyContent={"center"} >
                                            <Grid md={12} xs={12}>
                                                <ControlMUITextField
                                                    name="name"
                                                    label={t("fullName")}
                                                    control={control}
                                                    rules={{ required: t("fieldIsRequired") }}
                                                />
                                            </Grid>
                                            <Grid md={12} xs={12}>
                                                <ControlMUITextField
                                                    name="email"
                                                    label={t("email")}

                                                    control={control}
                                                    rules={{ required: t("fieldIsRequired") }}
                                                />
                                            </Grid>
                                            <Grid md={12} xs={12}>
                                                <ControlMUITextField
                                                    name="mobile"
                                                    label={t("mobile")}

                                                    control={control}
                                                    rules={{ required: t("fieldIsRequired") }}
                                                />
                                            </Grid>
                                            <Grid md={12} xs={12}>
                                                <ControlMUITextField
                                                    name="message"
                                                    label={t("message")}
                                                    control={control}
                                                    rules={{ required: t("fieldIsRequired") }}
                                                    rows={3}
                                                />
                                            </Grid>
                                            <Grid md={12} xs={12}>
                                                <LoadingButton loading={loading} type='submit' variant='contained' fullWidth>{t("send")}</LoadingButton>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                </form>
                            </Grid>
                        </Grid>
                    </Container>
                </div>
            </Root>
        </Stack>
    )
}

export default Contact