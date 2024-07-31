import {ClerkLoaded, ClerkLoading, SignUp} from "@clerk/nextjs";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function SignUpPage() {
    return (
        <>
            <ClerkLoaded>
                <SignUp/>
            </ClerkLoaded>
            <ClerkLoading>
                <LoadingSpinner/>
            </ClerkLoading>
        </>
    );
}