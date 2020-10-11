import React from 'react';
import {useRouter} from "next/router";

export default function Index() {
    const router = useRouter();

    if (typeof window !== 'undefined') {
        router.push('/data-provider');
    }

    return (
        <a>Index</a>
    )

}