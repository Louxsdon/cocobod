import { Link } from "@inertiajs/react";
import React from "react";

export default function NavLink({ href, children }) {
    const { asPath } = useRouter();
    return (
        <Link href={href} className={`nav-link `}>
            {children}
        </Link>
    );
}
