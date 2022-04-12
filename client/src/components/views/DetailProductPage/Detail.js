import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import ProductImage from './Section/ProductImage'
import ProductInfo from './Section/ProductInfo'

const Detail = () => {
  const {productId} = useParams();
  const [product, setProduct] = useState({})

  useEffect(()=>{
    axios.get(`/api/product/products_by_id?id=${productId}&type=single`)
      .then(res=>{
        setProduct(res.data[0])
      })
      .catch(err=>alert(err))
  },[])

  return (
    <DetailWrap>
      <div className='container'>

        <h1 className='mg-2'>{product.title}</h1>

        <div className='grid-2 pd-2'>
          <ProductImage detail={product} />
          <ProductInfo detail={product}/>
        </div>

      </div>
    </DetailWrap>
  )
}

export default Detail

const DetailWrap = styled.section`
  .mg-2{
    text-align: center;
  }
`;