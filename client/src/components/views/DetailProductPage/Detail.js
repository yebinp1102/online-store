import React, { useEffect } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { useParams } from 'react-router-dom'

const Detail = () => {

  const {productId} = useParams();

  useEffect(()=>{
    axios.get(`/api/product/products_by_id?id=${productId}&type=single`)
      .then(res=>{
        if(res.data.success){
          console.log(res.data)
        }else{
          alert('상품 상세 정보를 가져오는 데 실패 했습니다.')
        }
      })
  },[])

  return (
    <div>Detail</div>
  )
}

export default Detail