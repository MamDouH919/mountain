"use client"
import React from 'react'
import { styled } from "@mui/material/styles";
import { Stack } from '@mui/material';
import { FallingLines } from 'react-loader-spinner';

const PREFIX = "Counter";
const classes = {
    editor: `${PREFIX}-editor`,
    editorError: `${PREFIX}-editorError`,
};

const Root = styled(Stack)(({ theme }) => ({
    "& rect": {
        fill: theme.palette.primary.main,
    },
}));


const Loading = () => {
    return (
        <Root height={"100dvh"} width={"100%"} justifyContent={"center"} alignItems={"center"} >
            <FallingLines
                // color={"red"}
                width="50"
                visible={true}
            />
        </Root>
    )
}

export default Loading
