const { addReminderToList } = require('../src/main');

test('addReminderToList should add a reminder to the list', () => {
  // simulation DOM
  document.body.innerHTML = `
    <div id="reminders-container"></div>
  `;

  // test data
  const reminderName = 'Lembrete Teste';
  const reminderDate = '2023-07-20';

  // calling function to add the reminder
  addReminderToList(reminderName, reminderDate);

  // get reminders container
  const remindersContainer = document.getElementById('reminders-container');

  // check if reminder was added to container
  expect(remindersContainer.innerHTML).toContain(reminderName);
});

