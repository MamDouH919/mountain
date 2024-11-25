import React, { ChangeEvent, useState } from "react";
import { Icon, IconButton, InputAdornment, Stack, styled, TextFieldProps, Typography } from "@mui/material";
import { useController } from "react-hook-form";
import ControlMUITextField from "./ControlMUItextField";

const Input = styled("input")({
    display: "none",
});

interface UploadFileProps extends Omit<TextFieldProps, 'name' | 'control'> {
    name: string;
    control: any;
    defaultValue?: any;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
    icon: string;
    accept: string;
    setValue: any;
    iconDisable?: boolean;
    rules: any;
    fileName?: string;
    maxSize: number; // Max file size in bytes
}

const UploadFile: React.FC<UploadFileProps> = (props) => {
    const {
        name,
        control,
        defaultValue,
        onChange,
        icon,
        accept,
        setValue,
        iconDisable,
        rules,
        fileName,
        maxSize,
        ...restProps
    } = props;

    const {
        formState: { errors },
        field: { onChange: fieldChange, value, ...fieldProps },
    } = useController({
        name,
        control,
        defaultValue: defaultValue ?? "",
    });

    const [fileInfo, setFileInfo] = useState<{ name: string; size: number | null }>({ name: "", size: null });
    const [fileError, setFileError] = useState<string | null>(null);

    const handleChangeShipment = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.size > maxSize) {
                setFileError(`File size exceeds the maximum size of ${maxSize / 1024} KB`);
                setFileInfo({ name: "", size: null });
                return;
            }
            setFileError(null);
            setFileInfo({ name: file.name, size: file.size }); // Store file name and size
            setValue(fileName ?? "fileName", file.name, { shouldValidate: true });
        }
    };

    return (
        <Stack width={"100%"}>
            <ControlMUITextField
                control={control}
                name={fileName ?? "fileName"}
                readOnly
                rules={rules}
                {...restProps}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <label htmlFor="icon-button-file">
                                <Input
                                    {...fieldProps}
                                    name={name}
                                    disabled={iconDisable}
                                    value={value?.filename}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                        const file = e.target.files?.[0];
                                        if (file && file.size <= maxSize) {
                                            fieldChange(file);
                                            handleChangeShipment(e);
                                        } else {
                                            setFileError(
                                                `File size exceeds the maximum size of ${maxSize / 1024} KB`
                                            );
                                        }
                                        onChange && onChange(e);
                                    }}
                                    onClick={(event: any) => {
                                        if (!value) {
                                            event.target.value = null;
                                        }
                                    }}
                                    accept={accept}
                                    id="icon-button-file"
                                    type="file"
                                />
                                <IconButton
                                    disabled={iconDisable}
                                    color="default"
                                    aria-label="upload"
                                    component="span"
                                    size="large"
                                >
                                    <Icon>{icon}</Icon>
                                </IconButton>
                            </label>
                        </InputAdornment>
                    ),
                }}
            />
            {/* Display file name and size */}
            {fileInfo.name && fileInfo.size !== null && (
                <p>
                    size: {(fileInfo.size / 1024).toFixed(2)} KB
                </p>
            )}
            {fileError && <Typography color={"error.main"}>{fileError}</Typography>}
        </Stack>
    );
};

export default UploadFile;
