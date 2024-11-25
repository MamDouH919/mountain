"use client"
import { Box, Container, Stack, Typography } from '@mui/material'
// import services1 from "../assets/images/services/services-1.png";
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import { styled } from "@mui/material/styles";
import clsx from 'clsx';
import { GoDotFill } from "react-icons/go";
import SectionTitle from '../ui/SectionTitle';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import StyledLink from '../ui/StyledLink';

const PREFIX = "Services";
const classes = {
    serviceWrapper: `${PREFIX}-serviceWrapper`,
    imageWhite: `${PREFIX}-imageWhite`,
    serviceGrid: `${PREFIX}-serviceGrid`,
};
const Root = styled("div")(({ theme }) => ({
    [`& .${classes.serviceWrapper}`]: {
        position: "relative",
        overflow: "hidden",
        padding: theme.spacing(4),
        boxShadow: theme.shadows[2],
        borderRadius: theme.spacing(2),
        border: `1px solid ${theme.palette.divider}`,
        // backgroundColor: theme.palette.background.paper,
        [`&:before`]: {
            content: '""',
            width: '275px',
            height: '275px',
            position: 'absolute',
            right: '-137.5px',
            bottom: '-137.5px',
            backgroundColor: theme.palette.primary.light,
            zIndex: '-1',
            borderRadius: '100%',
            WebkitTransition: 'all 1s',
            transition: 'all 1s',
            opacity: "0.1"
        },
        [`&:hover`]: {
            // color: "#fff",
            [`&:before`]: {
                transform: "scale(5)",
                opacity: "0.5"
            },
        }
    },
    [`& .${classes.imageWhite}`]: {
        filter: "brightness(0) invert(1)"
    },
    [`& .${classes.serviceGrid}`]: {
        display: "flex"
    }
}));

interface inputProps {
    data: {
        id: string,
        title: string,
        titleAr: string,
        iconPath: string,
        description: string,
        descriptionAr: string
    }[]
}

const Services = (props: inputProps) => {
    const { data } = props

    const { t, i18n } = useTranslation()


    return (
        <Box sx={{ background: (theme) => theme.palette.background.default }} py={2} >
            <SectionTitle
                sectionTitle={t("services")}
            />
            <Root style={{ margin: "32px 0" }}>
                <Container maxWidth={'lg'}>
                    <Stack justifyContent={"center"} alignItems={"center"}>
                        <Grid container spacing={4} m={0} alignItems={"stretch"} justifyContent={"center"} zIndex={1} width={"100%"}>
                            {data.map((service, index) => {
                                return (
                                    <Grid md={4} sm={6} xs={12} key={index} className={classes.serviceGrid}>
                                        <Stack alignItems={"center"} spacing={3} width={"100%"} className={classes.serviceWrapper}>
                                            <Image
                                                src={service.iconPath}
                                                width={80}
                                                height={80}
                                                alt={service.title}
                                            />
                                            <Typography variant='h6' textAlign={"center"}>{i18n.language === "en" ? service.title : service.titleAr}</Typography>
                                            <div
                                                dangerouslySetInnerHTML={{ __html: i18n.language === "en" ? service.description : service.descriptionAr }}
                                            />
                                            <StyledLink href={`/services/${service.id}`}>
                                                {t("readMore")} ...
                                            </StyledLink>
                                        </Stack>
                                    </Grid>
                                )
                            }
                            )}
                        </Grid>
                    </Stack>
                </Container>
            </Root>
        </Box>
    )
}

export default Services