import Product from "../models/Product.js";
import multer from "multer";

const storage = multer.diskStorage({
  // destination : 파일이 저장 될 위치
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`)
  }
})
const upload = multer({ storage: storage }).single("file")

export const postImage = async (req, res, next) => {
  try{
    upload(req, res, err => {
      if(err){
        return res.json({success: false, err})
      }
      return res.json({success: true, filePath: res.req.file.path, fileName: res.req.file.filename})
    })
  }catch(err){
    next(err)
  }
}

export const saveProduct =  async (req, res, next) => {
  try{
    const product = new Product(req.body)
    product.save((err)=>{
      if(err) return res.status(400).json({success: false, err})
      return res.status(200).json({success: true})
    });
  }catch(err){
    next(err)
  }
}

export const getProducts = async (req, res, next) => {
  try{
    let limit = req.body.limit ? parseInt(req.body.limit) : 20;
    let skip = req.body.skip ? parseInt(req.body.skip) : 0;
    let word = req.body.searchWord;
    let findArgs = {}
    for(let key in req.body.filters){
      if(req.body.filters[key].length > 0){
        if(key === "price"){
          findArgs[key] = {
            $gte: req.body.filters[key][0],
            $lte: req.body.filters[key][1],
          }
        }else{
          findArgs[key] = req.body.filters[key];
        }
      }
    }
    if(word){
      Product.find(findArgs)
        .find({$text: {$search: word}})
        .populate('writer')
        .skip(skip)
        .limit(limit)
        .exec((err, productInfo)=>{
          if(err) return res.status(400).json({success: false, err})
          return res.status(200).json({success: true, productInfo, postSize: productInfo.length})
        })
    }else{
      Product.find(findArgs)
      .populate('writer')
      .skip(skip)
      .limit(limit)
      .exec((err, productInfo)=>{
        if(err) return res.status(400).json({success: false, err})
        return res.status(200).json({success: true, productInfo, postSize: productInfo.length})
      })
    }
  }catch(err){
    next(err)
  }
}

export const getProductsById = async (req, res, next) => {
  try{
    let type = req.query.type
    let productIds = req.query.id
    if(type === "array"){
      let ids = req.query.id.split(',')
      productIds = ids.map(item=>{
        return item
      })
    }
    Product.find({_id: { $in: productIds }})
      .populate('writer')
      .exec((err, product)=>{
        if(err) return res.status(400).json(err)
        return res.status(200).send(product)
    })
  }catch(err){
    next(err)
  }
}