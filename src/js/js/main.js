// alinhado com Nara para o teste ser em Javascript

document.addEventListener('DOMContentLoaded', () => {
    const reminderForm = document.getElementById('reminder-form');
    const errorMessage = document.getElementById('error-message');
  
    reminderForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const reminderName = document.getElementById('reminder-name').value;
      const reminderDate = document.getElementById('reminder-date').value;
  
      // Validar se o campo "Nome" está preenchido
      if (!reminderName) {
        errorMessage.textContent = 'O campo "Nome" deve estar preenchido.';
        return;
      }
  
      // Validar se o campo "Data" está preenchido e é uma data válida no futuro
      const currentDate = new Date();
      const selectedDate = new Date(reminderDate);
      if (!reminderDate || selectedDate <= currentDate) {
        errorMessage.textContent = 'O campo "Data" deve estar preenchido com uma data válida no futuro.';
        return;
      }
  
      // Se os campos são válidos, limpar a mensagem de erro e adicionar o lembrete à lista
      errorMessage.textContent = '';
      addReminderToList(reminderName, reminderDate);
      reminderForm.reset();
    });
  
    function addReminderToList(name, date) {
      const remindersContainer = document.getElementById('reminders-container');
      const reminderItem = document.createElement('div');
      reminderItem.classList.add('reminder-item');
      reminderItem.innerHTML = `
        <span><strong>${name}</strong> - ${date}</span>
        <span class="delete-btn" onclick="deleteReminder(this)">x</span>
      `;
      remindersContainer.appendChild(reminderItem);
    }
  });
  
  function deleteReminder(deleteButton) {
    const reminderItem = deleteButton.parentNode;
    reminderItem.parentNode.removeChild(reminderItem);
  }

