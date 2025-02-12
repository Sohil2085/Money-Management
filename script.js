const array = JSON.parse(localStorage.getItem("array")) || [];

// Restrict amount input to numbers only
document.querySelector(".amount-input").addEventListener("input", function () {
    this.value = this.value.replace(/[^0-9.]/g, ""); // Only numbers & decimals
});

function renderInformation() {
    let dataHtml = '';

    for (let index = 0; index < array.length; index++) {
        const element = array[index];

        const html = `
        <p>
            <span>${element[0]} - <span id="amount-${index}">${element[1]}</span> Rupees</span>
            <button onclick="editAmount(${index})">Edit</button>
            <button onclick="removeEntry(${index})">Remove</button>
        </p>
        `;
        dataHtml += html;
    }

    document.querySelector('.js-output').innerHTML = dataHtml;
}

function input() {
    const name = document.querySelector('.name-input');
    const amount = document.querySelector('.amount-input');
    const nameText = name.value.trim();
    const amountValue = amount.value.trim();

    if (nameText === "" || amountValue === "") {
        alert("Please enter both Name and Amount");
        return;
    }
    if (isNaN(amountValue)) {
        alert("Amount must be a number!");
        return;
    }

    array.push([nameText, parseFloat(amountValue)]);
    localStorage.setItem("array", JSON.stringify(array));

    name.value = '';
    amount.value = '';
    renderInformation();
}

function removeEntry(index) {
    array.splice(index, 1);
    localStorage.setItem("array", JSON.stringify(array));
    renderInformation();
}

// ✅ Function to Edit Amount (Only Numbers Allowed)
function editAmount(index) {
    let newAmount = prompt("Enter new amount:", array[index][1]);

    if (newAmount === null || newAmount.trim() === "") return; // Cancel if empty
    if (isNaN(newAmount) || newAmount <= 0) {
        alert("Please enter a valid positive number!");
        return;
    }

    array[index][1] = parseFloat(newAmount); // Update amount
    localStorage.setItem("array", JSON.stringify(array)); // Save changes
    renderInformation(); // Re-render the list
}

function keydown(event) {
    if (event.key === 'Enter') {
        input();
    }
}

// Render saved data on page load
renderInformation();
