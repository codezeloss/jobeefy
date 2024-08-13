import {createUploadthing, type FileRouter} from "uploadthing/next";
import {UploadThingError} from "uploadthing/server";
import {auth} from "@clerk/nextjs/server";

const f = createUploadthing();

export const ourFileRouter = {
    jobCoverImage: f({image: {maxFileSize: "4MB", maxFileCount: 1}})
        .middleware(async ({req}) => {
            const {userId} = auth()
            if (!userId) throw new UploadThingError("Unauthorized");
            return {userId: userId};
        })
        .onUploadComplete(async ({metadata, file}) => {
            return {uploadedBy: metadata.userId, uploadedFile: file.url};
        }),
    companyLogoImage: f({image: {maxFileSize: "4MB", maxFileCount: 1}})
        .middleware(async ({req}) => {
            const {userId} = auth()
            if (!userId) throw new UploadThingError("Unauthorized");
            return {userId: userId};
        })
        .onUploadComplete(async ({metadata, file}) => {
            return {uploadedBy: metadata.userId, uploadedFile: file.url};
        }),
    companyCoverImage: f({image: {maxFileSize: "4MB", maxFileCount: 1}})
        .middleware(async ({req}) => {
            const {userId} = auth()
            if (!userId) throw new UploadThingError("Unauthorized");
            return {userId: userId};
        })
        .onUploadComplete(async ({metadata, file}) => {
            return {uploadedBy: metadata.userId, uploadedFile: file.url};
        }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;