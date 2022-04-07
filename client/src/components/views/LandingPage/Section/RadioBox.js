import React, { useState } from 'react'
import styled from 'styled-components'

const RadioBox = ({lists, handleFilters}) => {
  const [clicked, setClicked] = useState(false)
  const [value, setValue] = useState(0)

  const handleChange = (e) => {
    setValue(e.target.value)
    handleFilters(e.target.value)
  }

  return (
    <BoxWrap className='mg-2'>
      <div className='main' onClick={()=>setClicked(!clicked)}>
        <span>가격</span>
        <span>{clicked ? "-" : "+"}</span>
      </div>
      
      {clicked ?      
        <ul value={value}>
          {lists.map((list)=>(
            <li key={list._id}>
              <input 
                type="radio" 
                value={list._id}
                checked={value == list._id ? true : false}
                onChange={handleChange}
              />
              <span>{list.name}</span>
            </li>
          ))}
        </ul> : 
        <>
        </>
      }

    </BoxWrap>
  )
}

export default RadioBox

const BoxWrap = styled.div`

  .main{
    display: flex;
    justify-content: space-between;
    padding: 10px 20px;
    background-color: #eee;
    cursor: pointer;
  }

  ul{
    border: 1px solid #ddd;
    border-radius: 0 0 5px 5px;
    padding: 15px;
    display: flex;
    flex-wrap: wrap;

    li{
      margin-right: 10px;
      display: flex;
      align-items: center;

      input{
        margin: 5px;
      }
    }
  }
  
`;