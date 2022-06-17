import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useState } from 'react'

const Cart = ({ showCart, setshowCart, cartproducts, total, removeFromCart, decreaseQTY,increaseQTY,loggedIn }) => {
  const router = useRouter()

  const handleCheckout = () => {
    setshowCart(false)
    if(loggedIn){
      router.push("/checkout")
    }else{
      router.push("/login")
    }
  }

  return (
    <div className="relative z-10" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">

      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">

            <div className="pointer-events-auto w-screen max-w-md">
              <div className="flex h-full flex-col overflow-hidden bg-white shadow-xl">
                <div className="flex-1 overflow-y-auto py-6 px-4 sm:px-6">
                  <div className="flex items-start justify-between">
                    <h2 className="text-lg font-medium text-gray-900" id="slide-over-title">Shopping cart</h2>
                    <div className="ml-3 flex h-7 items-center">
                      <button type="button" onClick={() => setshowCart(!showCart)} className="-m-2 p-2 text-gray-400 hover:text-gray-500">
                        <span className="sr-only">Close panel</span>

                        <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  <div className="mt-8">
                    <div className="flow-root">
                      <ul role="list" className="-my-6 divide-y divide-gray-200">
                        {Object.keys(cartproducts).length == 0 && <div>Cart is empty!!</div>}
                        {Object.keys(cartproducts).map((k) => {
                          return (
                            <li key={k} className="flex py-6">
                              <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                <img src={cartproducts[k].image} alt="Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt." className="h-full w-full object-cover object-center" />
                              </div>

                              <div className="ml-4 flex flex-1 flex-col">
                                <div>
                                  <div className="flex justify-between text-base font-medium text-gray-900">
                                    <h3>
                                      <a href="#"> {cartproducts[k].name} </a>
                                    </h3>
                                    <p className="ml-4">₹{cartproducts[k].price}</p>
                                  </div>
                                  {/* <p className="mt-1 text-sm text-gray-500">Salmon</p> */}
                                </div>
                                <div className="flex flex-1 items-end justify-between text-sm">
                                  {/* <p className="text-gray-500">Qty 1</p> */}
                                  <div className='flex border-2 items-center justify-center rounded border-red-400'>
                                    <button onClick={() => { decreaseQTY(k, cartproducts[k]) }} className='mr-1 px-2 w-8 border-r-2 border-red-400 hover:bg-red-400'>-</button>
                                    <div className='px-1'>{cartproducts[k].qty}</div>
                                    <button onClick={() => { increaseQTY(k, cartproducts[k]) }} className='ml-1 px-2 w-8 border-l-2 border-red-400 hover:bg-red-400'>+</button>
                                  </div>
                                  <div className="flex">
                                    <button type="button" onClick={() => { removeFromCart(k) }} className="font-medium text-red-600 hover:text-red-500">Remove</button>
                                  </div>
                                </div>
                              </div>
                            </li>
                          )
                        })}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                  <div className="flex justify-between text-base font-medium text-gray-900">
                    <p>Subtotal</p>
                    <p>₹{total}</p>
                  </div>
                  <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                  {total !== 0 && <div className="mt-6">
                    <button onClick={handleCheckout} className="flex w-full items-center justify-center rounded-md border border-transparent bg-red-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-red-700">Checkout</button>
                  </div>}
                  <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                    <p>
                      or <button onClick={() => { setshowCart(!showCart); router.push('/product') }} type="button" className="font-medium text-red-600 hover:text-red-500">Continue Shopping<span aria-hidden="true"> &rarr;</span></button>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}

export default Cart