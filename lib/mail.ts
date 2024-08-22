import toast from "react-hot-toast";
import nodemailer from "nodemailer"
import * as handlebars from "handlebars";
import {ThankYouTemplate} from "@/lib/designs/thank-you";

export const sendMail = async ({to, name, subject, body}: {
    to: string,
    name: string,
    subject: string,
    body: string
}) => {
    const {SMTP_EMAIL, SMTP_PASSWORD} = process.env

    const transport = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: SMTP_EMAIL,
            pass: SMTP_PASSWORD,
        }
    })

    try {
        const textResult = await transport.verify()
        console.log(textResult)
    } catch (e) {
        console.log(e)
        toast.error((e as Error).message)
        return
    }

    try {
        return await transport.sendMail({
            from: SMTP_EMAIL,
            to,
            subject,
            html: body
        })
    } catch (e) {
        console.log(e)
        toast.error((e as Error).message)
        return
    }
}

export const compiledThankYouEmailTemplate = (name: string) => {
    const template = handlebars.compile(ThankYouTemplate)
    return template({
        name: name
    })
}