const Order=require('../models/Order');
const moment=require('moment')
const postOrder=(req,res)=>{
    //console.log(req.body);

    //Validate request 
    const {phone,address}=req.body;
    if(!phone||!address){
        req.flash('error','All fields are required');
        return res.redirect('/cart');
    }

    const order=new Order({
        customerId: req.user._id,
        items:req.session.cart.items,
        phone,
        address
    })

    order.save().then(result=> {
        Order.populate(result,{path: 'customerId' },(err,placedOrder)=> {
        req.flash('success','Order placed successfully');
        delete req.session.cart

        //Emit
        const eventEmitter=req.app.get('eventEmitter');
        eventEmitter.emit('orderPlaced',placedOrder);
        return res.redirect('/customer/orders');
        })
        
    }).catch(err=>{
        req.flash('error','Someting went wrong');
        return res.redirect('/cart');
    })
}

const renderOrderPage=async (req,res)=>{
    const orders=await Order.find({customerId: req.user._id},
        null,
        {sort: {'createdAt':-1 }})
   console.log(orders);
   res.header('Cache-Control', 'no-store')
    return res.render('customers/orders',{
        orders,
        moment
    })
}

const renderSingleOrderPage=async (req,res)=>{
    const order= await Order.findById(req.params.id)

    //Autherize user
    //for object to object comparison fist convert it into string
    if(req.user._id.toString()===order.customerId.toString()){
       return res.render('customers/singleOrder',{order})
    }

    return res.redirect('/');
}

module.exports={
    postOrder,
    renderOrderPage,
    renderSingleOrderPage
}