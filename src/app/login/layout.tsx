import { ReactNode } from "react";
import NavbarComponent from "../navbar/page";

interface LoginLayoutProps {
    children: ReactNode;
}

const LoginLayout = (props: LoginLayoutProps) => {
    return (
        <div>
            <NavbarComponent />
            <div>{props.children}</div>
        </div>
    )
}

export default LoginLayout;