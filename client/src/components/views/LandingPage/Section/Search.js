import React, { useState } from 'react'
import styled from 'styled-components'
import {FaSearch} from 'react-icons/fa'

const Search = ({refreshFunction}) => {
  const [searchWord, setSearchWord] = useState('');

  const handleSearch = (e) => {
    setSearchWord(e.target.value);
    refreshFunction(e.target.value)
  }

  return (
    <SearchWrap>
      <FaSearch/>
      <input
        placeholder='무엇을 찾으세요?'
        onChange={handleSearch}
        value={searchWord}
      /> 
    </SearchWrap>
  )
}

export default Search

const SearchWrap = styled.div`
  width: 300px;
  margin-bottom: 30px;
  border: 1px solid #ddd;
  padding: 8px 10px;
  border-radius: 5px;
  display: flex;
  align-itmes: center;

  svg{
    margin-top: 3px;
    color: gray;
  }
  input{
    margin-left: 5px;
    border: none;
    font-size: 13px;
  }
`;