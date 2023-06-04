import React from 'react'
import product from '../sanity_ecommerce/schemas/product';

import {client} from '../lib/client';
import {Product, FooterBanner, HeroBanner} from '../components';

const Home = ({products, bannerData}) => (
  <div>
    <HeroBanner heroBanner = {bannerData.length && bannerData[0]}/>
    <div className = "products-heading">
      <h2>Best selling Product</h2>
      <p>Speakers of many variations</p>      
    </div>
    
    <div className = "products-container">
      {products?.map((product) => <Product key= {product._id} product={product}/>)}
    </div>

    <FooterBanner FooterBanner={bannerData && bannerData[0]}/>
  </div>
);

export const getServerSideProps = async () => {
  const query = `*[_type == "product"]`;     //grab all products from sanity dashboard
  const products = await client.fetch(query);

  const bannerQuery = `*[_type == "banner"]`;     //grab all bannerinfo from sanity dashboard
  const bannerData = await client.fetch(bannerQuery);

  return {
    props:{products, bannerData}
  }
}

export default Home;