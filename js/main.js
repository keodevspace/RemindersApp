// alinhado com Nara para o teste ser em Javascript

document.addEventListener('DOMContentLoaded', () => {
    const reminderForm = document.getElementById('reminder-form');
    const errorMessage = document.getElementById('error-message');
    const remindersContainer = document.getElementById('reminders-container');
    const localStorageKey = 'lembretes';
  
   
    const savedReminders = JSON.parse(localStorage.getItem(localStorageKey)) || [];
    savedReminders.forEach((reminder) => addReminderToList(reminder.name, reminder.date));
  
    reminderForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const reminderName = document.getElementById('reminder-name').value;
      const reminderDate = document.getElementById('reminder-date').value;
  
      
      if (!reminderName) {
        errorMessage.textContent = 'O campo "Nome" deve estar preenchido.';
        return;
      }
  
      
      const currentDate = new Date();
      const selectedDate = new Date(reminderDate);
      if (!reminderDate || selectedDate <= currentDate) {
        errorMessage.textContent = 'O campo "Data" deve estar preenchido com uma data válida no futuro.';
        return;
      }
  
      
      errorMessage.textContent = '';
      addReminderToList(reminderName, reminderDate);
      reminderForm.reset();
  
      
      const reminderData = { name: reminderName, date: reminderDate };
      savedReminders.push(reminderData);
      localStorage.setItem(localStorageKey, JSON.stringify(savedReminders));
    });
  
    function addReminderToList(name, date) {
      const reminderItem = document.createElement('div');
      reminderItem.classList.add('reminder-item');
      reminderItem.innerHTML = `
        <span><strong>${name}</strong> - ${date}</span>
        <span class="delete-btn" onclick="deleteReminder(this)">x</span>
      `;
  
      
      const currentDate = new Date();
      const selectedDate = new Date(date);
      if (selectedDate < currentDate) {
      
        remindersContainer.insertBefore(reminderItem, remindersContainer.firstChild);
      } else {
        
        remindersContainer.appendChild(reminderItem);
      }
    }
  });
  
  function deleteReminder(deleteButton) {
    const reminderItem = deleteButton.parentNode;
    reminderItem.parentNode.removeChild(reminderItem);
  
   
    const localStorageKey = 'lembretes';
    const savedReminders = JSON.parse(localStorage.getItem(localStorageKey)) || [];
    const reminderName = reminderItem.querySelector('strong').textContent;
    const reminderDate = reminderItem.querySelector('span').textContent.split(' - ')[1];
    const updatedReminders = savedReminders.filter(
      (reminder) => reminder.name !== reminderName || reminder.date !== reminderDate
    );
    localStorage.setItem(localStorageKey, JSON.stringify(updatedReminders));
  }


