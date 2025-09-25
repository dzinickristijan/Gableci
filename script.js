const people = [
  { name: 'Gallus', balance: 0 },
  { name: 'Planta', balance: 0 },
  { name: 'Kiki', balance: 0 },
  { name: 'Filip', balance: 0 },
  { name: 'Tomo', balance: 0 },
  { name: 'Luka', balance: 0 },
  { name: 'Domic', balance: 0 },
  { name: 'Vuk', balance: 0 },
  { name: 'Branko', balance: 0 },
  { name: 'Ivanka', balance: 0 },
  { name: 'Sporcic&Sanja', balance: 0 },
  { name: 'Proslave', balance: 0 },
];

function saveData() {
  localStorage.setItem('peopleData', JSON.stringify(people));
}

function loadData() {
  const data = localStorage.getItem('peopleData');
  if (data) {
    const parsed = JSON.parse(data);
    for (let i = 0; i < people.length; i++) {
      people[i].balance = parsed[i]?.balance || 0;
    }
  }
}

function updateTable() {
  loadData();
  const tableBody = document.querySelector('#balanceTable tbody');
  if (tableBody) {
    tableBody.innerHTML = '';
    people.forEach(person => {
      const row = document.createElement('tr');
      row.innerHTML = `<td>${person.name}</td><td>$${person.balance.toFixed(2)}</td>`;
      tableBody.appendChild(row);
    });
  }
}

function populateSelect() {
  const select = document.getElementById('personSelect');
  if (select) {
    people.forEach((p, i) => {
      const opt = document.createElement('option');
      opt.value = i;
      opt.textContent = p.name;
      select.appendChild(opt);
    });
  }
}

function addFunds() {
  const index = document.getElementById('personSelect').value;
  const amount = parseFloat(document.getElementById('fundAmount').value);
  if (!isNaN(amount)) {
    people[index].balance += amount;
    saveData();
    alert('Funds added!');
  }
}

function buildMealForm() {
  const form = document.getElementById('mealForm');
  if (form) {
    people.forEach((person, i) => {
      const div = document.createElement('div');
      div.innerHTML = `
        <label>${person.name}: </label>
        <input type="number" id="meal_${i}" placeholder="Amount" />
      `;
      form.appendChild(div);
    });
  }
}

function deductMeal() {
  people.forEach((person, i) => {
    const val = parseFloat(document.getElementById(`meal_${i}`).value);
    if (!isNaN(val)) {
      people[i].balance -= val;
    }
  });
  saveData();
  alert('Meal recorded and balances updated.');
}

document.addEventListener('DOMContentLoaded', () => {
  loadData();
  updateTable();
  populateSelect();
  buildMealForm();

  const adminToggle = document.getElementById('adminToggle');
  if (adminToggle) {
    adminToggle.addEventListener('change', () => {
      document.body.classList.toggle('admin-mode', adminToggle.checked);
    });
  }
});
