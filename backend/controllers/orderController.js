import asyncHandler from 'express-async-handler'
import Order from '../models/orderModel.js'
import User from '../models/userModel.js'

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
          await order.save(function(err, doc) {
                if (err) return console.error(err);
                // console.log("Document inserted successfully!", doc);
                res.status(201).json(doc)
              })
        } catch (error) {
            console.error(error);
        }
   }
})

// @desc get order by id
// @route Get /api/orders/:id
// @access  private 

const getOrderById = asyncHandler(async (req, res) => {
   const order = await Order.findById(req.params.id).populate(
    'user',
    'name email',
    User
  )

   if(order) {
       res.json(order)
   } else {
       res.status(404)
       throw new Error('Order not found')
   }
 })


// @desc update order to paid
// @route Get /api/orders/:id/pay
// @access  private 

const updateOrderToPaid = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id)
 
    if(order) {
    order.isPaid =true
    order.paidAt = Date.now()
    order.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.payer.email_address
    }

    const updatedOrder = await order.save()

    res.json(updatedOrder)
    } else {
        res.status(404)
        throw new Error('Order not found')
    }
  })


// @desc get logged in  user orders
// @route Get /api/orders/myorders
// @access  private 

const getMyOrders = asyncHandler(async (req, res) => {
    console.log(req);

    const orders = await Order.find({ user: req.user._id})
    res.json(orders)
  })

  // @desc get all orders
// @route Get/api/orders
// @access  private / admin

const getOrders = asyncHandler(async (req, res) => {
    console.log(req);

    const orders = await Order.find({ }).populate('user', 'id  name')
    res.json(orders)
  })
 
export  {
    addOrderItems,
    getOrderById,
    updateOrderToPaid,
    getMyOrders,
    getOrders
}