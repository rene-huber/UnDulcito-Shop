"use client";
import React, { useState } from 'react'
import { IconButton } from '@mui/material'
import { Search } from '@mui/icons-material'
import { useRouter } from "next/navigation"

function Searching() {
    const [query, setQuery] = useState('')
    const router = useRouter()
  
    const searchWork = () => {
      router.push(`/search/${query}`)
    }
  return (
    <div>
         <div className='navbar_search'>
        <input type='text' placeholder='Find your favorite cookies' value={query} onChange={(e) => setQuery(e.target.value)}/>
        <IconButton disabled={query === ""}>
          <Search sx={{ color: "red" }} onClick={searchWork}/>
        </IconButton>
      </div>
    </div>
  )
}

export default Searching