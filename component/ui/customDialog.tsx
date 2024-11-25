import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Paper } from '@mui/material';

interface propsInput {
    PaperProps?: any;
    handleClose: (value: any) => void;
    open: boolean;
    title?: string | React.ReactNode;
    content?: string | React.ReactNode;
    actions?: string | React.ReactNode;
    maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

export default function CustomDialog(props: propsInput) {
    const {
        open,
        handleClose,
        PaperProps,
        title,
        content,
        actions,
    } = props
    return (
        <React.Fragment>
            <Dialog
                fullWidth
                open={open}
                onClose={handleClose}
                PaperProps={PaperProps}
                maxWidth={props.maxWidth ?? 'sm'}
            >
                {title &&
                    <Paper sx={{ background: (theme) => theme.palette.divider }}>
                        <DialogTitle>{title}</DialogTitle>
                    </Paper>
                }
                {content && <DialogContent sx={{ padding: 0 }}>{content}</DialogContent>}
                {actions && <DialogActions sx={{ borderTop: (theme) => `1px solid ${theme.palette.divider}` }}>{actions}</DialogActions>}
            </Dialog>
        </React.Fragment>
    );
}
