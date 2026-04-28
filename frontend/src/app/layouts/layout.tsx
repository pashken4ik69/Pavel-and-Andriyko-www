import { NavLink, Outlet } from "react-router"

function Layout() {
    return (
        <div>
            <nav>
                <NavLink to={"/"}>Home</NavLink>
                <NavLink to={"/spaces"}>Spaces</NavLink>
            </nav>
            <main>
                <Outlet />
            </main>
        </div>
    )
}

export default Layout
