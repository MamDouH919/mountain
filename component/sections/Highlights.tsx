"use client"
import { Box, Stack, Typography } from '@mui/material'
import { styled } from "@mui/material/styles";
import { keyframes } from '@mui/system';
import { useTranslation } from 'react-i18next';
import useWidth, { isWidthDown } from '../helperFunctions/useWidth';

const PREFIX = "Counter";
const classes = {
    circle: `${PREFIX}-circle`,
    backCircle: `${PREFIX}-backCircle`,
    secondBackCircle: `${PREFIX}-secondBackCircle`,
    content: `${PREFIX}-content`,
    thirdCircle: `${PREFIX}-thirdCircle`,
    contentWrapper: `${PREFIX}-contentWrapper`,
};

const rotateAnimation = keyframes`
0% {transform: rotate(0deg);}
100% {transform: rotate(360deg);}
`;
const oppositeRotateAnimation = keyframes`
0% {transform: rotate(0deg);}
100% {transform: rotate(-360deg);}
`;

const size = 200

const Root = styled(Box)(({ theme }) => ({
    padding: theme.spacing(2),
    margin: theme.spacing(4, 0),
    [`& .${classes.backCircle}`]: {
        position: "absolute",
        width: "0px",
        height: "0px",
        zIndex: 1,
        borderRight: `${size / 2}px solid transparent`,
        borderTop: `${size / 2}px solid ${theme.palette.secondary.dark}`,
        borderLeft: `${size / 2}px solid ${theme.palette.secondary.dark}`,
        borderBottom: `${size / 2}px solid ${theme.palette.secondary.dark}`,
        borderTopLeftRadius: `${size / 2}px`,
        borderTopRightRadius: `${size / 2}px`,
        borderBottomLeftRadius: `${size / 2}px`,
        borderBottomRightRadius: `${size / 2}px`,
        animation: `${rotateAnimation} 11s linear infinite`,
    },

    [`& .${classes.secondBackCircle}`]: {
        position: "absolute",
        width: "0px",
        height: "0px",
        zIndex: 2,
        borderRight: `${(size / 2) - 5}px solid ${theme.palette.background.default}`,
        borderTop: `${(size / 2) - 5}px solid ${theme.palette.background.default}`,
        borderLeft: `${(size / 2) - 5}px solid ${theme.palette.background.default}`,
        borderBottom: `${(size / 2) - 5}px solid ${theme.palette.background.default}`,
        borderTopLeftRadius: `${(size / 2) - 5}px`,
        borderTopRightRadius: `${(size / 2) - 5}px`,
        borderBottomLeftRadius: `${(size / 2) - 5}px`,
        borderBottomRightRadius: `${(size / 2) - 5}px`,
    },

    [`& .${classes.thirdCircle}`]: {
        position: "absolute",
        zIndex: 3,
        width: "0px",
        height: "0px",
        borderRight: `${(size / 2) - 10}px solid ${theme.palette.primary.main}`,
        borderTop: `${(size / 2) - 10}px solid ${theme.palette.primary.main}`,
        borderLeft: `${(size / 2) - 10}px solid transparent`,
        borderBottom: `${(size / 2) - 10}px solid ${theme.palette.primary.main}`,
        borderTopLeftRadius: `${(size / 2) - 10}px`,
        borderTopRightRadius: `${(size / 2) - 10}px`,
        borderBottomLeftRadius: `${(size / 2) - 10}px`,
        borderBottomRightRadius: `${(size / 2) - 10}px`,
        animation: `${oppositeRotateAnimation} 11s linear infinite`,
    },

    [`& .${classes.content}`]: {
        position: "absolute",
        zIndex: 4,
        width: "0px",
        height: "0px",
        borderRight: `${(size / 2) - 15}px solid ${theme.palette.background.default}`,
        borderTop: `${(size / 2) - 15}px solid ${theme.palette.background.default}`,
        borderLeft: `${(size / 2) - 15}px solid ${theme.palette.background.default}`,
        borderBottom: `${(size / 2) - 15}px solid ${theme.palette.background.default}`,
        borderTopLeftRadius: `${(size / 2) - 15}px`,
        borderTopRightRadius: `${(size / 2) - 15}px`,
        borderBottomLeftRadius: `${(size / 2) - 15}px`,
        borderBottomRightRadius: `${(size / 2) - 15}px`,
    },
    [`& .${classes.contentWrapper}`]: {
        position: "relative",
        width: `${size}px`,
        height: `${size}px`,
        zIndex: 4,
    }
}));

const Highlights = ({
    data,
}: {
    data: {
        id: string,
        nameAr: string,
        nameEn: string,
        number: number,
    }[]
}) => {
    const screenWidth = useWidth();
    const isScreenSmall = isWidthDown("sm", screenWidth);
    const { t, i18n } = useTranslation()

    if (data.length === 0) {
        return null
    }
    return (
        <Root py={2}>
            <Stack direction={"row"} spacing={4} justifyContent={"center"} flexWrap={"wrap"} useFlexGap sx={{ maxWidth: isScreenSmall ? "450px" : "100%" }}>

                {data.map((item, index) =>
                    <Stack key={index} justifyContent={"center"} alignItems={"center"} className={classes.contentWrapper}>
                        <div className={classes.backCircle}></div>
                        <div className={classes.secondBackCircle}></div>
                        <div className={classes.thirdCircle}></div>
                        <Stack justifyContent={"center"} alignItems={"center"} spacing={1} className={classes.content} >
                            <Typography
                                variant='body1'
                                fontSize={25}
                                textAlign={"center"}
                                textTransform={"capitalize"}
                                lineHeight={1}>
                                {i18n.language === "en" ? item.nameEn : item.nameAr}
                            </Typography>
                            <Typography variant='body1' fontSize={25}>{item.number}</Typography>
                        </Stack>
                    </Stack>
                )}

            </Stack>
        </Root>
    )
}

export default Highlights
