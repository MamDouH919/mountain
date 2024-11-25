import { Collapse } from "@mui/material";
import { enqueueSnackbar } from "notistack";
type TypeOfMessage = "error" | "info" | "success" | "warning" | "default";

export const enqueueSnackbarFunc = (message: string, typeOfMessage: TypeOfMessage) => {
    return enqueueSnackbar(message, {
        variant: typeOfMessage,
        anchorOrigin: {
            vertical: "bottom",
            horizontal: "right",
        },
        TransitionComponent: Collapse,
    });
}