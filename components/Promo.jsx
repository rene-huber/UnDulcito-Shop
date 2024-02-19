import "@/styles/Navbar.scss";
import InstagramIcon from "@mui/icons-material/Instagram";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import FacebookIcon from '@mui/icons-material/Facebook';
import PhoneForwardedIcon from '@mui/icons-material/PhoneForwarded';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';

import Link from "next/link";

const Promo = () => {
  return (
    <>
      <div className="promo-container">

        <div className="call"><PhoneForwardedIcon sx={{ color: "#d00000", fontSize: 20 ,marginRight: 1 }} />
        <p>Order online or call us (+1) 321-7329403</p> </div>

        <div className="call derecha"><LocalShippingIcon sx={{ color: "#d00000", fontSize: 20 , marginRight: 1}} />
        <p>Free shiping if the ammount exced 250$</p></div>
        <div>


        <div className="call">
        <Link href="/login"><p>Register / Login</p> </Link>
          
          <Link href="https://www.instagram.com/">
          <InstagramIcon sx={{ color: "white" ,fontSize: 20, marginRight: 0, marginLeft: 2  }} />
        </Link>
          <Link href="https://www.instagram.com/">
          <FacebookIcon sx={{ color: "white" ,fontSize: 20, marginRight: 1, marginLeft: 1  }} />
        </Link>


          <Link href="https://api.whatsapp.com/send?phone=+13217329403">
          <WhatsAppIcon sx={{ color: "white" ,fontSize: 20, marginRight: 1 }} />
        </Link>
        </div>
        </div>
      </div>
    </>
  );
};

export default Promo;
