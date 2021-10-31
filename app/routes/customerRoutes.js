const router=require('express').Router();
const auth=require('../middleware/auth')
const { 
    renderOrderPage,
    renderSingleOrderPage
}=require('../controllers/orderController')
//base route-/customer
//get -/customer/orders
router.get('/orders',auth,renderOrderPage)

//get -/customer/orders/:id
router.get('/orders/:id',auth,renderSingleOrderPage)
module.exports=router;