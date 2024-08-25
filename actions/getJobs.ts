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

        // ---> Filter data based on the "categoryId" & "title"
        if (typeof title !== "undefined" || typeof categoryId !== "undefined") {
            query.where = {
                AND: [
                    typeof title !== "undefined" && {
                        title: {
                            contains: title,
                            mode: "insensitive"
                        }
                    },
                    typeof categoryId !== "undefined" && {
                        categoryId: {
                            equals: categoryId
                        }
                    }
                ].filter(Boolean)
            }
        }

        // ---> Check whether "createdAtFilter" is provided or not
        if (createdAtFilter) {
            const currentDate = new Date();
            let startDate: Date

            switch (createdAtFilter) {
                case "today":
                    startDate = new Date(currentDate);
                    break;

                case "yesterday":
                    startDate = new Date(currentDate);
                    startDate.setDate(startDate.getDate() - 1);
                    break;

                case "thisWeek":
                    startDate = new Date(currentDate);
                    startDate.setDate(startDate.getDate() - currentDate.getDay());
                    break;

                case "lastWeek":
                    startDate = new Date(currentDate);
                    startDate.setDate(startDate.getDate() - currentDate.getDay() - 7);
                    break;

                case "thisMonth":
                    startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
                    break;

                default:
                    startDate = new Date(0);
            }

            query.where.createdAt = {
                gte: startDate
            }
        }

        // ---> Filter data based on the "shiftTimings"
        let formattedShiftTimings = shiftTimings?.split(",")

        if (formattedShiftTimings && formattedShiftTimings.length > 0) {
            query.where.shiftTimings = {
                in: formattedShiftTimings
            }
        }

        // ---> Filter data based on the "workMode"
        let formattedWorkingModes = workMode?.split(",")

        if (formattedWorkingModes && formattedWorkingModes.length > 0) {
            query.where.workMode = {
                in: formattedWorkingModes
            }
        }

        // ---> Filter data based on the "yearsOfExperience"
        let formattedExperiences = yearsOfExperience?.split(",")

        if (formattedExperiences && formattedExperiences.length > 0) {
            query.where.yearsOfExperience = {
                in: formattedExperiences
            }
        }

        // ---> Filter data based on "savedJobs"
        if (savedJobs) {
            query.where.savedUsers = {
                has: userId
            }
        }

        return await prismaDB.job.findMany(query)
    } catch (e) {
        console.log("[GET_JOBS]: ", e)
        return []
    }
}