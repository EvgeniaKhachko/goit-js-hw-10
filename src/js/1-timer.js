
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

let userSelectedDate;
let currentDate;
let msLeft = 0;
const actionButton = document.querySelector('button');
const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      if (msLeft != 0) {
        return;
      }
      userSelectedDate = new Date(selectedDates[0]);
      currentDate =  new Date();
      if (userSelectedDate > currentDate) {
        actionButton.disabled = false; 
        msLeft = userSelectedDate.getTime() - currentDate.getTime();
      } else {
        actionButton.disabled = true; 
        iziToast.show({
          title: 'Hey',
          message: 'Please choose a date in the future'
        });
        msLeft = 0;
      }

    }
  };
  
const dataPicker = new flatpickr('#datetime-picker', options);
actionButton.addEventListener('click', function(){
  dataPicker.disabled = true;
  let msLeft = userSelectedDate.getTime()  - currentDate.getTime(); 

  let timerFunction = setInterval(function () { 
    if (msLeft <= 0) {
      clearInterval(timerFunction);
      dataPicker.disabled = false;

    } else {
      const leftTimeFormatted = convertMs(msLeft);
      for(let fragment in leftTimeFormatted) {
        const spanTime = document.querySelector(`span[data-${fragment}]`);
        if (spanTime !== null) {
          spanTime.textContent = formatVal(leftTimeFormatted[fragment]);
        } 
      } 
      msLeft = msLeft -1000;
    }
   }, 1000)

   actionButton.disabled = true; 

});





function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function formatVal(val) {
  val = new String(val);
  if (val.length < 2) {
    val = "0"+ val;
  }
  return val;
}