"use client"
import ControlMUITextField from '@/component/ui/ControlMUItextField'
import { loginSchema } from '@/schemas'
import LoadingButton from '@mui/lab/LoadingButton'
import { Avatar, Button, Paper, Stack, Typography } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import * as z from "zod"
import { IoMdLogIn } from "react-icons/io";
import { styled } from "@mui/material/styles";
import { addUserMut, login } from '@/actions/login'
// import bcrypt from 'bcrypt';


const PREFIX = "Login";
const classes = {
    avatar: `${PREFIX}-avatar`,
};
const Root = styled(Stack)(({ theme }) => ({
    [`& .${classes.avatar}`]: {
        height: "65px",
        width: "65px",
        backgroundColor: theme.palette.primary.main
    },
}));

const LoginForm = () => {
    const { t } = useTranslation()
    const { control, handleSubmit, setError, reset } = useForm<z.infer<typeof loginSchema>>()

    const onSubmit = async (data: z.infer<typeof loginSchema>) => {
        const res = await login(data.email, data.password)
        if (res?.errors?.email) {
            setError("email", {
                type: "validate",
                message: t(res.errors.email)
            })
        }
        if (res?.errors?.password) {
            setError("password", {
                type: "validate",
                message: t(res.errors.password)
            })
        }
    }
    // const addUser = async () => {
    //     const res = await addUserMut()
    // }


    return (
        <Root justifyContent={"center"} alignItems={"center"} height={"100vh"} width={"100%"}>
            <Paper elevation={4} component={Stack} justifyContent={"center"} alignItems={"center"} spacing={3} p={5}>

                <Avatar className={classes.avatar}>
                    <IoMdLogIn size={40} />
                </Avatar>
                <Typography variant="h5" component="h2" gutterBottom>
                    {t('login')}
                </Typography>
                <form noValidate onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={2} m={0}>
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
                            <ControlMUITextField
                                name='password'
                                variant='filled'
                                label={t('password')}
                                type='password'
                                control={control}
                                rules={{
                                    required: t("fieldIsRequired"),
                                }}
                            />
                        </Grid>

                        <Grid xs={12}>
                            <LoadingButton variant='contained' type='submit' fullWidth loading={false}>
                                {t('submit')}
                            </LoadingButton>
                        </Grid>
                    </Grid>
                </form>

                {/* <Button onClick={addUser}>add New</Button> */}
            </Paper>
        </Root>
    )
}

export default LoginForm