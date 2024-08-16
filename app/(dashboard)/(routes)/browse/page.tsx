import SearchInput from "@/app/(dashboard)/(routes)/browse/components/SearchInput";
import prismaDB from "@/lib/prismaDB";
import {auth} from "@clerk/nextjs/server";
import {getJobs} from "@/actions/getJobs";
import {JobCard} from "@/app/(dashboard)/(routes)/browse/components/JobCard";

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
            <SearchInput tags={categories}/>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
                {jobs.map((item, index) => (
                    <JobCard key={index} job={item}/>
                ))}
            </div>
        </div>
    );
}
