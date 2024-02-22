import "@/styles/Success.scss"
import Link from "next/link"
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

const Success = () => {
  return (
    <div className="success">
      <h1>Payment Successfully</h1>
      <p>Thank you for your purchase!</p>
      <Link href="https://api.whatsapp.com/send?phone=+13217329403" className="buttonStyle">
          <WhatsAppIcon sx={{ color: "white" ,fontSize: 50, marginRight: 1 }} /> 
          <p>Plesea open a chat here!</p>
        </Link>
<br />
      <Link href="/" className="continue">CONTINUE TO SHOPPING</Link>



    </div>
  )
}

export default Success