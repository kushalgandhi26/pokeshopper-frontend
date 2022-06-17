import React from 'react'
import { useEffect, useState } from 'react'
import Script from 'next/script'
import Head from 'next/head'

const Checkout = ({ icon,total }) => {
    const [form, setform] = useState({ name: "", email: "" })

    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: [e.target.value] })
    }

    useEffect(() => {
        if (localStorage.getItem('name') && localStorage.getItem('email')) {
            setform({ name: localStorage.getItem('name'), email: localStorage.getItem('email') })
        }
    }, [])


    // const submit = async () => {
    //     let orderId = Math.floor(1000000 * Math.random())
    //     let url = `${process.env.NEXT_URL}/api/orders/pretransaction`
    //     const rawresponse = await fetch(url, {
    //         method: 'POST',
    //         body: JSON.stringify({ orderid: orderId, amount: total })
    //     });
    //     const content = await rawresponse.json();

    //     var config = {
    //         "root": "",
    //         "flow": "DEFAULT",
    //         "data": {
    //             "orderId": orderId, /* update order id */
    //             "token": content.body.txnToken, /* update token value */
    //             "tokenType": "TXN_TOKEN",
    //             "amount": total /* update amount */
    //         },
    //         "handler": {
    //             "notifyMerchant": function (eventName, data) {
    //                 console.log("notifyMerchant handler function called");
    //                 console.log("eventName => ", eventName);
    //                 console.log("data => ", data);
    //             }
    //         }
    //     };

    //     if (window.Paytm && window.Paytm.CheckoutJS) {
    //         // initialze configuration using init method 
    //         window.Paytm.CheckoutJS.init(config).then(function onSuccess() {
    //             // after successfully updating configuration, invoke JS Checkout
    //             window.Paytm.CheckoutJS.invoke();
    //         }).catch(function onError(error) {
    //             console.log("error => ", error);
    //         });
    //     }
    // }

    return (
        <div>
            <Head>
                <title>Checkout</title>
                <link rel="icon" href={icon} />
            </Head>
            {/* <Script type="application/javascript" crossorigin="anonymous" src={`https://securegw.paytm.in/merchantpgpui/checkoutjs/merchants/${process.env.NEXT_PUBLIC_MID}.js`}> </Script> */}
            <div className='container mx-auto px-1'>
                <section className="text-gray-600 body-font">
                    <div className="container px-5 py-24 mx-auto min-h-screen">
                        <div className="flex flex-col w-full mb-12">
                            <h1 className="sm:text-4xl text-2xl font-medium title-font mb-4 text-gray-900">Checkout</h1>
                            <div className="text-lg text-gray-800 font-normal">Subtotal: {total}</div>
                        </div>
                        <div className="lg:w-1/2 md:w-2/3">
                            <div className="flex flex-wrap -m-2">
                                <div className="p-2 w-1/2">
                                    <div className="relative">
                                        <label htmlFor="name" className="leading-7 text-sm text-gray-600">Name</label>
                                        <input onChange={handleChange} value={form.name} type="text" id="name" name="name" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-red-500 focus:bg-white focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                    </div>
                                </div>
                                <div className="p-2 w-1/2">
                                    <div className="relative">
                                        <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email</label>
                                        <input onChange={handleChange} value={form.email} type="email" id="email" name="email" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-red-500 focus:bg-white focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                    </div>
                                </div>
                                <div className="p-2 w-1/2">
                                    <div className="relative">
                                        <label htmlFor="phone" className="leading-7 text-sm text-gray-600">Phone No.</label>
                                        <input onChange={handleChange} value={form.phone} type="phone" id="phone" name="phone" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-red-500 focus:bg-white focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                    </div>
                                </div>
                                <div className="p-2 w-full">
                                    <div className="relative">
                                        <label htmlFor="address" className="leading-7 text-sm text-gray-600">Address</label>
                                        <textarea onChange={handleChange} value={form.address} id="address" name="address" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-red-500 focus:bg-white focus:ring-2 focus:ring-red-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"></textarea>
                                    </div>
                                </div>
                                <div className="p-2 w-full">
                                    <button className="flex mx-auto text-white bg-red-500 border-0 py-2 px-8 focus:outline-none hover:bg-red-600 rounded text-lg">Pay Now</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default Checkout