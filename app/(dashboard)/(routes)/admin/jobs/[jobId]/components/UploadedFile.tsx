"use client"

import {File, Loader2, X} from "lucide-react";
import {Button} from "@/components/ui/button";

interface Props {
    name: string,
    onDelete: () => void,
    loading: boolean,
    isEditing: boolean,
}

export default function UploadedFile({name, onDelete, loading, isEditing}: Props) {
    return (
        <div
            className="flex items-center text-blue-500 justify-between rounded border-2 border-blue-300 bg-blue-100/50 pl-4 pr-2 py-2">
            <div className="flex items-center gap-x-2.5">
                <File className="size-3.5"/>
                <p className="font-medium text-xs">{name}</p>
            </div>


            {isEditing &&
                <Button
                    disabled={loading}
                    variant="destructive"
                    size="icon"
                    onClick={onDelete}
                    className="h-auto w-auto p-1"
                >
                    {loading ? <Loader2 className="size-3.5 animate-spin"/> : <X className="size-3.5"/>}
                </Button>
            }
        </div>
    );
}
