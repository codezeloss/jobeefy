import SearchInput from "@/app/(dashboard)/(routes)/browse/components/SearchInput";
import prismaDB from "@/lib/prismaDB";
import {auth} from "@clerk/nextjs/server";
import {getJobs} from "@/actions/getJobs";
import JobsContent from "@/app/(dashboard)/(routes)/browse/components/JobsContent";

interface SearchProps {
    searchParams: {
        title: string
        categoryId: string
        createdAtFilter: string
        shiftTimings: string
        workMode: string
        yearsOfExperience: string
    }
}

export default async function BrowsePage({searchParams}: SearchProps) {
    const {userId} = auth()

    const categories = await prismaDB.category.findMany({
        orderBy: {
            name: "asc"
        }
    })

    const jobs = await getJobs({...searchParams})

    return (
        <div className="w-full h-full bg-white">
            <SearchInput categories={categories}/>
            <JobsContent jobs={jobs} userId={userId}/>
        </div>
    );
}
