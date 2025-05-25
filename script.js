// Captura dos elementos
const billInput = document.getElementById("bill");
const tipBtns = document.querySelectorAll(".tip-btn");
const customTipInput = document.getElementById("custom-tip");
const peopleInput = document.getElementById("people");
const peopleError = document.getElementById("people-error");
const tipAmountEl = document.getElementById("tip-amount");
const totalAmountEl = document.getElementById("total-amount");
const resetBtn = document.getElementById("reset");

let tipPercent = 0;

// Função de cálculo
function calculate() {
  const bill = parseFloat(billInput.value);
  const people = parseInt(peopleInput.value);

  // Validação de número de pessoas
  if (people <= 0 || isNaN(people)) {
    peopleError.style.display = "block";
    peopleInput.style.outline = "1px solid var(--clr-error)";
    tipAmountEl.textContent = "$0.00";
    totalAmountEl.textContent = "$0.00";
    resetBtn.disabled = true;
    return;
  } else {
    peopleError.style.display = "none";
    peopleInput.style.outline = "none";
  }

  if (!isNaN(bill) && tipPercent >= 0) {
    const tipAmount = (bill * tipPercent) / 100 / people;
    const totalPerson = bill / people + tipAmount;

    tipAmountEl.textContent = `$${tipAmount.toFixed(2)}`;
    totalAmountEl.textContent = `$${totalPerson.toFixed(2)}`;
    resetBtn.disabled = false;
  }
}

// Seleção de tip fixo
tipBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    // Ignora o próprio input custom
    if (btn.classList.contains("custom")) return;

    tipBtns.forEach((b) => b.classList.remove("selected"));
    btn.classList.add("selected");
    customTipInput.value = "";
    tipPercent = parseFloat(btn.dataset.tip);
    calculate();
  });
});

// Input custom de tip
customTipInput.addEventListener("input", () => {
  tipBtns.forEach((b) => b.classList.remove("selected"));
  const val = parseFloat(customTipInput.value);
  tipPercent = isNaN(val) ? 0 : val;
  calculate();
});

// Recalcula sempre que mudam bill ou people
billInput.addEventListener("input", calculate);
peopleInput.addEventListener("input", calculate);

// Reset completo
resetBtn.addEventListener("click", () => {
  billInput.value = "";
  peopleInput.value = "";
  customTipInput.value = "";
  tipBtns.forEach((b) => b.classList.remove("selected"));
  tipPercent = 0;
  tipAmountEl.textContent = "$0.00";
  totalAmountEl.textContent = "$0.00";
  resetBtn.disabled = true;
  peopleError.style.display = "none";
  peopleInput.style.outline = "none";
});
  