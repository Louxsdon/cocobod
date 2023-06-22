import NavLinks from "./NavLinks";
export default function Navbar() {
    return (
        <>
            {/* ******************
        ------ NAVBAR SECTION -------
        **********************
         */}
            <div className="bg-purple-200 py-1"></div>
            <nav className="navbar flex-col w-full">
                {/* --- Nav links --- */}
                <NavLinks />
            </nav>
        </>
    );
}
