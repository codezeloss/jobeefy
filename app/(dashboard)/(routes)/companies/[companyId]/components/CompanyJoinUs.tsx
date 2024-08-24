import {Company} from "@prisma/client";
import ReactQuillPreview from "@/components/ReactQuillPreview";

interface Props {
    company: Company
}

export default function CompanyJoinUs({company}: Props) {
    return (
        <div className="w-full h-full">
            {company.whyJoinUs && <ReactQuillPreview value={company.whyJoinUs}/>}
        </div>
    );
}
