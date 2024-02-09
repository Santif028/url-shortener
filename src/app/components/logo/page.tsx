import Image from "next/image"
import setsuIcon from "@/imgs/setsu.png"
import Link from "next/link"

const LogoPage = () =>{
    return (
        <Link href='/' className=" hover:bg-red-500 hover:rounded-full p-1">
            <Image src={setsuIcon} alt="Setsu Website Icon" className="invert size-12"/>
        </Link>
    )
 }
 export default LogoPage