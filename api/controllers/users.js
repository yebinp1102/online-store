import User from "../models/User.js";
import Product from "../models/Product.js";

export const register = async (req, res, next) => {
  try{
    const user = new User(req.body);
    user.save((err, doc) => {
      if (err) return res.json({ success: false, err });
      return res.status(200).json({
          success: true
      });
    });
  }catch(err){
    next(err)
  }
}

export const login = async (req, res, next) => {
  try{
    User.findOne({ email: req.body.email }, (err, user) => {
      if (!user)
        return res.json({
          loginSuccess: false,
          message: "Auth failed, email not found"
      });
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch)
        return res.json({ loginSuccess: false, message: "Wrong password" });
    user.generateToken((err, user) => {
      if (err) return res.status(400).send(err);
        res.cookie("w_authExp", user.tokenExp);
        res
          .cookie("w_auth", user.token)
          .status(200)
          .json({
            loginSuccess: true, userId: user._id
          });
        });
      });
    });
  }catch(err){
    next(err)
  }
}

export const logout = async (req, res, next) => {
  try{
    User.findOneAndUpdate({ _id: req.user._id }, { token: "", tokenExp: "" }, (err, doc) => {
      if (err) return res.json({ success: false, err });
      return res.status(200).send({
        success: true
      });
    });
  }catch(err){
    next(err)
  }
}

export const addToCart = async (req, res, next) => {
  try{
    User.findOne({ _id: req.user._id },
      (err, userInfo) => {
        let duplicate = false;
        userInfo.cart.forEach((item) => {
          if (item.id === req.body.productId) {
            duplicate = true;
          }
        })
        if (duplicate) {
          User.findOneAndUpdate(
            { _id: req.user._id, "cart.id": req.body.productId },
            { $inc: { "cart.$.quantity": 1 } },
            { new: true },
            (err, userInfo) => {
              if (err) return res.status(200).json({ success: false, err })
              res.status(200).send(userInfo.cart)
            }
          )
        }
        else {
          User.findOneAndUpdate(
            { _id: req.user._id },
            {
              $push: {
                cart: {
                  id: req.body.productId,
                  quantity: 1,
                  date: Date.now()
                }
              }
            },
            { new: true },
            (err, userInfo) => {
              if (err) return res.status(400).json({ success: false, err })
              res.status(200).send(userInfo.cart)
            }
          )
        }
      })
  }catch(err){
    next(err)
  }
}

export const removeFromCart = async (req, res, next) => {
  try{
    User.findOneAndUpdate(
      { _id: req.user._id },
      {
        "$pull":
          { "cart": { "id": req.query.id } }
      },
      { new: true },
      (err, userInfo) => {
        let cart = userInfo.cart;
        let array = cart.map(item => {
          return item.id
        })
        Product.find({ _id: { $in: array } })
          .populate('writer')
          .exec((err, productInfo) => {
            return res.status(200).json({
              productInfo,
              cart
            })
          })
      }
    )
  }catch(err){
    next(err)
  }
}