import { Check } from './check.js';

const Cliente = {
    send: (data)=>{
        fetch('http://localhost:3000/api/items', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          })
            .then(response => {
              if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
              }
              return response.json();
            })
            .then(data => {
              console.log('Ítem creado:', data);
            })
            .catch(error => {
              console.error('Error al crear el ítem:', error);
            });
          
    }
}

const check1 = new Check(document.getElementById("grupo1"),Cliente);
check1.addCheck("riego1_G1"); // I've changed the name so that when it appears in console, it is more specific.
check1.addCheck("riego2_G1");

const check2 = new Check(document.getElementById("grupo2"),Cliente);
check2.addCheck("riego1_G2");
check2.addCheck("riego2_G2");

const check3 = new Check(document.getElementById("grupo3"),Cliente);
check3.addCheck("riego1_G3");
check3.addCheck("riego2_G3");