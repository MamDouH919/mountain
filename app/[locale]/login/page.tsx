import React from 'react'
import LoginForm from './__form'

async function delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

const Page = async () => {
    await delay(2000); // 2-second delay
    
    return (
        <LoginForm />
    )
}

export default Page