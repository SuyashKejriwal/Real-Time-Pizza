const Order=require('../models/Order');
const updateOrderStatus=(req,res)=>{
    Order.updateOne({_id:req.body.orderId},{status: req.body.status },(err,data)=>{
        
        return res.redirect('/admin/orders')
    })
}

module.exports={updateOrderStatus}