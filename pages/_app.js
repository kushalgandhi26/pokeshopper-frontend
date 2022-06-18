import '../styles/globals.css'
import NavBar from '../components/NavBar'
import { useState, useEffect } from 'react'
import Footer from '../components/Footer'
import Head from 'next/head'
import { useRouter } from 'next/router'
import NextNProgress from "nextjs-progressbar";
import Cart from '../components/Cart'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false

function MyApp({ Component, pageProps }) {
  <Head>
    <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0" />
  </Head>

  const router = useRouter();

  const [icon, seticon] = useState("")

  const [showCart, setshowCart] = useState(false)
  const [cartproducts, setcartproducts] = useState({ name: "", price: 0, image: "", qty: 0 })
  const [total, settotal] = useState(0)

  const [loggedIn, setLoggedIn] = useState(false)
  const [show, setshow] = useState(false)

  const [reloadKey, setreloadKey] = useState(1)

  const [position, setposition] = useState(0)

  useEffect(() => {
    seticon("https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Pok%C3%A9_Ball_icon.svg/2052px-Pok%C3%A9_Ball_icon.svg.png")
  }, [])


  useEffect(() => {
    const token = localStorage.getItem('jwt')
    if (token) {
      // setreloadKey(Math.random())
      setLoggedIn(true)
    }

    const handleRouteChangeComplete = () => {
      setposition(1)
    }
    router.events.on('routeChangeComplete', handleRouteChangeComplete)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query])

  useEffect(() => {
    try {
      if (localStorage.getItem("cart")) {
        setcartproducts(JSON.parse(localStorage.getItem("cart")))
        saveCart(JSON.parse(localStorage.getItem("cart")))
      }else{
        localStorage.setItem("cart",JSON.stringify({}))
      }
    } catch (error) {
      console.log(error)
      localStorage.clear()
    }
  }, [showCart])


  const handlelogout = () => {
    // setreloadKey(Math.random())
    setLoggedIn(false)
    localStorage.removeItem('jwt')
    localStorage.removeItem('name')
    localStorage.removeItem('email')
  }

  const saveCart = (product) => {
    localStorage.setItem("cart", JSON.stringify(product))
    let t = 0;
    let listOfProductKey = Object.keys(product)
    for (let i = 0; i < listOfProductKey.length; i++) {
      t = t + (product[listOfProductKey[i]].price) * product[listOfProductKey[i]].qty
    }
    settotal(t)
  }

  const addToCart = (id, product) => {
    let newCart = cartproducts
    newCart[id] = product
    setcartproducts(newCart)
    saveCart(newCart)
    setshowCart(true)
  }

  const removeFromCart = (id) => {
    let newCart = cartproducts
    delete newCart[id]
    setcartproducts(newCart)
    saveCart(newCart)
  }

  const increaseQTY = (id, product) => {
    let newCart = cartproducts
    newCart[id].qty = product.qty + 1
    setcartproducts(newCart)
    saveCart(newCart)
  }

  const decreaseQTY = (id, product) => {
    let newCart = cartproducts
    newCart[id].qty = product.qty - 1
    if (newCart[id].qty <= 0) {
      removeFromCart(id)
    } else {
      setcartproducts(newCart)
      saveCart(newCart)
    }
  }

  const clearCart = () => {
    setcartproducts([])
  }

  return <>
    {showCart && <Cart showCart={showCart} setshowCart={setshowCart} cartproducts={cartproducts} total={total} removeFromCart={removeFromCart} addToCart={addToCart} decreaseQTY={decreaseQTY} increaseQTY={increaseQTY} loggedIn={loggedIn} />}
    <NextNProgress color='#e60000' startPosition={position} stopDelayMs={400} />
    <NavBar show={show} setshow={setshow} showCart={showCart} setshowCart={setshowCart} key={reloadKey} logout={handlelogout} loggedIn={loggedIn} /> <Component icon={icon} total={total} settotal={settotal} loggedIn={loggedIn} addToCart={addToCart} clearCart={clearCart} {...pageProps} /> <Footer />
  </>
}

export default MyApp
