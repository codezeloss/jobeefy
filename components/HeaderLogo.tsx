import Link from "next/link";
import Image from "next/image";

export default function HeaderLogo() {
    return (
        <Link href="/browse">
            <div className="items-center flex">
                <Image className="text-xs" src="/logo.svg" alt="Jobeefy" height={27} width={27}/>
                <p className="font-semibold text-black dark:text-white text-2xl ml-2.5">Jobeefy</p>
            </div>
        </Link>
    );
}
