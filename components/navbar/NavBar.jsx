"use client"import style from './navbar.module.css'
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

  const [query, setQuery] = useState('')
  const router = useRouter()

  const handleLogout = async () => {
    signOut({ callbackUrl: '/login' })
  }

  const searchWork = async () => {
    router.push(`/search/${query}`)
  }

  const cart = user?.cart

  return (
    <div className={style.navbar}>
      <Link href='/'>
        <Image src='/logo.png' alt='logo' width={200} height={70} />
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

        ...

      </div>
    </div>
  )
}

export default Navbar
