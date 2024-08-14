import axios from "axios";

export const deleteUploadthingURL = async (imageURL: string) => {
    await axios.delete("/api/uploadthing", {
        data: {
            url: imageURL,
        },
    })
}

export const deleteUploadthingFiles = async (attachments: any) => {
    await Promise.all(
        attachments.map(async (attachment: any) => {
            await deleteUploadthingURL(attachment.url)
        })
    )
}