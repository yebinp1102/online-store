import React, { useEffect, useState } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import Card from '../../utils/Card'
import Meta from '../../utils/Meta'

function LandingPage() {
  
  const [products, setProducts] = useState([])
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(6);
  const [postSize, setPostSize] = useState(0)

  useEffect(()=>{

    let body = {
      skip,
      limit
    }
    getProducts(body);
  },[])

  const renderCards = products.map((product, idx)=>{
    return(
      <div key={idx} className='product'>
        <Card cover={<img src={`http://localhost:5000/${product.images[0]}`} />} />
        <Meta title={product.title}/>
      </div>
    )
  })

  const getProducts = (body) => {
    axios.post('/api/product/products' ,body)
      .then(res=>{
        if(res.data.success){
          if(body.loadMore){
            setProducts([...products, ...res.data.productInfo])
          }else{
            setProducts(res.data.productInfo)
          }
          setPostSize(res.data.postSize)
        }else alert('상품을 불러오는데 실패 했습니다.')
      })
  }

  const handleReadMore = () => {
    let skip =+ limit

    let body = {
      skip,
      limit,
      loadMore: true
    }

    getProducts(body);
    setSkip(skip)
  }

  return (
    <LandingWrap>
      <h2>어디든 여행을 떠나보세요!</h2>

      <div className='grid-3'>
        {renderCards}
      </div>

      {postSize >= limit && 
        <div className='btn-center'>
          <button onClick={handleReadMore}>더보기</button>
        </div>
      }

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