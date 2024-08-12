import Link from "next/link";
import {Button} from "@/components/ui/button";
import {Plus} from "lucide-react";

export default function CompaniesPage() {
    return (
        <div className="w-full h-full bg-white rounded">
            <div className="w-full flex items-center justify-between mb-4">
                <h1 className="font-semibold text-xl md:text-2xl lg:text-3xl">Companies</h1>

                <Link href="/admin/create">
                    <Button className="gap-x-1.5">
                        <Plus size={18}/>
                        New Company
                    </Button>
                </Link>
            </div>
        </div>
    );
}
