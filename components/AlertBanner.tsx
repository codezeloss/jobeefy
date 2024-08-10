import {TriangleAlert} from "lucide-react";
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert";

interface Props {
    title: string
    description: string
    variant: "success" | "destructive"
}

export default function AlertBanner({title, description, variant, ...props}: Props) {
    return (
        <Alert variant={variant} {...props}>
            <TriangleAlert className="h-4 w-4"/>
            <AlertTitle>{title}</AlertTitle>
            <AlertDescription>
                {description}
            </AlertDescription>
        </Alert>
    );
}
