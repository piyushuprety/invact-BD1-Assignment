const express = require('express');
const { resolve } = require('path');
const cors = require('cors');
const { getDataFromParam } = require('./utils');


const app = express();
app.use(cors());

const port = 3000;
let taxRate = 0.05; //5%
let discountPercentage = 0.1; //10%
let royaltyRate = 2  // 2 points -> $1
app.use(express.static('static'));


app.get('/cart-total', (req, res)=>{
  const newItemPrice = getDataFromParam(req, 'newItemPrice', 'float')
  const cartTotal = getDataFromParam(req, 'cartTotal', 'float')
  res.send( String(newItemPrice + cartTotal ))
})

app.get('/membership-discount', (req, res)=>{
  const cartTotal = getDataFromParam(req, 'cartTotal', 'float')
  const isMember = getDataFromParam(req, 'isMember')
  let discountedPrice = cartTotal;

  if(isMember === 'true'){
    discountedPrice = cartTotal - (cartTotal * discountPercentage)
  }
  res.send(String(discountedPrice))
})

app.get('/calculate-tax', (req, res)=>{
  const cartTotal = getDataFromParam(req, 'cartTotal', 'float')
  res.send(String(cartTotal * taxRate))
})

app.get('/estimate-delivery', (req, res)=>{
  const shippingMethod = getDataFromParam(req , 'shippingMethod')
  const distance = getDataFromParam(req , 'distance', 'float')
  let etaInDays = 0

  if(shippingMethod === 'standard'){
   if(distance % 50 === 0){
     etaInDays = distance / 50;
   }
   else{
     etaInDays = parseInt(distance / 50) + 1
   }
  }
  else if(shippingMethod === 'express'){
    if(distance % 100 === 0){
      etaInDays = distance / 100;
    }
    else{
      etaInDays = parseInt(distance / 100) + 1
    }
  }
  res.send(String(etaInDays)) 
})

app.get('/shipping-cost', (req, res)=>{
  const weight = getDataFromParam(req, 'weight', 'float')
  const distance = getDataFromParam(req, 'distance', 'float')
  res.send(String(weight * distance * 0.1))
})

app.get('/loyalty-points', (req, res)=>{
  const purchaseAmount = getDataFromParam(req, 'purchaseAmount', 'float')
  res.send(String(purchaseAmount*royaltyRate))
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
