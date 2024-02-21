import "@/styles/Success.scss"
import Link from "next/link"

const Success = () => {
  return (
    <div className="success">
      <h1>Payment Successfully</h1>
      <p>Thank you for your purchase!</p>
      <Link href="/">CONTINUE TO SHOPPING</Link>
    </div>
  )
}

export default Success