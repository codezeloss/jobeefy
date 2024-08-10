import {generateUploadButton, generateUploadDropzone,} from "@uploadthing/react";
import {OurFileRouter} from "@/app/api/uploadthing/core";

export const UploadthingButton = generateUploadButton<OurFileRouter>();
export const UploadthingDropzone = generateUploadDropzone<OurFileRouter>();