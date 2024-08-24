import {compiledSelectionTemplate, sendMail} from "@/lib/mail";
import {NextResponse} from "next/server";

export const POST = async (req: Request) => {
    const {email, fullName} = await req.json()

    const response = await sendMail({
        to: email,
        name: fullName,
        subject: `Congratulations!! You've been selected for the second round.`,
        body: compiledSelectionTemplate(fullName)
    })

    if (response?.messageId) {
        return NextResponse.json("Mail Delivered", {status: 200})
    } else {
        return new NextResponse("Mail not send", {status: 401})
    }
}