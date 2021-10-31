const router=require('express').Router();
const { renderAdminOrderPage }=require('../controllers/adminController')
const { updateOrderStatus }=require('../controllers/statusController')
const auth=require('../middleware/auth')
const admin=require('../middleware/admin')
//base route-/admin

//get - /admin/orders
router.get('/orders',admin,renderAdminOrderPage);

//post- /admin/order/status
router.post('/order/status',updateOrderStatus);


module.exports=router;