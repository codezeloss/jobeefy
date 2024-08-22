"use client"

import {Button} from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import {Input} from "@/components/ui/input"
import Link from "next/link";
import {File} from "lucide-react";
import {truncate} from "lodash";

interface Props {
    open: boolean,
    setOpen: (open: boolean) => void
    onConfirm: () => void
    userProfile: any
    loading: boolean
}

export function ApplyConfirmation({open, setOpen, userProfile, onConfirm, loading}: Props) {
    return (
        <Dialog open={open} onOpenChange={() => setOpen(false)}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Are you sure?</DialogTitle>
                    <DialogDescription>
                        This action cannot be undone!
                    </DialogDescription>
                </DialogHeader>

                <div className="grid gap-4 py-2">
                    <Input
                        readOnly
                        id="fullName"
                        defaultValue="Pedro Duarte"
                        className="w-full"
                        type='text'
                        value={userProfile?.fullName ?? ""}
                    />

                    <Input
                        readOnly
                        id="contact"
                        defaultValue="Pedro Duarte"
                        className="w-full"
                        type="text"
                        value={userProfile?.contact ?? ""}
                    />


                    <Input
                        readOnly
                        id="email"
                        defaultValue="@peduarte"
                        className="w-full"
                        type='email'
                        value={userProfile?.email ?? ""}
                    />

                    {(Array.isArray(userProfile?.resumes) && userProfile?.resumes?.length > 0) &&
                        <div className="flex flex-col gap-2">
                            <p className="font-medium text-sm">Active Resume:</p>
                            <Link
                                href={`${userProfile.resumes.find((resume: any) => resume.active).url}`}
                                className="w-full flex items-center gap-1.5 text-xs text-green-500 font-medium bg-green-100/50 px-2.5 py-2 border-2 border-green-500 rounded"
                                download
                                target="_blank"
                            >
                                <File className="size-3.5"/>
                                <p>{truncate(userProfile.resumes.find((resume: any) => resume.active).name, {
                                    length: 40,
                                    omission: "..."
                                })}</p>
                            </Link>
                        </div>
                    }

                    <div className="mt-1.5 flex items-center justify-end text-xs gap-x-1">
                        <p className="text-muted-foreground">Change your details</p>
                        <Link href={`/profile`} className="text-blue-500 font-medium">over here</Link>
                    </div>
                </div>

                <DialogFooter>
                    <Button disabled={loading} type="button" variant="outline"
                            onClick={() => setOpen(false)}>Cancel</Button>
                    <Button disabled={loading} type="button" variant="default" onClick={onConfirm}>Continue</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
