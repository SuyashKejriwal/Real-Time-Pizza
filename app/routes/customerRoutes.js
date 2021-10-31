const router=require('express').Router();
const auth=require('../middleware/auth')
const { 
    renderOrderPage
}=require('../controllers/orderController')
//base route-/customer
router.get('/orders',auth,renderOrderPage)

module.exports=router;