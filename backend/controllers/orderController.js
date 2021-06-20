import asyncHandler from 'express-async-handler'
import Order from '../models/orderModel.js'

// @desc Create new order
// @route POST /api/orders 
// @access  private 

const addOrderItems = asyncHandler(async (req, res) => {
   const { orderItems, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice } = req.body
    
   if(orderItems && orderItems.length === 0) {
       res.status(400) 
       throw new Error('No order items')
   } else {
  
       const order = new Order({
        orderItems, 
        user: req.user._id, 
        shippingAddress, 
        paymentMethod, 
        itemsPrice, 
        taxPrice, 
        shippingPrice, 
        totalPrice
       })
        try {
            const createdOrder = await order.save(function(err, doc) {
                if (err) return console.error(err);
                console.log("Document inserted successfully!");
              })
            res.status(201).json(createdOrder)
        } catch (error) {
            console.error(error);
        }
   }
})

export  {
    addOrderItems
}