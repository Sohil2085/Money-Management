const array1 = JSON.parse(localStorage.getItem("array1")) || [{name: 'Sohil',amount: 1000,notes: 'Anything'}];

// Restrict amount input to numbers only
document.querySelector(".amount-input").addEventListener("input", function () {
    this.value = this.value.replace(/[^0-9.]/g, ""); // Only numbers & decimals
});

function renderInformation() {
    let dataHtml = '';

    for (let index = 0; index < array1.length; index++) {
        const elementObject = array1[index];
        const {name , amount , notes} = elementObject;

        const html = `
        <p>
            ${name} ${amount} ${notes}
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
    const note = document.querySelector('.js-notes');
    const notesText = note.value.trim();

    if (nameText === "" || amountValue === "" || notesText === "") {
        alert("Please enter Name, Amount");
        return;
    }
    if (isNaN(amountValue)) {
        alert("Amount must be a number!");
        return;
    }

    array1.push({name: nameText,amount: parseFloat(amountValue),notes: notesText});
    localStorage.setItem("array1", JSON.stringify(array1));

    name.value = '';
    amount.value = '';
    note.value = '';
    renderInformation();
}

function removeEntry(index) {
    array1.splice(index, 1);
    localStorage.setItem("array1", JSON.stringify(array1));
    renderInformation();
}

function editAmount(index) {
    let newAmount = prompt("Enter new amount:", array1[index][1]);

    if (newAmount === null || newAmount.trim() === "") return; // Cancel if empty
    if (isNaN(newAmount) || newAmount <= 0) {
        alert("Please enter a valid positive number!");
        return;
    }

    array1[index][1] = parseFloat(newAmount); // Update amount
    localStorage.setItem("array1", JSON.stringify(array1)); // Save changes
    renderInformation(); // Re-render the list
}

function keydown(event) {
    if (event.key === 'Enter') {
        input();
    }
}

// Render saved data on page load
renderInformation();
