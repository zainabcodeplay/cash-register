let price = 19.5;
let cid = [
    ["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], 
    ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]
];

document.getElementById("purchase-btn").addEventListener("click", function() {
    let cashGiven = parseFloat(document.getElementById("cash").value);
    let changeDueElement = document.getElementById("change-due");

    if (cashGiven < price) {
        alert("Customer does not have enough money to purchase the item");
        return;
    }

    let changeDue = cashGiven - price;
    if (changeDue === 0) {
        changeDueElement.innerText = "No change due - customer paid with exact cash";
        return;
    }

    let totalCid = cid.reduce((sum, denom) => sum + denom[1], 0).toFixed(2);
    
    if (parseFloat(totalCid) < changeDue) {
        changeDueElement.innerText = "Status: INSUFFICIENT_FUNDS";
        return;
    }

    let changeArr = [];
    let currencyUnits = {
        "PENNY": 0.01, "NICKEL": 0.05, "DIME": 0.1, "QUARTER": 0.25,
        "ONE": 1, "FIVE": 5, "TEN": 10, "TWENTY": 20, "ONE HUNDRED": 100
    };

    for (let i = cid.length - 1; i >= 0; i--) {
        let [unit, amount] = cid[i];
        let unitValue = currencyUnits[unit];
        let amountToReturn = 0;

        while (changeDue >= unitValue && amount > 0) {
            changeDue -= unitValue;
            changeDue = Math.round(changeDue * 100) / 100;
            amount -= unitValue;
            amountToReturn += unitValue;
        }

        if (amountToReturn > 0) {
            changeArr.push([unit, amountToReturn]);
        }
    }

 if (changeDue > 0) {
    changeDueElement.innerText = "Status: INSUFFICIENT_FUNDS";
} else if (parseFloat(totalCid) === cashGiven - price) {
    changeArr = cid.filter(denom => denom[1] > 0); // Ensure all denominations are included
    changeDueElement.innerText = `Status: CLOSED ${changeArr.map(item => item[0] + ": $" + item[1].toFixed(2)).join(" ")}`;
} else {
    changeDueElement.innerText = `Status: OPEN ${changeArr.map(item => item[0] + ": $" + item[1].toFixed(2)).join(" ")}`;
}


});
