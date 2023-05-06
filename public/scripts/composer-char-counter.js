$(document).ready(function() {
    console.log('DOM is ready');
});

function countChar(val) {
    let len = val.value.length;
    let counter = document.querySelector('.counter');
    
    if (len >= 140) {
     // val.value = val.value.substring(0, 140);
      counter.innerText = 0;
      counter.classList.add('counter-red');
    } else {
      let remaining = 140 - len;
      counter.innerText = remaining;
      if (remaining < 0) {
        counter.classList.add('counter-negative');
      } else {
        counter.classList.remove('counter-negative');
      }
      counter.classList.remove('counter-red');
    }
    
    if (len > 140) {
      counter.innerText = -(len - 140);
      counter.classList.add('counter-negative');
    }
  }
  
  
  