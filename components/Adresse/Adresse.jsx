import "./styles.css";
import Image from "next/image";
import InstagramIcon from "@mui/icons-material/Instagram";


function Adresse() {
  return (
    <main className="wrap">

      <div className="top">
      <h2>#UnDulcito</h2>
      <button className="button"><InstagramIcon sx={{ color: "white" ,fontSize: 30, marginRight: 1, marginLeft: 1  }} /> Follow us in Instagram</button>
      </div>

    
      The orders must be placed with 3 days advance notice
      
    <h3>
      Tel.+1321-7329403
      </h3>
      
    
    <h2>undulcito2015@gmail.com</h2>
<div className="gif" >
<Image src='/location.gif' alt="work" width={109} height={109} className="imagen"/>

<p>Delivery Service / Pickup</p>
<h2> Now Located in Saint Cloud, Florida</h2>
</div>

    </main>

  )
}

export default Adresse