"use client"
import style from './navbar.module.css'
import { Menu, Person, Search, ShoppingCart } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import React, { useState } from 'react'
import { useRouter } from "next/navigation"
import Image from 'next/image'

const Navbar = () => {
  const { data: session } = useSession()
  const user = session?.user

  const [dropdownMenu, setDropdownMenu] = useState(false)

  const handleLogout = async () => {
    signOut({ callbackUrl: '/login' })
  }

  const [query, setQuery] = useState('')
 
  const router = useRouter()
  const searchWork = async () => {
    router.push(`/search/${query}`)
  }

  const cart = user?.cart
//   console.log(query, "query")
  return (
    <div className={style.navbar}>
 <Link href='/'>
              <Image src='/dancingbaby.gif' alt='logo' width={100} height={100} />
      </Link>

      <div className={style.navbar_search}>
        <input type='text' placeholder='Search...' value={query} onChange={(e) => setQuery(e.target.value)}/>
        <IconButton disabled={query === ""}>
          <Search sx={{ color: "red" }} onClick={searchWork}/>
        </IconButton>
      </div>

      <div className={style.navbar_right}>
        {user && (
          <Link href="/cart" className={style.cart}>
            <ShoppingCart sx={{ color: "gray" }}/>
            Cart <span>({cart?.length})</span>
          </Link>
        )}
        <button id='button' className={style.navbar_right_account} onClick={() => setDropdownMenu(!dropdownMenu)}>
          <Menu sx={{ color: "gray" }} />
          {!user ? (
            <Person sx={{ color: "gray" }} />
          ) : (
            <Image src={user.profileImagePath} alt='profile' style={{ objectFit: "cover", borderRadius: "50%" }} width={30} height={30} />
          )}
        </button>

        {dropdownMenu && !user && (
          <div className={style.navbar_right_accountmenu}>
            <Link href="/login">Log In</Link>
            <Link href="/register">Sign Up</Link>
          </div>
        )}

        {dropdownMenu && user && (
          <div className={style.navbar_right_accountmenu}>
            <Link href="/wishlist">Wishlist</Link>
            <Link href="/cart">Cart</Link>
            <Link href="/order">Orders</Link>
            <Link href={`/shop?id=${user._id}`}>Your Shop</Link>
            <Link href="/create-work">Sell Your Work</Link>
            <button onClick={handleLogout}>Log Out</button> 
          </div>
        )}

      </div>
      
    </div>
  )
}

export default Navbar