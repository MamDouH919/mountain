import { IconButton, Tooltip } from '@mui/material'
import { t } from 'i18next'
import React, { useContext } from 'react'
import { DarkModeOutlined, LightModeOutlined } from '@mui/icons-material';
import { ModeContext } from '@/context/modeContext';

const DarkModeIcon = () => {
    const { darkMode, changeMode } = useContext(ModeContext)

    return (
        <Tooltip title={darkMode ? t("lightMode") : t("darkMode")}>
            <IconButton onClick={changeMode}>
                {darkMode ? <LightModeOutlined color={"primary"} /> : <DarkModeOutlined color={"primary"} />}
            </IconButton>
        </Tooltip>
    )
}

export default DarkModeIcon