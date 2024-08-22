import {Check, TriangleAlert} from "lucide-react";
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert";

interface Props {
    title: string
    description: string
    variant: "success" | "destructive"
    className?: string
}

export default function AlertBanner({title, description, variant, ...props}: Props) {
    return (
        <Alert variant={variant} {...props}>
            {variant === "success" ? <Check className="h-4 w-4"/> : <TriangleAlert className="h-4 w-4"/>}
            <AlertTitle>{title}</AlertTitle>
            <AlertDescription>
                {description}
            </AlertDescription>
        </Alert>
    );
}
