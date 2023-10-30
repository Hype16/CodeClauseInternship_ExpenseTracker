const balance = document.getElementById("balance");
const money_plus = document.getElementById("money-plus");
const money_minus = document.getElementById("money-minus");
const list = document.getElementById("list");
const form = document.getElementById("form");
const text = document.getElementById("text");
const amount = document.getElementById("amount");

//last
const localStorageTransactions = JSON.parse(
  localStorage.getItem("transactions")
);

let transactions =
  localStorage.getItem("transactions") !== null ? localStorageTransactions : [];

//5
//Add Transaction
function addTransaction(e) {
  e.preventDefault();
  if (text.value.trim() === "" || amount.value.trim() === "") {
    alert("please add text and amount");
  } else {
    const transaction = {
      id: generateID(),
      text: text.value,
      amount: +amount.value,
    };

    transactions.push(transaction);

    addTransactionDOM(transaction);
    updateValues();
    updateLocalStorage();
    text.value = "";
    amount.value = "";
  }
}

//5.5
//Generate Random ID
function generateID() {
  return Math.floor(Math.random() * 1000000000);
}

//2

//Add Trasactions to DOM list
function addTransactionDOM(transaction) {
  //GET sign
  const sign = transaction.amount < 0 ? "-" : "+";
  const item = document.createElement("li");

  //Add Class Based on Value
  item.classList.add(transaction.amount < 0 ? "minus" : "plus");

  item.innerHTML = `
      ${transaction.text} <span>${sign}${Math.abs(transaction.amount)}</span>
      <button class="delete-button" onclick="removeTransaction(${
        transaction.id
      })">x</button>
      `;
  list.appendChild(item);
}

//4

//Update the balance income and expence
function updateValues() {
  const amounts = transactions.map((transaction) => transaction.amount);
  const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);
  const income = amounts
    .filter((item) => item > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);
  const expense = (
    amounts.filter((item) => item < 0).reduce((acc, item) => (acc += item), 0) *
    -1
  ).toFixed(2);

  balance.innerText = `$${total}`;
  money_plus.innerText = `$${income}`;
  money_minus.innerText = `$${expense}`;
}

//6

//Remove Transaction by ID
function removeTransaction(id) {
  transactions = transactions.filter((transaction) => transaction.id !== id);
  updateLocalStorage();
  Init();
}
//last
//update Local Storage Transaction
//SUMMARY for the below func.
//This JavaScript code defines a function named updateLocalStorage() that updates the localStorage object with the current state of the transactions array.

//The localStorage object provides a way to store data in the browser that persists even after the browser is closed or refreshed.
//The setItem() method is used to store data in the localStorage object, which takes two arguments: a key and a value. In this case,
// the key is "transactions", and the value is the transactions array that is first converted to a string using JSON.stringify().

//So, the purpose of this function is to update the value of the "transactions" key in the localStorage object with the current state of the transactions array.
// This function is likely called when there is a change in the transactions array to ensure that the latest state of the array is saved in the localStorage.

function updateLocalStorage() {
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

//3

//Init App
function Init() {
  list.innerHTML = "";
  transactions.forEach(addTransactionDOM);
  updateValues();
}

Init();

form.addEventListener("submit", addTransaction);
