import {Job} from "@prisma/client";
import {auth} from "@clerk/nextjs/server";
import prismaDB from "@/lib/prismaDB";

type GetJobs = {
    title?: string
    categoryId?: string
    createdAtFilter?: string
    shiftTimings?: string
    workMode?: string
    yearsOfExperience?: string
    savedJobs?: boolean
}

export const getJobs = async ({
                                  title,
                                  categoryId,
                                  createdAtFilter,
                                  shiftTimings,
                                  workMode,
                                  yearsOfExperience,
                                  savedJobs
                              }: GetJobs): Promise<Job[]> => {
    const {userId} = auth()

    try {
        let query: any = {
            where: {
                isPublished: true,
            },
            include: {
                company: true,
                category: true
            },
            orderBy: {
                createdAt: "desc"
            }
        }

        return await prismaDB.job.findMany(query)
    } catch (e) {
        console.log("[GET_JOBS]: ", e)
        return []
    }
}