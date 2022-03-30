import React, { useState } from 'react'
import styled from 'styled-components';
import FileUpload from '../../utils/FileUpload';

const Continents = [
  {key: 1, value: '아프리카'},
  {key: 2, value: '유럽'},
  {key: 3, value: '아시아'},
  {key: 4, value: '남아메리카'},
  {key: 5, value: '북아메리카'},
  {key: 6, value: '오스트레일리아'},
  {key: 7, value: '남극 대륙'}
]

const UploadProductPage = () => {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [price, setPrice] = useState('');
  const [continent, setContinent] = useState(1);


  return (
    <UploadWarp>
      <section className='flex-center flex-column'>
        <h1 className='mg-2'>여행 상품 업로드</h1>
        <form>
          <FileUpload/>
          <div className='flex-column'>
            <label>제목</label>
            <input
              type='text'
              required
              value={title}
              onChange={(e)=>setTitle(e.target.value)}
            />
            <label>내용</label>
            <textarea 
              value={desc}
              onChange={(e)=>setDesc(e.target.value)}
              required
              type='text'
            />
            <label>가격</label>
            <input
              placeholder='0'
              required
              type='number'
              value={price}
              onChange={(e)=>setPrice(e.target.value)}
            />
          </div>
          <select className='mg-1' value={continent} onChange={(e)=>setContinent(e.target.value)} >
            {Continents.map(Continent=>(
              <option key={Continent.key} value={Continent.key}>{Continent.value}</option>
            ))}
          </select>
          <button>작성하기</button>
        </form>
      </section>
    </UploadWarp>
  )
}

export default UploadProductPage

const UploadWarp = styled.main`
  section{
    max-width: 700px;
    margin: 0 auto;
  }

  form{
    width: 100%;
    label{
      margin-top: 1rem;
    }
    input, textarea{
      border: 1px solid lightgray;
      border-radius: 5px;
      padding: 5px 10px;
    }

    select{
      display: block;
    }
  }
`;