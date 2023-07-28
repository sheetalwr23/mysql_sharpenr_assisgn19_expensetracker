document.getElementById('formId').addEventListener('submit', async (event) => {
  event.preventDefault();

  const amount = event.target.amount.value;
  const description = event.target.description.value;
  const category = event.target.select.value;

  const response = await fetch('/api/expenses', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ amount, description, category }),
  });

  if (response.ok) {
    const expense = await response.json();
    showExpenseOnScreen(expense);
  }
});

async function deleteExpense(id, element) {
  const response = await fetch(`/api/expenses/${id}`, {
    method: 'DELETE',
  });

  if (response.ok) {
    element.remove();
  }
}

function editExpense(id, amount, description, category) {
  document.getElementById('amt').value = amount;
  document.getElementById('desc').value = description;
  document.getElementById('select').value = category;

  document.getElementById('formId').addEventListener('submit', async (event) => {
    event.preventDefault();

    const newAmount = event.target.amount.value;
    const newDescription = event.target.description.value;
    const newCategory = event.target.select.value;

    const response = await fetch(`/api/expenses/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount: newAmount, description: newDescription, category: newCategory }),
    });

    if (response.ok) {
      const updatedExpense = await response.json();
      showExpenseOnScreen(updatedExpense);
    }
  });
}

function showExpenseOnScreen(expense) {
  const parentElem = document.getElementById('listofexpenses');
  const childElem = document.createElement('li');

  childElem.textContent = `Expense Amount->${expense.amount}  |  Expense Description->${expense.description} | Expense Category->${expense.category}`;
  parentElem.appendChild(childElem);

  const deleteButton = document.createElement('input');
  deleteButton.type = 'button';
  deleteButton.value = 'Delete';
  childElem.appendChild(deleteButton);

  deleteButton.onclick = () => {
    deleteExpense(expense.id, childElem);
  };

  const editButton = document.createElement('input');
  editButton.type = 'button';
  editButton.value = 'Edit';
  childElem.appendChild(editButton);

  editButton.onclick = () => {
    editExpense(expense.id, expense.amount, expense.description, expense.category);
  };
}