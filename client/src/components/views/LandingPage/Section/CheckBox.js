import React, { useState } from 'react'
import styled from 'styled-components'

const CheckBox = ({lists, handleFilters}) => {
  const [clicked, setClicked] = useState(false)
  const [checked, setChecked] = useState([])

  const checkList = lists.map((list)=>{
    return(
      <li>
        <input value={list.name} type='checkbox' />
        {list.name}
      </li>
    )
  })

  const handleToggle = (idx) => {
    const currentIdx = checked.indexOf(idx)
    const newChecked = [...checked]
    if(currentIdx === -1) newChecked.push(idx)
    else newChecked.splice(currentIdx, 1)
    setChecked(newChecked)
    handleFilters(newChecked)
  }

  return (
    <BoxWrap className='mg-2'>
      <div className='main' onClick={()=>setClicked(!clicked)}>
        <span>지역</span>
        <span>{clicked ? "-" : "+"}</span>
      </div>
      
      {clicked ?      
        <ul>
          {lists.map((list)=>(
            <li key={list._id}>
              <input 
                type="checkbox" 
                checked={checked.indexOf(list._id) === -1 ? false : true} 
                onChange={()=>handleToggle(list._id)} 
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

export default CheckBox

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