"use client";
import { styled } from "@mui/material/styles";
// import { Player } from "@lottiefiles/react-lottie-player";
// import bannerLottie from '../assets/lottiefiles/bannerLottie.json'
import { Box, Container, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { useTranslation } from 'react-i18next';
import image from '../../public/staticImages/banner/bannerLottie.json'
import { useEffect } from "react";
import dynamic from 'next/dynamic';

const Player = dynamic(() =>
    import('@lottiefiles/react-lottie-player').then((mod) => mod.Player),
    { ssr: false }
);

const PREFIX = "Banner";

const classes = {
    bannerBack: `${PREFIX}-bannerBack`,
    content: `${PREFIX}-content`,
};

const Root = styled("div")(({ theme }) => ({
    [`& .${classes.content}`]: {
        paddingTop: theme.spacing(10),
        [theme.breakpoints.down("md")]: {
            paddingTop: theme.spacing(20),
        },
        background: theme.palette.divider,
    },
    [`& .${classes.bannerBack}`]: {
        [`& svg`]: {
            [`& path`]: {
                fill: theme.palette.divider,
            },
        },
    },
}));

const Banner = () => {
    const { t } = useTranslation("custom");    
    return (
        <Root>
            <Box className={classes.content}>
                <Container maxWidth={'lg'}>
                    <Stack justifyContent={"center"} position={"relative"}>
                        <Grid container spacing={5} m={0} justifyContent={"center"}>
                            <Grid xs={12} md={6} display={"flex"} justifyContent={"center"} alignItems={"center"}>
                                <Stack spacing={2}>
                                    <Typography variant="h1" fontSize={"35px"} color={"primary.main"} fontWeight={"bold"}>
                                        {t(`bannerTitle`)}
                                    </Typography>
                                    <Typography>
                                        {t(`bannerDescription`)}
                                    </Typography>
                                </Stack>
                            </Grid>
                            <Grid xs={12} md={6}>
                                <Player
                                    autoplay
                                    loop
                                    src={image}
                                    style={{ height: '450px', width: '100%' }}
                                >
                                    {/* <Controls visible={true} buttons={['play', 'repeat', 'frame', 'debug']} /> */}
                                </Player>
                            </Grid>

                        </Grid>
                    </Stack>
                </Container>
            </Box>
            <div className={classes.bannerBack}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                    <path fill="#0099ff" fillOpacity="1" d="M0,288L12,288C24,288,48,288,72,282.7C96,277,120,267,144,245.3C168,224,192,192,216,192C240,192,264,224,288,234.7C312,245,336,235,360,208C384,181,408,139,432,128C456,117,480,139,504,165.3C528,192,552,224,576,202.7C600,181,624,107,648,69.3C672,32,696,32,720,42.7C744,53,768,75,792,106.7C816,139,840,181,864,202.7C888,224,912,224,936,186.7C960,149,984,75,1008,42.7C1032,11,1056,21,1080,48C1104,75,1128,117,1152,160C1176,203,1200,245,1224,229.3C1248,213,1272,139,1296,122.7C1320,107,1344,149,1368,181.3C1392,213,1416,235,1428,245.3L1440,256L1440,0L1428,0C1416,0,1392,0,1368,0C1344,0,1320,0,1296,0C1272,0,1248,0,1224,0C1200,0,1176,0,1152,0C1128,0,1104,0,1080,0C1056,0,1032,0,1008,0C984,0,960,0,936,0C912,0,888,0,864,0C840,0,816,0,792,0C768,0,744,0,720,0C696,0,672,0,648,0C624,0,600,0,576,0C552,0,528,0,504,0C480,0,456,0,432,0C408,0,384,0,360,0C336,0,312,0,288,0C264,0,240,0,216,0C192,0,168,0,144,0C120,0,96,0,72,0C48,0,24,0,12,0L0,0Z"></path>
                </svg>
            </div>
        </Root>
    )
}

export default Banner