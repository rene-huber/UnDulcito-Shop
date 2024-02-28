// components/Footer.js
import Link from "next/link";
import InstagramIcon from "@mui/icons-material/Instagram";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import FacebookIcon from "@mui/icons-material/Facebook";
import ImportantDevicesIcon from "@mui/icons-material/ImportantDevices";
import "@/styles/Footer.scss";
import Image from "next/image";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer_logo">
        <Image src="/logoFooter.png" alt="Logo" width={35} height={25} />
        <span>Un Dulcito © 2024.</span>
      </div>

      <div className="terms">
        <Link href="https://wa.me/123456789"><span>&#8226;</span>Chat</Link>
        <Link href="/terms"><span>&#8226;</span>Terms and Conditions</Link>
        <Link href="/privacy"><span>&#8226;</span>Privacy Policy</Link>
        <Link href="https://rene-huber.eu/"><span>&#8226;</span> Web</Link>
      </div>

      <div className="footer_social">
        <Link href="https://www.instagram.com/">
          <InstagramIcon
            sx={{ color: "white", fontSize: 30, marginRight: 1, marginLeft: 1 }}
          />
        </Link>
        <Link href="https://www.facebook.com/">
          <FacebookIcon
            sx={{ color: "white", fontSize: 30, marginRight: 1, marginLeft: 0 }}
          />
        </Link>
        <Link href="https://wa.me/123456789">
          <WhatsAppIcon
            sx={{ color: "white", fontSize: 30, marginRight: 1, marginLeft: 0 }}
          />
        </Link>
      </div>
    </footer>
  );
}

export default Footer;
