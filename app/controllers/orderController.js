const Order=require('../models/Order');
const moment=require('moment')
const Stripe=require('stripe')
const stripe=Stripe(process.env.STRIPE_PRIVATE_KEY);
const postOrder=(req,res)=>{
    console.log(req.body);
    console.log(process.env.STRIPE_PRIVATE_KEY);
    //Validate request 
    const {phone,address,stripeToken,paymentType}=req.body;
    if(!phone||!address){
        return res.status(422).json({message: 'All fields are required'});
    }

    const order=new Order({
        customerId: req.user._id,
        items:req.session.cart.items,
        phone,
        address
    })

    order.save().then(result=> {
        Order.populate(result,{path: 'customerId' },(err,placedOrder)=> {
        //req.flash('success','Order placed successfully');

        //Stripe payment
        if(paymentType==='card'){
            stripe.charges.create({
                amount:req.session.cart.totalPrice *100, //in paisa
                source:stripeToken,
                currency:'inr',
                description:`Pizza order: ${placedOrder._id}`
            }).then(()=>{
                placedOrder.paymentStatus=true;
                placedOrder.save().then((ord)=>{
                console.log(ord);

                //Emit
                const eventEmitter=req.app.get('eventEmitter');
                eventEmitter.emit('orderPlaced',ord);
                delete req.session.cart
                return res.json({message: 'Payment sucessful, Order placed successfully'})

                }).catch((err)=>{
                    console.log(err);
                })

            }).catch((err)=>{
                console.log(err);
                delete req.session.cart;
                return res.json({message:'OrderPlaced but payment failed, You can pay at delivery time'});
            })
        }

       
        delete req.session.cart

         //Emit
         const eventEmitter=req.app.get('eventEmitter');
         eventEmitter.emit('orderPlaced',placedOrder);
         
        return res.json({message: 'Order placed successfully in COD mode'})
        
        //return res.redirect('/customer/orders');
        })
        
    }).catch(err=>{
      return res.status(500).json({message: 'Something went wrong' });
    
    })
}

const renderOrderPage=async (req,res)=>{
    const orders=await Order.find({customerId: req.user._id},
        null,
        {sort: {'createdAt':-1 }})
   
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