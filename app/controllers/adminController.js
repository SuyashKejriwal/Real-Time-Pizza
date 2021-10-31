const Order=require('../models/Order')
const renderAdminOrderPage=(req,res)=>{
    console.log("Inside the admin orders page")
    Order.find({ status: { $ne: 'completed' }},null,{ sort: {'createdAt':-1 }}).
                 populate('customerId','-password').exec((err,orders)=>{
                    console.log(orders);
                    //check for AJAX call
                    if(req.xhr){
                        res.json(orders)
                    }else{
                        res.render('admin/orders')
                    }
                    
                 })
}

module.exports={
    renderAdminOrderPage
}