"use client";
import { Button, Stack } from '@mui/material'
import React from 'react'

import { useContext } from 'react';
import { ModeContext } from '@/context/modeContext';
import LanguageChanger from '@/component/ChangeLang';
import DarkMode from '@/component/ChangeMode';

const Test = () => {
    const { darkMode, changeMode } = useContext(ModeContext)

    return (
        <div>
            <Button onClick={() => changeMode && changeMode()}>Button</Button>

            <Stack direction={"row"} spacing={2}>
                <div>Test</div>
                <div>Test</div>
            </Stack>
            <LanguageChanger />
            <DarkMode />
        </div>
    )
}

export default Test
