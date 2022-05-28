import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose';
import cors from 'cors'
import path from 'path';
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser';
import productRoute from './routes/product.js'
import userRoute from './routes/users.js'

const app = express();
dotenv.config()

const connect = async () => {
  try{
    await mongoose.connect(process.env.MONGO)
    console.log('데이터베이스에 성공적으로 연결 되었습니다!')
  }catch(err){
    console.log(err)
  }
}

mongoose.connection.on("disconnected", ()=>{
  console.log('몽고 DB 연결에 실패 했습니다.')
})

app.use(cors());
app.use(bodyParser.json());
app.use(express.json())
app.use(cookieParser());

// routes
app.use('/api/users', userRoute);
app.use('/api/product', productRoute);

// 미들웨어
app.use((err, req, res, next) => {
  const errorStatus = err.status || 500
  const errorMessage = err.message || "에러가 발생 했습니다."
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack
  })
})

// app.use('/uploads', express.static('uploads'));

// Serve static assets if in production
// if (process.env.NODE_ENV === "production") {
//   // Set static folder   
//   // All the javascript and css files will be read and served from this folder
//   app.use(express.static("client/build"));

//   // index.html for all page routes    html or routing and naviagtion
//   app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "../client", "build", "index.html"));
//   });
// }

app.listen(5000, () => {
  connect()
  console.log('서버에 성공적으로 연결 되었습니다!')
});