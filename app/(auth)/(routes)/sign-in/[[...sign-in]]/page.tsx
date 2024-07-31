import {ClerkLoaded, ClerkLoading, SignIn} from "@clerk/nextjs";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function Page() {
    return (
        <>
            <ClerkLoaded>
                <SignIn/>
            </ClerkLoaded>
            <ClerkLoading>
                <LoadingSpinner/>
            </ClerkLoading>
        </>
    );
}