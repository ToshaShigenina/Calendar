document.addEventListener('DOMContentLoaded', () => {
  const data = {
    day05052020: [
      {
        id: 'task0505202013451',
        content: 'Задача 1',
        check: false
        },
      {
        id: 'task0505202014202',
        content: 'Задача 2',
        check: true
        },
      {
        id: 'task0505202015393',
        content: 'Задача 3',
        check: false
        }
      ],
    day06052020: [],
    day07052020: [
      {
        id: 'task0705202013451',
        content: 'Задача 1',
        check: true
        },
      {
        id: 'task0705202014202',
        content: 'Задача 2',
        check: true
        },
      {
        id: 'task0705202015393',
        content: 'Задача 3',
        check: false
        }
      ],
    day08052020: []
  };

  const body = document.body,
    control = document.querySelector('.control'),
    controlInput = control.querySelector('.control__input'),
    taskActive = document.querySelector('.task__active'),
    taskCheck = document.querySelector('.task__check');

  /* Создание создание задачи */
  const createTask = (content) => {
    let task = document.createElement('li');

    task.classList.add('task__item');
    task.innerHTML = `<button class="button button__check"></button><span class="task__content">${content}</span><button class="button button__delete"></button>`;

    return task;
  }

  /* Раскрытие поля ввода, добавление задачи в список активных задач, очистка поля ввода при закрытии */
  const addTask = (event) => {
    let target = event.target;

    if (target.closest('.button__add') && !controlInput.classList.contains('control__edit')) {
      controlInput.classList.add('control__edit');
    } else if (target.closest('.button__add') && controlInput.value) {
      const task = createTask(controlInput.value);
      taskActive.prepend(task);
      controlInput.value = '';
      controlInput.classList.remove('control__edit');
    } else if (target.closest('.button__delete')) {
      controlInput.value = '';
      controlInput.classList.remove('control__edit');
    }
  };

  control.addEventListener('click', addTask);

});
