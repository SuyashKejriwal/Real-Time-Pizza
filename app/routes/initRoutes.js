const router=require('express').Router();
const {renderHomePage,
       renderLoginPage,
       renderRegisterPage
}=require('../controllers/initController')
const {
       postRegister,
       postLogin
}=require('../controllers/authController')

//base route - "/"
router.get('/',renderHomePage);

router.get('/login',renderLoginPage);

router.get('/register',renderRegisterPage);

router.post('/register',postRegister);

router.post('/login',postLogin);
module.exports=router;