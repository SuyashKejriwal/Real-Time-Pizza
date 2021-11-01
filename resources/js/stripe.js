import axios from 'axios'
import Noty from 'noty'
import { loadStripe } from '@stripe/stripe-js'
import { CardWidget } from './CardWidget'
import { placeOrder } from './apiService'


export async function initStripe(){
    const stripe=await loadStripe
    ('pk_test_51JqdtvSEIx8G9RWRiBEms6S0CsnKyhqmbNftcVqt7a2el2i2vVjgfngtibr6QsjJ7f1ylq8mvn25RiSfQ8qWtoRu00HuCOdrkM');

   let card= null;
   const paymentType = document.querySelector('#paymentType');
   if(!paymentType) {
       return;
   }
   paymentType.addEventListener('change' , (e)=> {

       if(e.target.value === 'card') {
           // Display Widget
          card = new CardWidget(stripe)
          card.mount()
       } else {
           card.destroy()
       }

   })

//Ajax call for order placed format
const paymentForm=document.querySelector('#payment-form');
if(paymentForm){
paymentForm.addEventListener('submit',async (e)=>{
    //do not submit form on ejs
    e.preventDefault();
    let formData=new FormData(paymentForm)
    let formObject={}

    for(let [key,value] of formData.entries()){
        formObject[key]=value
        console.log(key,value);
    }

    if (!card) {
        // Ajax
        placeOrder(formObject);
        return;
    }

    const token = await card.createToken()
    formObject.stripeToken = token.id;
    console.log(formObject)
    placeOrder(formObject);

 

})
}
}