import "@/styles/Success.scss"
import Link from "next/link"

const Canceled = () => {
  return (
    <div className="success">
    <h1>ooh...canceled order</h1>
    <Link href="/">Go back TO SHOPPING</Link>
  </div>
  )
}

export default Canceled