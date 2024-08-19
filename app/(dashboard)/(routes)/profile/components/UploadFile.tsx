"use client"

import {File, Loader2, X} from "lucide-react";
import {Button} from "@/components/ui/button";
import {cn} from "@/lib/utils";

interface Props {
    name: string,
    active: boolean,
    onDelete: () => void,
    onStatusClick?: () => void,
    loading: boolean,
    isEditing: boolean,
}

export default function UploadedFile({name, active, onDelete, onStatusClick, loading, isEditing}: Props) {
    return (
        <div
            className={cn(`flex items-center justify-between rounded border-2 pl-4 pr-2 py-3`,
                active ? "border-green-300 bg-green-100/50 text-green-600" : "border-red-300 bg-red-100/50 text-red-500")}
        >
            <div className="flex items-center gap-x-2.5">
                <File className="size-3.5"/>
                <p className="font-medium text-xs">{name}</p>
            </div>


            {!isEditing && active && <Button
                disabled={true}
                variant="default"
                size="sm"
                onClick={onStatusClick}
                className="h-auto w-auto px-2 py-1 shadow-none bg-green-500 rounded-full"
            >
                Active
            </Button>}

            {isEditing &&
                <div className="flex items-center gap-x-4">
                    <Button
                        disabled={loading}
                        variant="default"
                        size="sm"
                        onClick={onStatusClick}
                        className={`h-auto w-auto px-2 py-1 shadow-none ${active ? "bg-red-500" : "bg-green-500"}`}
                    >
                        {active ? "Deactivate" : "Activate"}
                    </Button>
                    <Button
                        disabled={loading}
                        variant="ghost"
                        size="icon"
                        onClick={onDelete}
                        className="h-auto w-auto p-1"
                    >
                        {loading ? <Loader2 className="size-3.5 animate-spin"/> : <X className="size-3.5"/>}
                    </Button>
                </div>
            }
        </div>
    );
}
