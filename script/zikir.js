let count = 0;
let target = 0;

const counterDisplay = document.getElementById("counter");
const targetDisplay = document.getElementById("targetDisplay");
const targetInput = document.getElementById("targetInput");
const setTargetBtn = document.getElementById("setTargetBtn");
const addBtn = document.getElementById("addBtn");
const resetBtn = document.getElementById("resetBtn");
const notification = document.getElementById("notification");

setTargetBtn.addEventListener("click", function () {
    const newTarget = parseInt(targetInput.value);

    if (newTarget > 0) {
        target = newTarget;
        targetDisplay.textContent = target;
        notification.style.display = "none";
    }
});

addBtn.addEventListener("click", function () {
    count++;
    counterDisplay.textContent = count;

    if (target > 0 && count === target) {
        notification.style.display = "block";
    }
});

resetBtn.addEventListener("click", function () {
    count = 0;
    counterDisplay.textContent = count;
    notification.style.display = "none";
});