
let totalExpense = document.querySelector("#total-expense");
let expenseName = document.querySelector("#expense-name");
let expenseAmount = document.querySelector("#expense-amount");
let expenseCalculateBtn = document.querySelector("#add-button");
let expenseList = document.querySelector("#expense-list");
let expenseCount = document.querySelector("#expense-count");
let noExpenses = document.querySelector("#no-expenses");
let noPera = document.querySelector("#pera");
let emptyIcon = document.querySelector(".empty-icon");

let userExpenses = [];


function updateTotal() {

    let totalExpenses = userExpenses.reduce((total, element) => {
        return total + element.amount;
    }, 0);

    totalExpense.textContent = totalExpenses;

    expenseCount.textContent = `${userExpenses.length} Expenses`;

    
    if (userExpenses.length === 0) {
        noExpenses.style.display = "block";
        noPera.style.display = "block";
        emptyIcon.style.display = "flex";
    }
}


expenseCalculateBtn.addEventListener("click", (evt) => {

    evt.preventDefault();

    function createElement() {

        if (
            expenseName.value.trim() === "" ||
            expenseAmount.value.trim() === "" ||
            Number(expenseAmount.value) <= 0
        ) {
            alert("Please enter a valid expense.");
            return;
        }

        
        noExpenses.style.display = "none";
        noPera.style.display = "none";
        emptyIcon.style.display = "none";

        
        let div = document.createElement("div");
        div.classList.add("expense-item");

        
        let expenseId = Date.now() + Math.random();

        
        userExpenses.push({
            id: expenseId,
            name: expenseName.value.trim(),
            amount: Number(expenseAmount.value),
        });

        
        let expenseInfo = document.createElement("div");
        expenseInfo.classList.add("expense-info");

        
        let expenseDetails = document.createElement("div");
        expenseDetails.classList.add("expense-details");

        let pera = document.createElement("h3");
        pera.textContent = expenseName.value.trim();

        let para = document.createElement("p");
        para.textContent = "Personal Expense";

        expenseDetails.appendChild(pera);
        expenseDetails.appendChild(para);

        expenseInfo.appendChild(expenseDetails);

        
        let expenseRight = document.createElement("div");
        expenseRight.classList.add("expense-right");

        
        let amount = document.createElement("span");
        amount.classList.add("expense-amount");
        amount.textContent = `₹${Number(expenseAmount.value)}`;

        
        const deleteBtn = document.createElement("button");

        deleteBtn.classList.add("delete-button");
        deleteBtn.title = "Delete Expense";

        
        const icon = document.createElement("i");
        icon.classList.add("fa-solid", "fa-trash");

        deleteBtn.appendChild(icon);
        
      deleteBtn.addEventListener("click", () => {

    userExpenses = userExpenses.filter((element) => {
        return element.id !== expenseId;
    });


    div.remove();
    updateTotal();
});


        
        expenseRight.appendChild(amount);
        expenseRight.appendChild(deleteBtn);

        div.appendChild(expenseInfo);
        div.appendChild(expenseRight);

        expenseList.prepend(div);

        
        updateTotal();
    }

    createElement();

    expenseName.value = "";
    expenseAmount.value = "";

});
