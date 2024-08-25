import CustomBreadCrumb from "@/components/CustomBreadCrumb";
import SearchJobs from "@/app/(dashboard)/(routes)/saved/components/SearchJobs";
import SavedJobsCards from "@/app/(dashboard)/(routes)/saved/components/SavedJobsCards";
import {auth} from "@clerk/nextjs/server";
import {getJobs} from "@/actions/getJobs";
import {redirect} from "next/navigation";

interface SearchParamsProps {
    searchParams: {
        title: string
        categoryId: string
        createdAtFilter: string
        shiftTimings: string
        workMode: string
        yearsOfExperience: string
    }
}

export default async function SavedJobsPage({searchParams}: SearchParamsProps) {
    const {userId} = auth()

    if (!userId) redirect("/sign-in")

    const jobs = await getJobs({...searchParams, savedJobs: true})

    return (
        <div className="bg-white w-full h-full space-y-8">
            <CustomBreadCrumb breadCrumbPage="Saved jobs"/>

            <div className="space-y-6">
                <SearchJobs/>
                <SavedJobsCards jobs={jobs} userId={userId}/>
            </div>
        </div>
    );
}
