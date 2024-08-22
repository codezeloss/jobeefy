"use client"

import 'react-quill/dist/quill.bubble.css';
import {useMemo} from "react";
import dynamic from "next/dynamic";

interface Props {
    value: string
}

export default function ReactQuillPreview({value}: Props) {
    const ReactQuill = useMemo(() =>
            dynamic(() => import ("react-quill"), {ssr: false}),
        []);

    return (
        <div className="bg-white border rounded">
            <ReactQuill theme="bubble" value={value} readOnly/>
        </div>
    );
}
