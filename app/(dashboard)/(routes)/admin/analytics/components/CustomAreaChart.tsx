"use client"

import {Area, AreaChart, CartesianGrid, XAxis} from "recharts"
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,} from "@/components/ui/card"
import {ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent,} from "@/components/ui/chart"


const chartConfig = {
    job: {
        label: "Jobs",
        color: "hsl(160 84% 39%)",
    },
    company: {
        label: "Companies",
        color: "hsl(221.2 83.2% 53.3%)",
    },
} satisfies ChartConfig

export function CustomAreaChart({dataKey, title, data}: {
    dataKey: string,
    title: string,
    data: any
}) {
    return (
        <Card className="shadow-none">
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>
                    Showing stats for {new Date().getFullYear()}
                </CardDescription>
            </CardHeader>

            <CardContent>
                <ChartContainer config={chartConfig}>
                    <AreaChart
                        accessibilityLayer
                        data={data}
                        margin={{
                            left: 12,
                            right: 12,
                        }}
                    >
                        <CartesianGrid vertical={false}/>
                        <XAxis
                            dataKey="month"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent indicator="line"/>}
                        />
                        <Area
                            dataKey={dataKey}
                            type="natural"
                            fill={`var(--color-${dataKey})`}
                            fillOpacity={0.4}
                            stroke={`var(--color-${dataKey})`}
                        />
                    </AreaChart>
                </ChartContainer>
            </CardContent>

            <CardFooter>
                <div className="flex w-full items-start gap-2 text-sm">
                    <div className="grid gap-2">
                        <div className="flex items-center gap-2 font-medium leading-none">
                            Trend information based on your data
                        </div>
                        <div className="flex items-center gap-2 leading-none text-muted-foreground">
                            {data[0].month} - {data[data.length - 1].month}
                        </div>
                    </div>
                </div>
            </CardFooter>
        </Card>
    )
}
