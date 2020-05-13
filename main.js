document.addEventListener('DOMContentLoaded', () => {
  const now = new Date(),
    data = JSON.parse(localStorage.getItem('calendarData')) || {};

  const calendar = document.querySelector('.calendar'),
    control = document.querySelector('.control'),
    controlInput = control.querySelector('.control__input'),
    taskActive = document.querySelector('.task__active'),
    taskCheck = document.querySelector('.task__check'),
    dashboard = document.querySelector('.dashboard'),
    title = document.querySelector('h1.title');

  let month = now.getMonth(),
    year = now.getFullYear(),
    dayId;

  const saveData = () => {
    localStorage.setItem('calendarData', JSON.stringify(data));
  };

  /* Создание пустого элемента дня для добавления в календарь */
  const createDay = (content) => {
    const day = document.createElement('span');
    day.className = 'day';
    day.textContent = content;
    return day;
  };

  /* Генерация календаря на месяц */
  const createCalendar = (date) => {
    const year = date.getFullYear(),
      month = date.getMonth(),
      dayActive = date.getDate(),
      dayFirstOfWeek = new Date(year, month, 1).getDay() == 0 ? 6 : new Date(year, month, 1).getDay() - 1,
      dayLast = 33 - new Date(year, month, 33).getDate(),
      dayLastOfWeek = new Date(year, month, dayLast).getDay() == 0 ? 6 : new Date(year, month, dayLast).getDay() - 1,
      calendarTitle = calendar.querySelector('.calendar__title'),
      calendarMonth = calendar.querySelector('.calendar__month');

    let dayOfMonth = 33 - new Date(year, month - 1, 33).getDate();

    calendarMonth.innerHTML = '';

    const months = [
        'Январь',
        'Февраль',
        'Март',
        'Апрель',
        'Май',
        'Июнь',
        'Июль',
        'Август',
        'Сентябрь',
        'Октябрь',
        'Ноябрь',
        'Декабрь'
      ];

    calendarTitle.textContent = `${months[month]} ${year}`;

    const newLastMonth = () => {
      if (month - 1 === -1) return '11';
      else if (month - 1 < 10) return '0' + (month - 1);
      else return month - 1;
    };

    const newLastYear = () => {
      if (month - 1 === -1) return year - 1;
      else return year;
    };

    if (dayFirstOfWeek !== 0) {
      dayOfMonth -= (dayFirstOfWeek - 1);
      for (let i = 0; i < dayFirstOfWeek; i++) {
        let day = createDay(dayOfMonth);
        day.classList.add('day__over');
        day.dataset.day = `day${dayOfMonth}${newLastMonth()}${newLastYear()}`;
        calendarMonth.append(day);
        dayOfMonth++;
      }
    }

    dayOfMonth = 1;

    while (dayOfMonth <= dayLast) {
      let day = createDay(dayOfMonth);
      if (dayOfMonth === dayActive) {
        day.classList.add('day__active');
      }
      day.dataset.day = `day${dayOfMonth<10?'0'+dayOfMonth:dayOfMonth}${month<10?'0'+month:month}${year}`;
      calendarMonth.append(day);
      dayOfMonth++;
    }

    dayOfMonth = 1;

    const newNextMonth = () => {
      if (month + 1 === 12) return '00';
      else if (month + 1 < 10) return '0' + (month + 1);
      else return month + 1;
    };

    const newNextYear = () => {
      if (month + 1 === 12) return year + 1;
      else return year;
    };

    if (dayLastOfWeek < 6) {
      for (let i = dayLastOfWeek + 1; i <= 6; i++) {
        let day = createDay(dayOfMonth);
        day.classList.add('day__over');
        day.dataset.day = `day${dayOfMonth<10?'0'+dayOfMonth:dayOfMonth}${newNextMonth()}${newNextYear()}`;
        calendarMonth.append(day);
        dayOfMonth++;
      }
    }
  };

  /* Для ограничения выбран 2050 год, т.к. в виндоус это максимальный год, который можно установить в настройках даты и времени */
  const calendarNext = () => {
    month++;
    if (month === 11) {
      month = 0;
      year++;
      if (year > 2050) {
        year = 2050;
        month = 11;
      }
    }
  };


  /* Назад на 20 лет, думаю, хватит */
  const calendarPrev = () => {
    month--;
    if (month === -1) {
      month = 11;
      year--;
      if (year < 2000) {
        year = 2000;
        month = 0;
      }
    }
  };

  const changeMonth = (event) => {
    const target = event.target;

    if (target.closest('.arrow')) {
      if (target.matches('.arrow__prev')) {
        calendarPrev();
      } else if (target.matches('.arrow__next')) {
        calendarNext();
      }
      createCalendar(new Date(year, month, now.getDate()));
    }
  };


  const loadTask = () => {
    const tasks = data[dayId];
    taskCheck.innerHTML = '';
    taskActive.innerHTML = '';
    if (tasks)
      tasks.forEach((item) => {
        const task = createTask(item.id, item.content);
        if (item.check) {
          taskCheck.prepend(task);
        } else {
          taskActive.prepend(task);
        }
      });
  };

  const createTitle = () => {
    let day = dayId.slice(3, 5),
      month = dayId.slice(5, 7),
      year = dayId.slice(7);

    const months = [
      'января',
      'февраля',
      'марта',
      'апреля',
      'мая',
      'июня',
      'июля',
      'августа',
      'сентября',
      'октября',
      'ноября',
      'декабря'
    ];

    day = day[0] === '0' ? day.slice(1) : day;
    month = month[0] === '0' ? month.slice(1) : month;

    title.textContent = `${day} ${months[month]} ${year}`;
  };

  /* Загрузка выбранного дня */
  const loadDaySelect = (event) => {
    let daySelect = calendar.querySelector('span.day__active');
    if (event.type === 'load') {
      daySelect.classList.add('day__select');
      dayId = daySelect.dataset.day;
      createTitle();
      loadTask();
    } else if (event.type === 'click') {
      daySelect = calendar.querySelector('span.day__select');
      const target = event.target.closest('.day');
      if (daySelect && target && target !== daySelect) {
        target.classList.add('day__select');
        daySelect.classList.remove('day__select');
        dayId = target.dataset.day;
        createTitle();
        loadTask();
      } else if (target && target !== daySelect) {
        target.classList.add('day__select');
        dayId = target.dataset.day;
        createTitle();
        loadTask();
      }
    }
  };

  /* Уникальный id создается благодаря метке времени */
  const createTaskId = () => {
    let id = `task${Date.now()}`;
    return id;
  };

  /* Создание создание задачи */
  const createTask = (id, content) => {
    const task = document.createElement('li');
    const taskObj = {
      id,
      content,
      check: false
    };

    task.classList.add('task__item');
    task.id = id;
    task.innerHTML = `<button class="button button__check"></button><span class="task__content">${content}</span><button class="button button__delete"></button>`;

    if (!data[dayId]) {
      data[dayId] = [];
    }

    const obj = data[dayId].find((item) => {
      return item.id === id;
    });

    if (!obj) {
      data[dayId].push(taskObj);
      saveData();
    }

    return task;
  };

  /* Удаление задачи. */
  const deleteTask = (event) => {
    const target = event.target;

    if (target.closest('.button__delete')) {
      const task = target.closest('.task__item');
      if (data[dayId].length > 1) {
        let index = data[dayId].findIndex((item) => {
          return item.id === task.id;
        });
        data[dayId].splice(index, 1);
      } else {
        delete data[dayId];
      }
      task.remove();
      saveData();
    }
  };

  /* Выполнение / Невыполнение задачи. Задачи перемешиваются. */
  const checkTask = (event) => {
    const target = event.target;

    if (target.closest('.button__check')) {
      const task = target.closest('.task__item');

      if (target.closest('.task') === taskActive) {
        taskCheck.prepend(task);
        data[dayId].forEach((item) => {
          if (item.id === task.id) {
            item.check = true;
          }
        });
      } else if (target.closest('.task') === taskCheck) {
        taskActive.prepend(task);
        data[dayId].forEach((item) => {
          if (item.id === task.id) {
            item.check = false;
          }
        });
      }

      saveData();
    }
  };

  /* Раскрытие поля ввода, добавление задачи в список активных задач, очистка поля ввода при закрытии */
  const addTask = (event) => {
    let target = event.target;

    if (target.closest('.button__add') && !controlInput.classList.contains('control__edit')) {
      controlInput.classList.add('control__edit');
    } else if (target.closest('.button__add') && controlInput.value) {
      const task = createTask(createTaskId(), controlInput.value);
      taskActive.prepend(task);
      controlInput.value = '';
      controlInput.classList.remove('control__edit');
    } else if (target.closest('.button__delete')) {
      controlInput.value = '';
      controlInput.classList.remove('control__edit');
    }

    console.log(data);
  };

  createCalendar(now);

  window.addEventListener('load', loadDaySelect);
  control.addEventListener('click', addTask);
  dashboard.addEventListener('click', deleteTask);
  dashboard.addEventListener('click', checkTask);
  calendar.addEventListener('click', changeMonth);
  calendar.addEventListener('click', loadDaySelect);

});
