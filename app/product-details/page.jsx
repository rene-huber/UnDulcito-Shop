import { Suspense } from 'react'
import ProductDetails from '@/components/ProductDetails'

function page() {
  return 
  <Suspense fallback={<div>Loading...</div>}>

    <ProductDetails />
  </Suspense>
  
}

export default page