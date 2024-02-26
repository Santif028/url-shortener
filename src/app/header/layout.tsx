import { ReactNode } from "react";
import NavbarComponent from "../navbar/page";

interface HeaderLayoutProps {
    children: ReactNode;
}


const HeaderLayout = (props: HeaderLayoutProps) => {
    return (
        <div>
            <NavbarComponent />
            <div>{props.children}</div>
        </div>
    )
}

export default HeaderLayout