"use client"

import 'react-quill/dist/quill.snow.css';
import {useMemo} from "react";
import dynamic from "next/dynamic";

interface Props {
    onChange: (value: string) => void;
    value: string
}

export default function ReactQuillEditor({onChange, value}: Props) {
    const ReactQuill = useMemo(() =>
            dynamic(() => import ("react-quill"), {ssr: false}),
        []);

    return (
        <div className="bg-white">
            <ReactQuill theme="snow" value={value} onChange={onChange}/>
        </div>
    );
}
