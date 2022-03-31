import React, { useState } from 'react'
import Dropzone from 'react-dropzone'
import styled from 'styled-components'
import axios from 'axios';

const FileUpload = (props) => {
  
  const [images, setImages] = useState([]);
  
  const handleDrop = (files) => {
    // formData에는 업로드 할 이미지(=파일)에 대한 정보를 담고 있음
    let formData = new FormData();
    const config = {
      // 파일 업로드 요청을 보낼 때, header의 컨텐츠 타입은 multipart/form-data
      // 자세한 내용 : https://lena-chamna.netlify.app/post/http_multipart_form-data/
      header: {'content-type' : 'multipart/form-data'}
    }
    formData.append('file', files[0])
    axios.post('/api/product/image', formData, config)
      .then(res=>{
        if(res.data.success){
          setImages([...images, res.data.filePath])
          props.refreshFunction([...images, res.data.filePath])
        }else{
          alert('파일 업로드에 실패 했습니다.')
        }
      })
  }

  const handleDelete = (image) => {
    const currentIndex = images.indexOf(image)
    let newImages = [...images]
    newImages.splice(currentIndex, 1)
    setImages(newImages);
    props.refreshFunction(newImages)
  }

  return (
    <FileWrap>
      <Dropzone onDrop={handleDrop}>
        {({getRootProps, getInputProps}) => (
          <section>
            <div className='flex-center imageBox' {...getRootProps()}>
              <input {...getInputProps()} />
              <p>+</p>
            </div>
          </section>
        )}
      </Dropzone>
      <ImageWrap>
        {images.map((image, idx)=>(
          <div onClick={()=>handleDelete(image)} key={idx}>
            <img src={`http://localhost:5000/${image}`}></img>
          </div>
        ))}
      </ImageWrap>
    </FileWrap>
  )
}

export default FileUpload

const FileWrap = styled.article`
  display: flex;
  justify-content: space-between;

  .imageBox{
    width: 300px;
    height: 240px;
    border: 1px solid lightgray;

    p{
      margin-bottom: 15px;
      font-size: 3rem;
    }
  }
  
  .imageBox:hover{
    cursor:pointer;
  }
`;

const ImageWrap = styled.div`
  display: flex;
  width: 350px;
  height: 240px;
  overflow-x: scroll;

  img{
    min-width: 300px;
    width: 300px;
    height: 240px;
  }
`;