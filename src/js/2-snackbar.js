import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

document.querySelector('button').addEventListener('click',function(event){
    event.preventDefault();
    const delay = Number(document.querySelector('input[name="delay"]').value);
    const isFulfilledPromiseMode = document.querySelector('input[name="state"]').checked;

    const promObj = new Promise((resolve, reject) => {
        setTimeout(() => {
          if (isFulfilledPromiseMode) {
            resolve(delay);
          } else {
            reject(delay);
          }
        }, delay);
      });
promObj.then(delay => iziToast.success({message: `Fulfilled promise in ${delay}ms`}))
.catch(delay => iziToast.error({title:'Error', message: `Rejected promise in ${delay}ms`}));

});