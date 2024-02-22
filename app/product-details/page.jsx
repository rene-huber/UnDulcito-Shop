import { Suspense } from 'react'
import ProductDetails from '@/components/ProductDetails'

function page() {
  return 
 <>
  <Suspense>

<ProductDetails />
</Suspense>
 </>
  
}

export default page