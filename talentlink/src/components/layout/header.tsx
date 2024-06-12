import Link from "next/link";
import { auth } from "@/auth";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { ModeToggle } from "../clickable/toggleMode";
import { HeaderNav } from "@/components/ui/HeaderNav";


export default async function Header() {
    const session = await auth();

    return (
        <header>
            <nav className="grid grid-cols-[auto_auto_auto_auto_1fr_1fr] ml-5">

                <HeaderNav isAuthenticated={Boolean(session)} />

                <div
                    className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary my-3 mr-10">
                    <ModeToggle />
                </div>

                <Link
                    href="/"
                    className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary my-3 self-center justify-self-end mr-5"
                >
                    <Avatar>
                        <AvatarImage
                            src="https://media.istockphoto.com/id/157430678/ru/%D1%84%D0%BE%D1%82%D0%BE/%D1%82%D1%80%D0%B8-%D0%BA%D0%B0%D1%80%D1%82%D0%BE%D1%84%D0%B5%D0%BB%D1%8C.jpg?s=1024x1024&w=is&k=20&c=ch51noKVMVylFSd2b7ODJ39Gs4ibhw48lMtn0QZNO3s="
                            alt="potato"
                        />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                </Link>
            </nav>
        </header>
    );
}
