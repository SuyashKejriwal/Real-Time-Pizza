const router=require('express').Router();
const {renderCartPage} = require('../controllers/initController')
const {updateCartPage} = require('../controllers/cartController')

//base route-/cart
router.get('/',renderCartPage);

router.post('/update-cart',updateCartPage);

module.exports=router;