/**
* PHP Email Form Validation - v3.6
* URL: https://bootstrapmade.com/php-email-form/
* Author: BootstrapMade.com
*/
(function () {
  "use strict";

  let forms = document.querySelectorAll('.php-email-form');
  let nameInput = document.getElementById("name")
  let emailInput = document.getElementById("email")
  let subjectInput = document.getElementById("subject")
  let messageInput = document.getElementById("message")

  forms.forEach( function(e) {
    e.addEventListener('submit', function(event) {
      event.preventDefault();
      
      let thisForm = this;
      
      thisForm.querySelector('.loading').classList.add('d-block');
      thisForm.querySelector('.error-message').classList.remove('d-block');
      thisForm.querySelector('.sent-message').classList.remove('d-block');


      php_email_form_submit(thisForm);
     
    });
  });


  function php_email_form_submit(thisForm) {
  
    fetch("http://127.0.0.1:5000/index", {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
            email:emailInput.value,
            message:messageInput.value,
            name:nameInput.value,
            subject:subjectInput.value
              })
    })
    .then(response => {
      if( response.ok ) {
        return response.text();
      } else {
        
        throw new Error(`${response.status} ${response.statusText} ${response.url}`); 
      }
    })
    .then(data => {
      thisForm.querySelector('.loading').classList.remove('d-block'); 
      if (data.trim() == 'OK') {
        thisForm.querySelector('.sent-message').classList.add('d-block');
        thisForm.reset(); 
      
      } else {
        throw new Error(data ? data : 'Form submission failed and no error message returned from: '); 
      }
    })
    .catch((error) => {
      
    });
  }

  function displayError(thisForm, error) {
    thisForm.querySelector('.loading').classList.remove('d-block');
    thisForm.querySelector('.error-message').innerHTML = error;
    thisForm.querySelector('.error-message').classList.add('d-block');
  }

})();
