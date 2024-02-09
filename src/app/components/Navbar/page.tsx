import LogoPage from "../logo/page"
import LoginComponent from "../login/page";

const NavbarComponent = () => {
    return (
        <nav className="flex items-center">
            <LogoPage />
            <ul>
                <li>
                    <LoginComponent />
                </li>
            </ul>
        </nav>
    )
}

export default NavbarComponent