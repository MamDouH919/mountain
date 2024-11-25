"use client"
import { Box, Button, Stack } from '@mui/material'
import { useTranslation } from 'react-i18next';
import { styled } from "@mui/material/styles";
import { keyframes } from '@mui/system';
import SectionTitle from '../ui/SectionTitle';
import Image from 'next/image';
import Link from 'next/link';
// import { useAppSelector } from '../store/store';

const PREFIX = "Clients";
const classes = {
    slider: `${PREFIX}-slider`,
    sliderTrack: `${PREFIX}-sliderTrack`,
    slide: `${PREFIX}-slide`,
};


const Root = styled(Box)(({ theme }) => ({
    [`& .${classes.slider}`]: {
        height: "200px",
        margin: "auto",
        position: "relative",
        width: "100%",
        display: "grid",
        placeItems: "center",
        overflow: "hidden",
    },
    [`& .${classes.sliderTrack}`]: {
        display: "flex",

        [`&:hover`]: {
            animationPlayState: "paused"
        },
    },
    [`& .${classes.slide}`]: {
        height: "200px",
        width: "180px",
        display: "flex",
        alignItems: "center",
        padding: "15px",
        [`& img`]: {
            width: "100%",
            borderRadius: "50%"
        }
    }
}));


const Clients = ({ data }: { data: { id: string, name: string, nameAr: string, imagePath: string }[] }) => {
    const scrollToRight = keyframes`
    0% {transform: translateX(0);}
    100% {transform: translateX(calc(-250px * ${data.length / 2}));`;

    const scrollToLeft = keyframes`
    0% {transform: translateX(0);}
    100% {transform: translateX(calc(250px * ${data.length / 2}));}`;


    const { t, i18n } = useTranslation()

    if (data.length === 0) {
        return null
    }

    return (
        <Root sx={{ background: (theme) => theme.palette.background.default }} py={2}>
            <SectionTitle
                sectionTitle={t("clients")}
            />
            <div className={classes.slider} style={{ direction: i18n.language === "ar" ? "ltr" : "rtl" }}>

                <Box className={`${i18n.language === "ar" ? "right" : "left"} ${classes.sliderTrack}`}
                    sx={{
                        width: `calc(250px * ${data.length * 2})`,
                        overflow: "hidden",
                        [`&.right`]: {
                            animation: `${scrollToRight} 50s linear infinite`,
                        },
                        [`&.left`]: {
                            animation: `${scrollToLeft} 50s linear infinite`,
                        },
                    }}
                >
                    {data.map((client, index) => (
                        <div className={classes.slide} key={index}>
                            <Image height={200} width={200} src={client.imagePath} alt={`data`} layout='responsive' style={{ borderRadius: "50%", width: "100%" }} />
                        </div>
                    ))}
                    {data.map((client, index) => (
                        <div className={classes.slide} key={index}>
                            <Image height={200} width={200} src={client.imagePath} alt={`data`} layout='responsive' style={{ borderRadius: "50%", width: "100%" }} />
                        </div>
                    ))}
                </Box>
            </div>
            <Stack alignItems={"center"}>
                <Link href="/clients" style={{ textDecoration: "none" }}>
                    <Button variant="contained" color="primary" sx={{ mt: 2 }}>
                        {t("viewAllClients")}
                    </Button>
                </Link>
            </Stack>

            {/* {viewAllClients} */}
        </Root>
    )
}

export default Clients