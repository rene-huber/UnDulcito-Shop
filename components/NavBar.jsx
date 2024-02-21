"use client"
import "@/styles/Navbar.scss"
import { Menu, Person, Search, ShoppingCart } from '@mui/icons-material'
import FavoriteIcon from '@mui/icons-material/Favorite';
import LogoutIcon from '@mui/icons-material/Logout';
import { IconButton } from '@mui/material'
import ListAltIcon from '@mui/icons-material/ListAlt';

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
        <input type='text' placeholder='Find your favorite cookies, cakes...' 
        className='navbar_search_input'
        value={query} onChange={(e) => setQuery(e.target.value)}/>
        
        <IconButton disabled={query === ""}>
          <Search sx={{ color: "red" }} onClick={searchWork}/>
        </IconButton>
      </div>

      <div className='navbar_right'>
      <Link href="/login">

</Link>
{user ? (
  <Link href="/cart" className="cart">
    <ShoppingCart sx={{ color: "white" }}/>
    Cart <span>({cart?.length})</span>
  </Link>
) : (
  <Link href="/login" className="cart">
    <ShoppingCart sx={{ color: "white" }}/>
    Cart <span>({cart?.length})</span>
  </Link>
)}

       
        <button className='navbar_right_account' onClick={() => setDropdownMenu(!dropdownMenu)}>
          
          {!user ? (
          <div className="person">   
          <Person sx={{ color: "white", fontSize: 25 }} /></div>
          ) : (<>
          <Menu sx={{ color: "white" }} id="hamburger"/>
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
            <Link href="/wishlist"><FavoriteIcon sx={{ color: "red" ,fontSize: 17, marginRight: 1}}/> Wishlist</Link>
            <Link href="/cart"><ShoppingCart sx={{ color: "red",fontSize: 17, marginRight: 1 }}/> Cart</Link>
            <Link href="/order"><ListAltIcon sx={{color: "red",fontSize: 17, marginRight: 1}}/> Orders</Link>
            {admin === "admin" && <Link href="/create">Create</Link>}
            <a onClick={handleLogout}><LogoutIcon sx={{color: "red",fontSize: 17, marginRight: 1}}/>Log Out</a>
          </div>
        )}

      </div>
      
    </div>
    </main>
  )
}

export default Navbar