import { Button } from "@/src/components/ui/button";
import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa6";
import { IoMdMail } from "react-icons/io";

const Footer = () => {
  return (
    <>
      <hr className="border-none bg-primary h-auto w-full m-auto" />
      <div className="flex justify-around items-center py-8">
        <p className="text-[0.8rem] text-black">© 2024 JMS</p>
        <div className="flex justify-between items-center gap-x-4">

          <Link href="https://www.instagram.com/vitoriamacedo.estetic/">
            <Button variant={"secondary"} size={"icon"} className="">
              <FaInstagram/>
            </Button>
          </Link>

          <Link href="https://wa.me/message/LE6IQMCMQZUIA1">
            <Button variant={"secondary"} size={"icon"} className="">
              <FaWhatsapp/>
            </Button>
          </Link>

          <Link href="https://linktr.ee/vitoriamacedo.estetic">
            <Button variant={"secondary"} size={"icon"} className="">
              <IoMdMail/>
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Footer;
