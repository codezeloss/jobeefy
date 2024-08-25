import CustomDashboardCard from "@/app/(dashboard)/(routes)/admin/analytics/components/CustomDashboardCard";
import {BriefcaseBusiness, Building2, Hospital} from "lucide-react";
import {CustomAreaChart} from "@/app/(dashboard)/(routes)/admin/analytics/components/CustomAreaChart";
import prismaDB from "@/lib/prismaDB";
import {auth} from "@clerk/nextjs/server";

export default async function AnalyticsPage() {
    const {userId} = auth()

    // ** Fetch data
    const allJobs = await prismaDB.job.findMany({
        orderBy: {
            createdAt: "desc"
        }
    })

    const userJobs = await prismaDB.job.findMany({
        where: {
            userId: userId as string
        },
        orderBy: {
            createdAt: "desc"
        }
    })

    const allCompanies = await prismaDB.company.findMany({
        orderBy: {
            createdAt: "desc"
        }
    })

    const userCompanies = await prismaDB.company.findMany({
        where: {
            userId: userId as string
        },
        orderBy: {
            createdAt: "desc"
        }
    })

    // ** Transform data
    const generateFullYearData = (year: any, data: any, dataKey: string) => {
        const months = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];

        return months.map((month: string) => {
            const matchingData = data.find((d: any) => d.month === month && d.year === year);
            return {
                month: `${month} ${year}`,
                [dataKey]: matchingData ? matchingData[dataKey] : 0
            };
        });
    };

    const transformData = (data: any, dataKey: string) => {
        const monthlyData: any = {};

        data.forEach((item: any) => {
            const date = new Date(item.createdAt);
            const year = date.getFullYear();
            const month = date.toLocaleString('default', {month: 'long'});

            const key = `${year}-${month}`;
            if (!monthlyData[key]) {
                monthlyData[key] = 0;
            }
            monthlyData[key]++;
        });

        const transformedData = Object.entries(monthlyData).map(([key, count]) => {
            const [year, month] = key.split('-');
            return {
                year: parseInt(year),
                month,
                [dataKey]: count
            };
        });

        const years = Array.from(new Set(transformedData.map((d) => d.year)));

        return years.flatMap(year => generateFullYearData(year, transformedData, dataKey));
    };

    const calculatePercentage = (data: any[], period: 'month' | 'year' = 'month') => {
        const sortedData = [...data].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

        let currentPeriodCount = 0;
        let previousPeriodCount = 0;
        const now = new Date();

        sortedData.forEach((item) => {
            const itemDate = new Date(item.createdAt);
            if (period === 'month') {
                if (itemDate.getMonth() === now.getMonth() && itemDate.getFullYear() === now.getFullYear()) {
                    currentPeriodCount++;
                } else if (itemDate.getMonth() === (now.getMonth() - 1 + 12) % 12 &&
                    (itemDate.getFullYear() === now.getFullYear() || (now.getMonth() === 0 && itemDate.getFullYear() === now.getFullYear() - 1))) {
                    previousPeriodCount++;
                }
            } else if (period === 'year') {
                if (itemDate.getFullYear() === now.getFullYear()) {
                    currentPeriodCount++;
                } else if (itemDate.getFullYear() === now.getFullYear() - 1) {
                    previousPeriodCount++;
                }
            }
        });

        if (previousPeriodCount === 0) {
            return currentPeriodCount > 0 ? 100 : 0;
        }

        const percentageChange = ((currentPeriodCount - previousPeriodCount) / previousPeriodCount) * 100;
        return Number(percentageChange.toFixed(1));
    };

    const jobsData = transformData(userJobs, 'job');
    const companiesData = transformData(userCompanies, 'company');

    return (
        <div className="bg-white w-full h-full space-y-4 mb-16">
            <div className="flex flex-col gap-1.5">
                <h1 className="font-semibold text-xl md:text-2xl lg:text-3xl">Dashboard</h1>
                <p className="text-sm text-neutral-400">An overview of your account</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                <CustomDashboardCard
                    icon={<BriefcaseBusiness size={17}/>}
                    title={"Total Jobs"}
                    total={allJobs.length}
                    percentage={calculatePercentage(allJobs)}
                />
                <CustomDashboardCard
                    icon={<BriefcaseBusiness size={17}/>}
                    title={"Jobs Created"}
                    total={userJobs.length}
                    percentage={calculatePercentage(userJobs)}
                />
                <CustomDashboardCard
                    icon={<Building2 size={17}/>}
                    title={"Total Companies"}
                    total={allCompanies.length}
                    percentage={calculatePercentage(allCompanies)}
                />
                <CustomDashboardCard
                    icon={<Hospital size={17}/>}
                    title={"Companies Created"}
                    total={userCompanies.length}
                    percentage={calculatePercentage(userCompanies)}
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <CustomAreaChart title="Jobs Created" data={jobsData} dataKey="job"/>
                <CustomAreaChart title="Companies created" data={companiesData} dataKey="company"/>
            </div>
        </div>
    );
}
