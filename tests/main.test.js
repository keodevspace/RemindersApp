import { addReminderToList } from '../src/main';

test('addReminderToList should add a reminder to the list', () => {
  // create div element to serve as remindersContainer with id="reminders-container"
  const remindersContainer = document.createElement('div');
  remindersContainer.id = 'reminders-container';
  document.body.appendChild(remindersContainer);

  // Test data
  const reminderName = 'Lembrete Teste';
  const reminderDate = '2023-07-20';

  // calling function to add reminder
  addReminderToList(reminderName, reminderDate);

  // get all reminders inside remindersContainer
  const reminderItems = remindersContainer.getElementsByClassName('reminder-item');

  // check if reminder was added to container
  let reminderFound = false;
  for (let i = 0; i < reminderItems.length; i++) {
    const reminderText = reminderItems[i].querySelector('span').textContent;
    if (reminderText.includes(reminderName)) {
      reminderFound = true;
      break;
    }
  }

  // expect reminder to be found in container
  expect(reminderFound).toBe(true);
});
