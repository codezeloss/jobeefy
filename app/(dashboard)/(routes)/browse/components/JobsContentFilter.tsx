"use client"

import {Button} from "@/components/ui/button";
import {Settings2} from "lucide-react";
import {useEffect, useState} from "react";
import {MultiSelect} from "@/app/(dashboard)/(routes)/browse/components/MultipleSelect";
import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue,} from "@/components/ui/select"
import {usePathname, useRouter} from "next/navigation";
import qs from "query-string"


const dateList = [
    {value: "today", label: "Today"},
    {value: "yesterday", label: "Yesterday"},
    {value: "thisWeek", label: "This week"},
    {value: "lastWeek", label: "Last week"},
    {value: "thisMonth", label: "This month"},
]

const scheduleList = [
    {value: "full-time", label: "Full Time"},
    {value: "part-time", label: "Part Time"},
    {value: "contract", label: "Contract"}
];

const modesList = [
    {value: "remote", label: "Remote"},
    {value: "hybrid", label: "Hybrid"},
    {value: "office", label: "Office"}
];

const experienceList = [
    {value: "0", label: "Fresher"},
    {value: "2", label: "0-2 years"},
    {value: "3", label: "2-4 years"},
    {value: "5", label: "5+ years"}
];

export default function JobsContentFilter() {
    const router = useRouter()
    const pathname = usePathname()

    const [showFilters, setShowFilters] = useState(false)
    const [selectedSchedules, setSelectedSchedules] = useState<string[]>([])
    const [selectedModes, setSelectedModes] = useState<string[]>([])
    const [selectedExperiences, setSelectedExperiences] = useState<string[]>([])

    useEffect(() => {
        if (showFilters) {
            setSelectedSchedules([])
            setSelectedModes([])
            setSelectedExperiences([])
        }
    }, [showFilters]);

    // Handle Filters
    const handleFilterDateChange = (value: string) => {
        const currentQueryParams = qs.parseUrl(window.location.href).query
        const updatedQueryParams = {
            ...currentQueryParams,
            createdAtFilter: value
        }

        const url = qs.stringifyUrl({
            url: pathname,
            query: updatedQueryParams
        }, {
            skipNull: true,
            skipEmptyString: true
        })

        router.push(url)
    }

    const handleShiftTimingsChange = (shiftTimings: any[]) => {
        const currentQueryParams = qs.parseUrl(window.location.href).query
        const updatedQueryParams = {
            ...currentQueryParams,
            shiftTimings: shiftTimings
        }

        const url = qs.stringifyUrl({
            url: pathname,
            query: updatedQueryParams
        }, {
            skipNull: true,
            skipEmptyString: true
        })

        router.push(url)
    }

    const handleWorkingModesChange = (workingMode: any[]) => {
        const currentQueryParams = qs.parseUrl(window.location.href).query
        const updatedQueryParams = {
            ...currentQueryParams,
            workMode: workingMode
        }

        const url = qs.stringifyUrl({
            url: pathname,
            query: updatedQueryParams
        }, {
            skipNull: true,
            skipEmptyString: true,
            arrayFormat: "comma"
        })

        router.push(url)
    }

    const handleYearsOfExperienceChange = (yearsOfExperience: any[]) => {
        const currentQueryParams = qs.parseUrl(window.location.href).query
        const updatedQueryParams = {
            ...currentQueryParams,
            yearsOfExperience: yearsOfExperience
        }

        const url = qs.stringifyUrl({
            url: pathname,
            query: updatedQueryParams
        }, {
            skipNull: true,
            skipEmptyString: true,
            arrayFormat: "comma"
        })

        router.push(url)
    }

    useEffect(() => {
        handleShiftTimingsChange(selectedSchedules)
    }, [selectedSchedules]);

    useEffect(() => {
        if (selectedModes) handleWorkingModesChange(selectedModes)
    }, [selectedModes]);

    useEffect(() => {
        if (selectedExperiences) handleYearsOfExperienceChange(selectedExperiences)
    }, [selectedExperiences]);


    return (
        <div className="my-4 space-y-2">
            <Button
                className="flex items-center gap-x-1"
                type="button"
                variant={showFilters ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
            >
                <Settings2 className="size-4"/>
                Filters
            </Button>

            {showFilters &&
                <div className="">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                        <div className="w-full">
                            <Select onValueChange={(selected) => handleFilterDateChange(selected)}>
                                <SelectTrigger
                                    className="w-full text-xs text-muted-foreground font-medium bg-slate-100/50 hover:bg-slate-100">
                                    <SelectValue placeholder="Filter by Date"

                                    />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        {dateList.map((item, index) => (
                                            <SelectItem
                                                key={index}
                                                value={item.value}
                                                className="text-xs"
                                            >
                                                {item.label}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="w-full">
                            <MultiSelect
                                options={scheduleList}
                                onValueChange={setSelectedSchedules}
                                defaultValue={selectedSchedules}
                                placeholder="Working Schedule"
                                variant="inverted"
                                animation={2}
                                maxCount={3}
                            />
                        </div>

                        <div className="w-full">
                            <MultiSelect
                                options={modesList}
                                onValueChange={setSelectedModes}
                                defaultValue={selectedModes}
                                placeholder="Working Modes"
                                variant="inverted"
                                animation={2}
                                maxCount={3}
                            />
                        </div>

                        <div className="w-full">
                            <MultiSelect
                                options={experienceList}
                                onValueChange={setSelectedExperiences}
                                defaultValue={selectedExperiences}
                                placeholder="Experience"
                                variant="inverted"
                                animation={2}
                                maxCount={3}
                            />
                        </div>
                    </div>

                </div>
            }
        </div>
    );
}
