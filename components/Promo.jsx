import "@/styles/Navbar.scss";
import InstagramIcon from "@mui/icons-material/Instagram";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import PhoneForwardedIcon from '@mui/icons-material/PhoneForwarded';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
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
          <InstagramIcon sx={{ color: "white" ,fontSize: 20, marginRight: 2, marginLeft: 2  }} />
          <WhatsAppIcon sx={{ color: "white" ,fontSize: 20, marginRight: 1 }} />
        </div>
        </div>
      </div>
    </>
  );
};

export default Promo;
