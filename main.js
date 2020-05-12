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

  const editControl = (event) => {
    let target = event.target;

    if (target.closest('.button__add')) {
      if (target.nextElementSibling.closest('.control__input') && !target.classList.contains('button__delete')) {
        target.classList.add('button__delete');
        target.nextElementSibling.classList.add('control__edit');
      } else {
        controlInput.value = '';
        target.classList.remove('button__delete');
        target.nextElementSibling.classList.remove('control__edit');
      }
    }

    if (target.closest('.button__check') && controlInput.value) {
      let task = document.createElement('li');
      task.classList.add('task__item');
      task.innerHTML = `<button class="button button__check"></button><span class="task__content"></span><button class="button button__delete"></button>`;
      task.querySelector('.task__content').textContent = controlInput.value;
      taskActive.prepend(task);
      controlInput.value = '';
      target.previousElementSibling.classList.remove('control__edit');
      document.querySelector('.control .button__add').classList.remove('button__delete');
    }
  };

  control.addEventListener('click', editControl);

});
