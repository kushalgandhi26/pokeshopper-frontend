import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCartShopping} from "@fortawesome/free-solid-svg-icons";

function NavBar({ loggedIn, logout, setshowCart, show, setshow }) {
    const router = useRouter()

    const handlelogout = () => {
        setshow(false)
        logout()
        router.push('/')
    }

    return (
        <header className="text-gray-600 body-font bg-red-800">
            <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
                <Link href="/"><a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
                    <img src={process.env.NEXT_LOGO} width={43}></img>
                    <span className="ml-3 text-xl cursor-pointer text-cyan-50">PokéShopper</span>
                </a></Link>
                <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
                    <Link href='/'><a className="mr-5 hover:text-gray-300 text-cyan-50">Home</a></Link>
                    <Link href='/product'><a className="mr-5 hover:text-gray-300 text-cyan-50">Products</a></Link>
                    {/* <Link href='/about'><a className="mr-5 hover:text-gray-300 text-cyan-50">About</a></Link> */}
                    <Link href='/contact'><a className="mr-5 hover:text-gray-300 text-cyan-50">Contact Us</a></Link>
                    {/* <Link href='/checkout'><a className="mr-5 text-cyan-50">Cart({cart.length})</a></Link> */}
                    <a className="mr-5 pt-1 text-cyan-50"><FontAwesomeIcon style={{fontSize:25}} onClick={() => setshowCart(true)} icon={faCartShopping} className="cursor-pointer hover:text-gray-300" /></a>
                </nav>

                {!loggedIn && <button onClick={() => { router.push('/login') }} className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">Login
                    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-1" viewBox="0 0 24 24">
                        <path d="M5 12h14M12 5l7 7-7 7"></path>
                    </svg>
                </button>}



                {loggedIn && <div onClick={() => setshow(!show)} onMouseOver={() => setshow(true)} className="relative inline-block text-left mt-2 md:mt-1">
                    <div className="flex -space-x-2 cursor-pointer" id="menu-button" aria-expanded="true" aria-haspopup="true">
                        <img className="inline-block h-10 w-10 rounded-full ring-2 ring-white" src="https://www.squareinfosoft.com/wp-content/uploads/2019/11/avatar-default.png" alt="" />
                    </div>

                    {show && <div className="origin-top-right absolute right-0 mt-2 w-28 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1">
                        <div onClick={handlelogout} onMouseOver={() => setshow(true)} onMouseOut={() => setshow(false)} className="py-1 cursor-pointer">
                            <button className="text-gray-700 block w-full text-left px-4 py-2 text-sm hover:bg-slate-100" role="menuitem" tabIndex="-1" id="menu-item-3">Sign out</button>
                        </div>
                    </div>}
                </div>}
            </div>
        </header>
    )
}

export default NavBar