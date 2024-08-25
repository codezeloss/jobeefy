import Image from "next/image";
import {Company} from "@prisma/client";
import {truncate} from "lodash";
import Link from "next/link";

export default function FollowedCompanies({data}: { data: Company[] }) {
    return (
        <div>
            <h2 className="font-semibold text-base mb-4">Followed Companies</h2>

            {data.length > 0 ?
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-4">
                    {data.map((company, index) => (
                        <div key={index} className="border rounded p-4">
                            {company?.logo && <Image
                                src={company.logo}
                                alt="Company's logo"
                                className="p-4 text-xs w-full h-auto"
                                width={200}
                                height={200}
                            />}

                            <Link href={`/companies/${company.id}`}>
                                <p
                                    className="font-semibold text-lg hover:underline hover:text-blue-500">
                                    {company.name}
                                </p>
                            </Link>
                            {
                                company.description &&
                                <p className="font-normal text-xs mt-2 text-muted-foreground">{truncate(company.description, {
                                    length: 60,
                                    omission: "..."
                                })}</p>}
                        </div>
                    ))}
                </div> :
                <p className="text-muted-foreground text-sm">You&apos;re not following any company yet!</p>
            }
        </div>
    );
}
