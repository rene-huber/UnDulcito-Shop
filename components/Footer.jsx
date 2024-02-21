// components/Footer.js
import Link from 'next/link';
import InstagramIcon from "@mui/icons-material/Instagram";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import FacebookIcon from '@mui/icons-material/Facebook';
import PhoneForwardedIcon from '@mui/icons-material/PhoneForwarded';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import "@/styles/Footer.scss"; // Importa los estilos CSS
import Image from 'next/image';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer_logo">
        {/* <Image src="/logo.png" alt="Logo" width={70} height={40}/> */}
      </div>
      <div className="footer_social">
        <Link href="https://www.instagram.com/"><InstagramIcon sx={{ color: "white" ,fontSize: 30, marginRight: 1, marginLeft: 1  }} /></Link>
        <Link href="https://www.facebook.com/"><FacebookIcon sx={{ color: "white" ,fontSize: 30, marginRight: 1, marginLeft: 0  }} /></Link>
        <Link href="https://wa.me/123456789"><WhatsAppIcon sx={{ color: "white" ,fontSize: 30, marginRight: 1, marginLeft: 0  }} /></Link>
      </div>
     
    </footer>
  );
}

export default Footer;
