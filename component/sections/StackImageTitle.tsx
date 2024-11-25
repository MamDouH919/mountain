"use client"
import { Box, Container, Paper, Skeleton, Stack, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next';
// import services1 from "../assets/images/services/services-1.png";
// import Grid from '@mui/material/Unstable_Grid2/Grid2';
import { styled } from "@mui/material/styles";
// import clsx from 'clsx';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import { useState } from 'react';
import Image from 'next/image';
import SectionTitle from '../ui/SectionTitle';
// import { ServicesTypes } from './data/types';

const PREFIX = "StackImageTitle";

const classes = {
    card: `${PREFIX}-card`,
};

const Root = styled("div")(({ theme }) => ({
    [`& .${classes.card}`]: {
        padding: theme.spacing(1, 2),
        borderRadius: "30px"
    }

}));

interface inputProps {
    sectionTitle: string,
    subSectionTitle?: string,
    data: {
        imagePath: string
        name: string
        nameAr: string
    }[],
}

const StackImageTitle = (props: inputProps) => {
    const {
        sectionTitle,
        data
    } = props

    const { t, i18n } = useTranslation(["custom"])

    return (
        <Box py={2}>
            <SectionTitle
                sectionTitle={t(sectionTitle)}
            />
            <Root style={{ margin: "32px 0", }}>
                <Container maxWidth={'lg'}>
                    <Grid container spacing={2} m={0} justifyContent={"center"} >
                        {data.map((item, index) => (
                            <Grid key={index} xs={12} sm={6} md={4} lg={3} xl={3}>
                                <Stack alignItems={"center"} spacing={2}>
                                    <Image
                                        src={item.imagePath}
                                        alt={i18n.language === "ar" ? item.nameAr : item.name}
                                        height={"240"}
                                        width={"240"}
                                        style={{
                                            padding: "2px",
                                            position: "relative",
                                            zIndex: 1,
                                            borderRadius: "0.75em",
                                            objectFit: "cover",
                                        }}
                                    />
                                    <Paper sx={{ padding: "8px" }} elevation={6} className={classes.card} >
                                        <Typography variant='h5' align={'center'}>
                                            {i18n.language === "ar" ? item.nameAr : item.name}
                                        </Typography>
                                    </Paper>
                                </Stack>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Root>
        </Box>
    )
}

export default StackImageTitle