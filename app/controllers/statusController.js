const Order=require('../models/Order');
const updateOrderStatus=(req,res)=>{
    Order.updateOne({_id:req.body.orderId},{status: req.body.status },(err,data)=>{
        
        //Emit event
        const eventEmitter=req.app.get('eventEmitter');
        eventEmitter.emit('orderUpdated',{id: req.body.orderId, status: req.body.status })
        return res.redirect('/admin/orders')
    })
}

module.exports={updateOrderStatus}