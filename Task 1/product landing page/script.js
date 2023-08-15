
const formEl = document.getElementById("form-item");
let sendBtn = document.getElementById("send-btn");

let taxcalcitem = document.getElementById("taxcalcitem");


formEl.addEventListener("submit", (event) => {
    event.preventDefault();
});


taxcalcitem.onclick = function() {
    taxcalcitem.classList.add("taxCalculator");
};
