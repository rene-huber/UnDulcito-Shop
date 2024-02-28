import "./styles.css";
import Image from "next/image";
import InstagramIcon from "@mui/icons-material/Instagram";
import Link from "next/link";


function Adresse() {
  return (
    <main className="wrap">

      <div className="top">
      <h1>#UnDulcito</h1>
      {/* <button className="button"> Follow us in Instagram</button> */}
      
      The orders must be placed with 3 days advance notice
      </div>

    
      
      <div className="contact">
      <h2>
      Tel.+1321-7329403
     <br />
     undulcito2015@gmail.com</h2>
     we will gladly
attend you.
      </div>
    
<div className="gif" >
<Image src='/location.gif' alt="work" width={109} height={109} className="imagen"/>

<p>Delivery Service / Pickup</p>
<h2> Now Located in Saint Cloud, Florida</h2>
<Link href="https://www.google.com/maps/place/St.+Cloud,+Florida,+EE.+UU./@50.2734174,8.8731668,5.3z/data=!4m6!3m5!1s0x88dd8e1775153549:0x53642186d1e0dabf!8m2!3d28.2488949!4d-81.2812895!16zL20vMHJweTI?entry=ttu">
   [ view map ]</Link>
</div>

    </main>

  )
}

export default Adresse