import { Button, ButtonProps } from '@mui/material'
import Link from 'next/link'
import React from 'react'

interface InputProps extends ButtonProps {
    href: string;
    linkLabel: string;
}

const ButtonLink: React.FC<InputProps> = (props) => {
    const { href, linkLabel, ...buttonProps } = props;
    return (
        <Link href={href} passHref>
            <Button variant='contained' {...buttonProps}>
                {linkLabel}
            </Button>
        </Link>
    )
}

export default ButtonLink;
