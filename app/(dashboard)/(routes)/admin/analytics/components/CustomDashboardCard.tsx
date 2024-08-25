import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {ReactNode} from "react";

export default function CustomDashboardCard({icon, title, total, percentage}: {
    icon: ReactNode
    title: string
    total: number
    percentage: number
}) {
    return (
        <Card className="w-full shadow-none">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xs sm:text-sm font-medium">
                    {title}
                </CardTitle>
                {icon}
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{total}</div>
                <p className="text-xs text-muted-foreground">
                    +{percentage}%
                </p>
            </CardContent>
        </Card>
    );
}
