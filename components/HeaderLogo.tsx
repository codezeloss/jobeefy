import Link from "next/link";
import Image from "next/image";

export default function HeaderLogo() {
    return (
        <Link href="/">
            <div className="items-center hidden lg:flex">
                <Image src="/logo.svg" alt="Finance" height={22} width={22}/>
                <p className="font-semibold text-black dark:text-white text-xl ml-2.5">Jobeefy</p>
            </div>
        </Link>
    );
}
