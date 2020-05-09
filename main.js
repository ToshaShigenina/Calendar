document.addEventListener('DOMContentLoaded', () => {
  const body = document.body,
    data = {};

  const editControl = () => {
    const controlInput = document.querySelector('.control__input'),
      taskList = document.querySelector('.task__active');

    body.addEventListener('click', (event) => {
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

      if (target.closest('.control .button__check') && controlInput.value) {
        let task = document.createElement('li');
        task.classList.add('task__item');
        task.innerHTML = `<button class="button button__check"></button><span class="task__content"></span><button class="button button__delete"></button>`;
        task.querySelector('.task__content').textContent = controlInput.value;
        taskList.prepend(task);
        controlInput.value = '';
        target.previousElementSibling.classList.remove('control__edit');
        document.querySelector('.control .button__add').classList.remove('button__delete');
      }
    });
  };

  editControl();

  const editTask = () => {
    const listActive = document.querySelector('.task__active'),
      listCheck = document.querySelector('.task__check'),
      dashboard = document.querySelector('.dashboard');

    dashboard.addEventListener('click', (event) => {
      let target = event.target;


    });

  };

  editTask();

});
