"use client"
import "@/styles/Navbar.scss"
import { Menu, Person, Search, ShoppingCart } from '@mui/icons-material'
import InstagramIcon from '@mui/icons-material/Instagram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import LoginIcon from '@mui/icons-material/Login';
import { IconButton } from '@mui/material'
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import React, { useState } from 'react'
import { useRouter } from "next/navigation"
import Image from "next/image"
import Promo from  "@/components/Promo"

const Navbar = () => {
  const { data: session } = useSession()
  const user = session?.user

  const [dropdownMenu, setDropdownMenu] = useState(false)
  const admin = session?.user?.role

  const router = useRouter()

  const handleLogout = async () => {
    signOut({ callbackUrl: '/login' })
  }
 
  const  cartLogin = async () => {
    if (!session) {
      router.push("/login");
      return;
    }}

  const [query, setQuery] = useState('')
 
  const searchWork = async () => {
    router.push(`/search/${query}`)
  }

  const cart = user?.cart
  
  return (
    <main>
    
    <Promo />
    <div className='navbar'>
      
<div>
<Link href="/">
        <Image src='/logo.png' alt='logo' height={77} width={112} /> 
        
      </Link>
    
</div>

      <div className='navbar_search'>
        <input type='text' placeholder='Search...' value={query} onChange={(e) => setQuery(e.target.value)}/>
        <IconButton disabled={query === ""}>
          <Search sx={{ color: "red" }} onClick={searchWork}/>
        </IconButton>
      </div>

      <div className='navbar_right'>
      <a href="/login">

</a>
          <a href="/cart" className="cart" onClick={(e) => {
            e.stopPropagation();     
            cartLogin();
          }}>
            <ShoppingCart sx={{ color: "white" }}/>
            Cart <span>({cart?.length})</span>
          </a>
       
        <button className='navbar_right_account' onClick={() => setDropdownMenu(!dropdownMenu)}>
          
          {!user ? (
          <div className="person">   
          <Person sx={{ color: "white", fontSize: 25 }} /></div>
          ) : (<>
          <Menu sx={{ color: "white" }}/>
          <img src={user.profileImagePath} alt='profile' style={{ objectFit: "cover", borderRadius: "50%" }} />
          </>
          )}
        </button>


        {dropdownMenu && !user && (
          <div className='navbar_right_accountmenu'>
            <Link href="/login">Log In</Link>
            <Link href="/register">Sign Up</Link>
          </div>
        )}

        {dropdownMenu && user && (
          <div className='navbar_right_accountmenu'>
            <Link href="/wishlist">Wishlist</Link>
            <Link href="/cart">Cart</Link>
            <Link href="/order">Orders</Link>
            {admin === "admin" && <Link href="/create">Create</Link>}
            <a onClick={handleLogout}>Log Out</a>
          </div>
        )}

      </div>
      
    </div>
    </main>
  )
}

export default Navbar