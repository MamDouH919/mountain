"use client";
import { Box, Container, Stack, Typography } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2/Grid2'
import React from 'react'
import { useTranslation } from 'react-i18next';
import Image from 'next/image';
import SectionTitle from '../ui/SectionTitle';

const About = () => {
    const { t } = useTranslation(["custom"])

    return (
        <Box sx={{ background: (theme) => theme.palette.background.paper }} py={2}>
            <SectionTitle
                sectionTitle={t(`about`)}
            />
            <div style={{ margin: "32px 0", }}>
                <Container maxWidth={'lg'}>
                    <Stack justifyContent={"center"} alignItems={"center"} >
                        <Grid container spacing={4} m={0} alignItems={"center"}>
                            <Grid md={6} xs={12}>
                                <Stack sx={{ border: (theme) => `2px solid ${theme.palette.divider}`, borderRadius: "15px" }} p={0.5} >
                                    {/* <Stack height={"120px"} alignItems={"center"} justifyContent={"center"}>about Image</Stack> */}
                                    <Image
                                        src={'/staticImages/about/about.webp'}
                                        alt={t("appName")}
                                        width={500}  // Set a specific width in pixels
                                        height={300} // Set a specific height in pixels
                                        style={{ borderRadius: "10px", width: '100%' }}
                                        layout="responsive" // This makes the image responsive
                                    />
                                </Stack>
                            </Grid>
                            <Grid md={6} xs={12}>
                                <Typography variant='body1' fontSize={18}>
                                    {t(`aboutContent`)}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Stack>
                </Container>
            </div>
        </Box>
    )
}

export default About