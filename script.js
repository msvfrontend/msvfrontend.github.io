/* =====================================================
   НАЛАШТУВАННЯ: змінюйте лише цей блок
   ===================================================== */

// Посилання на канал і репозиторій
const CHANNEL_URL = 'https://www.youtube.com/channel/UCJfcibCIEgvwrTgRxTNCcpw';
const GITHUB_URL = 'https://github.com/msvfrontend/msvfrontend.github.io';

// Список уроків. Новий урок додавайте в кінець масиву.
// videoUrl: посилання на відео (порожній рядок, поки відео не вийшло)
// demoUrl: шлях до готової сторінки в цьому репозиторії (або '')
// materialsUrl: шлях до папки на GitHub (або '')
// publishDate: дата виходу, формат РРРР-ММ-ДД (показується, поки немає videoUrl)
const LESSONS = [
  {
    number: 1,
    title: "Зв'язок HTML, CSS і JavaScript",
    description: 'Як підключити стилі q скрипт до сторінки nf зробити першу інтерактивну сторінку.',
    level: 1,
    tags: ['HTML', 'CSS', 'JavaScript'],
    videoUrl: 'https://www.youtube.com/watch?v=ZwBNls5BsBY&pp=0gcJCUEMAYcqIYzv',
    demoUrl: './01-html-css-js-connection/starter/',
    materialsUrl: GITHUB_URL + '/tree/main/01-html-css-js-connection/starter',
    publishDate: '2026-10-30'
  },
  {
    number: 2,
    title: 'Акордеон: 3 способи створення',
    description: 'Три підходи: тег details, прихований checkbox і JavaScript. Порівнюємо, коли який обрати.',
    level: 2,
    tags: ['HTML', 'CSS', 'JavaScript'],
    videoUrl: 'https://www.youtube.com/watch?v=PXo2tJYxlRI',
    demoUrl: './02-accordion/starter/',
    materialsUrl: GITHUB_URL + '/tree/main/02-accordion/starter',
    publishDate: '2026-11-06'
  },
  {
    number: 3,
    title: 'Картка товару зі слайдером зображень',
    description: 'Адаптивна картка для інтернет-магазину: Flexbox, Grid, позиціонування й слайдер на чистому JS.',
    level: 2,
    tags: ['HTML', 'CSS', 'JavaScript'],
    videoUrl: 'https://youtu.be/watch?v=QlFUocFxclk',
    demoUrl: './03-product-card-slider/starter/',
    materialsUrl: GITHUB_URL + '/tree/main/03-product-card-slider/starter',
    publishDate: '2026-11-13'
  },
  {
    number: 4,
    title: 'Каталог товарів із CSV-файлу',
    description: 'Будуємо каталог на основі шаблону картки товару, а дані завантажуємо з CSV.',
    level: 3, 
    tags: ['JavaScript', 'CSV', 'fetch'],
    videoUrl: '',
    demoUrl: '',
    materialsUrl: '',
    publishDate: '2026-11-20'
  }
];

/* =====================================================
   КОД СТОРІНКИ (зазвичай не потребує змін)
   ===================================================== */

const STAR_FULL = '\u2605';
const STAR_EMPTY = '\u2606';

const grid = document.getElementById('lessonsGrid');
const filtersBox = document.getElementById('filters');

let activeLevel = 'all';

// Допоміжна функція створення елементів
function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

function makeLink(text, href, className, external) {
  const link = el('a', className, text);
  link.href = href;
  if (external) {
    link.target = '_blank';
    link.rel = 'noopener';
  }
  return link;
}

function stars(level) {
  return STAR_FULL.repeat(level) + STAR_EMPTY.repeat(5 - level);
}

function formatDate(isoDate) {
  const date = new Date(isoDate + 'T00:00:00');
  return date.toLocaleDateString('uk-UA', { day: 'numeric', month: 'long' });
}

function createCard(lesson, index) {
  const card = el('article', 'card');
  card.style.animationDelay = index * 60 + 'ms';

  // верхній рядок: номер і рівень
  const top = el('div', 'card__top');
  top.append(el('span', 'card__num', 'УРОК ' + String(lesson.number).padStart(2, '0')));

  const level = el('span', 'card__level', stars(lesson.level));
  level.setAttribute('aria-label', 'Рівень складності: ' + lesson.level + ' з 5');
  level.title = 'Рівень складності: ' + lesson.level + ' з 5';
  top.append(level);

  // заголовок і опис
  const title = el('h3', 'card__title', lesson.title);
  const text = el('p', 'card__text', lesson.description);

  // теги технологій
  const tags = el('ul', 'tags');
  lesson.tags.forEach(function (name) {
    tags.append(el('li', 'tag', name));
  });

  // кнопки
  const footer = el('div', 'card__footer');

  if (lesson.videoUrl) {
    footer.append(makeLink('Відео', lesson.videoUrl, 'btn btn--small btn--accent', true));
  } else if (lesson.publishDate) {
    footer.append(el('span', 'status', 'Вихід: ' + formatDate(lesson.publishDate)));
  }

  if (lesson.demoUrl) {
    footer.append(makeLink('Демо', lesson.demoUrl, 'btn btn--small btn--ghost', false));
  }

  if (lesson.materialsUrl) {
    footer.append(makeLink('Матеріали', lesson.materialsUrl, 'btn btn--small btn--ghost', true));
  }

  card.append(top, title, text, tags, footer);
  return card;
}

function renderLessons() {
  grid.replaceChildren();

  const visible = LESSONS.filter(function (lesson) {
    return activeLevel === 'all' || lesson.level === activeLevel;
  });

  visible.forEach(function (lesson, index) {
    grid.append(createCard(lesson, index));
  });
}

function renderFilters() {
  const levels = Array.from(new Set(LESSONS.map(function (lesson) {
    return lesson.level;
  }))).sort();

  const options = [{ value: 'all', label: 'Усі' }].concat(
    levels.map(function (level) {
      return { value: level, label: STAR_FULL.repeat(level) };
    })
  );

  options.forEach(function (option) {
    const button = el('button', 'filter', option.label);
    button.type = 'button';
    button.dataset.value = option.value;
    button.setAttribute('aria-pressed', String(option.value === activeLevel));
    if (option.value === activeLevel) button.classList.add('is-active');
    filtersBox.append(button);
  });

  filtersBox.addEventListener('click', function (event) {
    const button = event.target.closest('.filter');
    if (!button) return;

    const value = button.dataset.value;
    activeLevel = value === 'all' ? 'all' : Number(value);

    filtersBox.querySelectorAll('.filter').forEach(function (item) {
      const isActive = item === button;
      item.classList.toggle('is-active', isActive);
      item.setAttribute('aria-pressed', String(isActive));
    });

    renderLessons();
  });
}

function fillLinks() {
  ['channelLinkHeader', 'channelLinkHero', 'channelLinkFooter'].forEach(function (id) {
    const link = document.getElementById(id);
    if (link) link.href = CHANNEL_URL;
  });

  const github = document.getElementById('githubLinkFooter');
  if (github) github.href = GITHUB_URL;
}

document.addEventListener('DOMContentLoaded', function () {
  fillLinks();
  renderFilters();
  renderLessons();

  document.getElementById('lessonsCount').textContent = LESSONS.length;
  document.getElementById('year').textContent = new Date().getFullYear();
});