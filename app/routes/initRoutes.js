const router=require('express').Router();
const {renderHomePage,
       renderLoginPage,
       renderRegisterPage
}=require('../controllers/initController')
const {
       postRegister,
       postLogin,
       postLogout
}=require('../controllers/authController')
const {
       postOrder
}=require('../controllers/orderController')
const guest=require('../middleware/guest')
const auth=require('../middleware/auth')

//base route - "/"
router.get('/',renderHomePage);

router.get('/login',guest,renderLoginPage);

router.get('/register',guest,renderRegisterPage);

router.post('/register',postRegister);

router.post('/login',postLogin);

router.post('/logout',postLogout);

router.post('/orders',auth,postOrder);

module.exports=router;