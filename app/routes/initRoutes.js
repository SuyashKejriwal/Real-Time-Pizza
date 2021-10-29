const router=require('express').Router();
const {renderHomePage,
       renderLoginPage,
       renderRegisterPage
}=require('../controllers/initController')

//base route - "/"
router.get('/',renderHomePage);

router.get('/login',renderLoginPage);

router.get('/register',renderRegisterPage);
module.exports=router;