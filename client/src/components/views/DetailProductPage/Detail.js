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
        if(res.data.success){
          console.log(res.data)
          setProduct(res.data.product[0])
        }else{
          alert('상품 상세 정보를 가져오는 데 실패 했습니다.')
        }
      })
  },[])

  return (
    <DetailWrap>
      <div className='container'>

        <h1>{product.title}</h1>

        <div className='grid-2 pd-2'>
          <ProductImage detail={product} />
          <ProductInfo />
        </div>

      </div>
    </DetailWrap>
  )
}

export default Detail

const DetailWrap = styled.section`

`;