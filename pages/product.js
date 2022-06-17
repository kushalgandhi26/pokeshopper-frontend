import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Head from 'next/head';

function Product(props) {

  const router = useRouter();

  return (
    <div className='container mx-auto px-1'>
      <Head>
        <title>Products</title>
        <link rel="icon" href={props.icon} />
      </Head>
      
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap -m-4">
            {props.products.data.map((items) => {
              return (
                <div key={items.attributes.slug} className="xl:w-1/4 md:w-1/2 p-4 w-full">
                  <a className="block relative h-48 rounded overflow-hidden">
                    <img alt="ecommerce" className="object-cover object-center w-full h-full block" src={items.attributes.image} />
                  </a>
                  <div className="mt-4">
                    <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">{items.attributes.category}</h3>
                    <h2 className="text-gray-900 title-font text-lg font-medium">{items.attributes.title}</h2>
                    <p className="mt-1">₹{items.attributes.price}</p>
                    <div className='mt-3'>
                      <Link href={`/products/${items.attributes.slug}`}>
                        <button className="inline-flex items-center bg-red-600 border-0 py-1 px-3 text-white focus:outline-none hover:bg-gray-200 hover:text-black rounded text-base mt-2 md:mt-0">Buy Now
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}

export async function getServerSideProps(context) {
  const token = { Authorization: process.env.NEXT_TOKEN}
  let a = await fetch(`${process.env.NEXT_URL}api/products?populate=*`, { headers: token });
  let products = await a.json()
  return {
    props: { products },
  }
}

export default Product