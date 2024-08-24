import {Company} from "@prisma/client";
import ReactQuillPreview from "@/components/ReactQuillPreview";

interface Props {
    company: Company
}

export default function CompanyOverview({company}: Props) {
    return (
        <div className="w-full h-full">
            {company.overview && <ReactQuillPreview value={company.overview}/>}
        </div>
    );
}
