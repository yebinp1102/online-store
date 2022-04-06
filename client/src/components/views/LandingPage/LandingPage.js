import React, { useEffect, useState } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import Card from '../../utils/Card'
import Meta from '../../utils/Meta'

function LandingPage() {
  
  const [products, setProducts] = useState([])

  useEffect(()=>{
    axios.get('/api/product/products')
      .then(res=>{
        if(res.data.success){
          setProducts(res.data.productInfo)
        }else{
          alert('글 불러오는 데 실패 했습니다.')
        }
      })
  },[])

  const renderCards = products.map((product, idx)=>{
    return(
      <div className='product'>
        <Card key={idx} cover={<img src={`http://localhost:5000/${product.images[0]}`} />} />
        <Meta title={product.title}/>
      </div>
    )
  })



  return (
    <LandingWrap>
      <h2>어디든 여행을 떠나보세요!</h2>

      <div className='grid-3'>
        {renderCards}
      </div>

      <div className='btn-center'>
        <button>더보기</button>
      </div>
    </LandingWrap>
  )
}

export default LandingPage

const LandingWrap = styled.section`
  margin: 3rem auto;
  max-width: 1200px;
  padding: 30px;
  
  h2{
    text-align: center;
  }

  .product{
    border: 1px solid #ddd;
    border-radius: 5px;
  }

  .btn-center{
    margin-top: 50px;
    display: flex;
    justify-content: center;
  }
`;