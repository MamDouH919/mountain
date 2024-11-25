import { Box, IconButton, Skeleton, Stack, Typography } from '@mui/material';
import React, { useState } from 'react'
// import { FileUploader } from 'react-drag-drop-files';
import { BiSolidImageAdd } from 'react-icons/bi';
import Image from 'next/image';
import { Delete } from '@mui/icons-material';
import clsx from 'clsx';
import { styled } from "@mui/material/styles"
import { useTranslation } from 'react-i18next';
import dynamic from 'next/dynamic';

const Loading = () => <Skeleton height={"150px"} width={"100%"} animation="wave" variant="rectangular" />;

// Importing only the `FileUploader` component from the module
const FileUploader = dynamic(() =>
    import('react-drag-drop-files').then((mod) => mod.FileUploader), {
    ssr: false, // Disable server-side rendering for this component
    loading: () => <Loading />, // Show Loading component while loading
});

const PREFIX = "uploadImage";
const classes = {
    fileUploader: `${PREFIX}-fileUploader`,
    clearImage: `${PREFIX}-clearImage`,
    imageWrapper: `${PREFIX}-imageWrapper`,
    error: `${PREFIX}-error`,
    multiple: `${PREFIX}-multiple`,
};
const Root = styled(Stack)(({ theme }) => ({
    display: "flex",
    justifyContent: "center",
    transition: "all 2s",
    alignItems: "center",
    flexDirection: "column",
    [`& label`]: {
        width: "100%",
    },
    [`& .${classes.fileUploader}`]: {
        // minWidth: "100%",
        // maxWidth: "100%",
        minHeight: "150px",
        border: `1px dashed ${theme.palette.divider}`,
        cursor: "pointer",
        borderRadius: theme.spacing(2),
    },
    [`& .${classes.imageWrapper}`]: {
        width: 250,
        height: "auto",
        padding: "1px",
        borderRadius: "10px",
        border: `1px solid ${theme.palette.divider}`,
        position: "relative",
        [`&:hover`]: {
            [`& .${classes.clearImage}`]: {
                display: "flex",
                transition: "all 2s",
            },
        },
        [`& img`]: {
            borderRadius: "10px",
        },
    },
    [`& .${classes.multiple}`]: {
        width: 150,
    },
    [`& .${classes.clearImage}`]: {
        display: "none",
        position: "absolute",
        background: theme.palette.background.default,
        opacity: 0.6,
        top: "0",
        left: "0",
        width: "100%",
        height: "100%",
        justifyContent: "center",
        transition: "all 2s",
        alignItems: "center"
    },
    [`& .${classes.error}`]: {
        color: theme.palette.error.main
    },

}));

interface inputProps {
    fileTypes: string[]
    required?: any
    imageFile?: string
    file: File | null
    setFile: React.Dispatch<React.SetStateAction<File | null>>
}

const UploadImage = (props: inputProps) => {
    const { fileTypes, required, imageFile, file, setFile } = props
    const [preview, setPreview] = useState<string | null>(imageFile ?? null);


    const { t } = useTranslation()
    const handleChange = (file: any) => {
        setFile(file);
        const previewUrl = URL.createObjectURL(file);
        setPreview(previewUrl);
    };


    return (
        <Root alignItems={"center"} width={"100%"} justifyContent={"center"}>
            <Stack justifyContent={"center"} direction={"row"} spacing={2} useFlexGap flexWrap={"wrap"} width={"100%"}>
                {(preview || file) &&
                    <Stack className={classes.imageWrapper} >
                        <Box className={classes.clearImage}>
                            <IconButton size='large' color='error' onClick={() => {
                                setFile(null)
                                setPreview(null)
                            }}>
                                <Delete fontSize='large' />
                            </IconButton>
                        </Box>
                        <Image
                            src={preview ?? "/product-not-available.png"}
                            alt='image'
                            width={2400}
                            height={1598}
                            layout="responsive"
                            objectFit="cover"
                            style={{ width: '100%', height: '100%' }}
                        />
                    </Stack>
                }
                {!preview && <FileUploader
                    disabled={false}
                    handleChange={handleChange}
                    name="file"
                    types={fileTypes}
                >
                    <Stack
                        className={classes.fileUploader}
                        direction={"row"}
                        justifyContent={"center"}
                        alignItems={"center"}
                        spacing={2}
                        flexWrap={"wrap"}
                        p={2}
                    >
                        {
                            <>
                                <BiSolidImageAdd size={25} />
                                <Typography>{t("dragAnImageHere")}</Typography>
                            </>
                        }
                    </Stack>
                </FileUploader>}
            </Stack>
            {
                required &&
                <Typography className={classes.error}>
                    {required}
                </Typography>
            }
        </Root>
    )
}

export default UploadImage