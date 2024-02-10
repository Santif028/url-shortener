import Image from "next/image"
import Link from "next/link"

const LogoPage = () =>{
    return (
        <Link href='/' className="p-2 transition-all duration-150 ease-in hover:bg-red-700 hover:rounded-full">
            <Image src='/imgs/setsu.png' width={48} height={48} alt="Setsu Website Icon" className="invert"/>
        </Link>
    )
 }
 export default LogoPage