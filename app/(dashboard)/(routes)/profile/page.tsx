import ProfileDetails from "@/app/(dashboard)/(routes)/profile/components/ProfileDetails";
import UserResumes from "@/app/(dashboard)/(routes)/profile/components/UserResumes";
import UserAppliedJobs from "@/app/(dashboard)/(routes)/profile/components/UserAppliedJobs";

export default function ProfilePage() {
    return (
        <div className="w-full h-full bg-white space-y-11">
            <ProfileDetails/>
            <UserResumes/>
            <UserAppliedJobs/>
        </div>
    );
}
