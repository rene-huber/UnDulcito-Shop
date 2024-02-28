import "./styles.css";
import Image from "next/image";
import InstagramIcon from "@mui/icons-material/Instagram";


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
</div>

    </main>

  )
}

export default Adresse