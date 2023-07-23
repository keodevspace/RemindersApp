// Ola, boas-vindas ao meu projeto de Lembretes!
// Conforme combinado com a recrutadora Nara, meu projeto foi feito no JavaScript

document.addEventListener('DOMContentLoaded', () => {
  const reminderForm = document.getElementById('reminder-form');
  const errorMessage = document.getElementById('error-message');
  const remindersContainer = document.getElementById('reminders-container');
  const localStorageKey = 'lembretes';

  // upload reminders from local storage, if exists
  const savedReminders = JSON.parse(localStorage.getItem(localStorageKey)) || [];
  savedReminders.forEach((reminder) => addReminderToList(reminder.name, reminder.date));

  reminderForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const reminderName = document.getElementById('reminder-name').value;
    const reminderDate = document.getElementById('reminder-date').value;

    // validate if the "Lembrete" field is filled in
    if (!reminderName) {
      errorMessage.textContent = 'Preencha o campo "Lembrete" para continuar.';
      return;
    }

    // validate that the "Data" field is filled and is a valid date in the future
    const currentDate = new Date(); // Fix: Get the current date
    const selectedDate = new Date(reminderDate);

    // Add one day to the selected date
    selectedDate.setDate(selectedDate.getDate() + 1);

    if (!reminderDate || selectedDate <= currentDate) {
      errorMessage.textContent = 'Poxa, não deu certo! A data deve ser no futuro.';
      return;
    }

    // if the fields are valid, clear the error message and add the reminder
    errorMessage.textContent = '';
    addReminderToList(reminderName, selectedDate);
    reminderForm.reset();

    // saves reminder in local storage
    const reminderData = { name: reminderName, date: selectedDate.toISOString() };
    savedReminders.push(reminderData);
    savedReminders.sort((a, b) => new Date(a.date) - new Date(b.date)); // Sort reminders by date
    localStorage.setItem(localStorageKey, JSON.stringify(savedReminders));
  });

  function addReminderToList(name, date) {
    const reminderItem = document.createElement('div');
    reminderItem.classList.add('reminder-item');

    // standart date to "dd/mm/aaaa"
    const formattedDate = formatDate(date);

    reminderItem.innerHTML = `
      <span><strong>${name}</strong> - ${formattedDate}</span>
      <span class="delete-btn" onclick="deleteReminder(this)" data-name="${name}">x</span>
    `;

    // Find the correct position to insert the new reminder
    const currentDate = new Date(); // Fix: Get the current date
    const selectedDate = new Date(date);
    const reminderItems = remindersContainer.getElementsByClassName('reminder-item');
    let insertIndex = 0;
    for (let i = 0; i < reminderItems.length; i++) {
      const reminderDate = new Date(reminderItems[i].dataset.date);
      if (selectedDate > reminderDate) {
        break;
      }
      insertIndex++;
    }

    // Insert the new reminder at the correct position
    if (insertIndex === reminderItems.length) {
      remindersContainer.appendChild(reminderItem);
    } else {
      remindersContainer.insertBefore(reminderItem, reminderItems[insertIndex]);
    }
  }

  // function to format date in the pattern dd/mm/aaaa
  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }
});

function deleteReminder(deleteButton) {
  const reminderItem = deleteButton.parentNode;
  reminderItem.parentNode.removeChild(reminderItem);

  // remove reminder from local storage
  const localStorageKey = 'lembretes';
  const savedReminders = JSON.parse(localStorage.getItem(localStorageKey)) || [];
  const reminderName = deleteButton.dataset.name; // get the name of reminder by attribute 'data-name'
  const updatedReminders = savedReminders.filter(
    (reminder) => reminder.name !== reminderName
  );
  localStorage.setItem(localStorageKey, JSON.stringify(updatedReminders));
}
