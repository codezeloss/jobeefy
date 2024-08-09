"use client"

import {Button} from "@/components/ui/button";
import {Trash2Icon} from "lucide-react";
import {useState} from "react";

interface JobPublishActionsProps {
    disabled: boolean,
    jobId: string,
    isPublished: boolean
}

export default function JobPublishActions({disabled, jobId, isPublished}: JobPublishActionsProps) {
    const [loading, setLoading] = useState(false)

    const onPublishClick = () => {}

    const onDeleteClick = () => {}

    return (
        <div className="flex items-center gap-x-2">
            <Button type="button" size="sm" variant="outline" disabled={disabled || loading} onClick={onPublishClick}>
                {isPublished ? "Unpublish" : "Publish"}
            </Button>
            <Button type="button" size="sm" variant="destructive" onClick={onDeleteClick}>
                <Trash2Icon className="size-4"/>
            </Button>
        </div>
    );
}
