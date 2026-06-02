# K & K — Web решения для бизнеса

Портфолио-сайт веб-студии. Одностраничный лендинг с отдельной страницей проектов.

## Стек

| Слой | Технологии |
|------|-----------|
| Framework | React 18, TypeScript, Vite |
| Стили | CSS custom properties (дизайн-система), Tailwind CSS 3 |
| Роутинг | React Router DOM 6 |
| Анимации | CSS transitions/keyframes, IntersectionObserver (scroll-reveal), Canvas 2D (фон) |
| Шрифты | Space Grotesk (заголовки/тело), JetBrains Mono (моноширинный) |
| Деплой | Vercel (analytics подключена) |

## Цветовая палитра

```
--bg:       #050507      (фон)
--bg-card:  #0c0c10      (карточки)
--fg:       #f0f0f5      (текст)
--fg-muted: #8a8a9a      (вторичный текст)
--accent:   #ffd3ff      (акцент, розовый)
--accent3:  #c76de0      (фиолетовый для орбов)
--gradient: #ffd3ff → #f0c0f5 → #e0b0e8
```

## Страницы

### `/` — Главная (лендинг)

Одностраничный скролл. Все секции ниже идут последовательно, разделены `section-sep`.

| # | Секция | Компонент | id | Описание |
|---|--------|-----------|----|----------|
| — | Фон | `WebGLBackground` | — | Canvas-частицы с линиями связи, реагируют на курсор |
| — | Навигация | `NavBar` | — | Фиксированная, blur при скролле, мобильное меню |
| 0 | Герой | `HeroSection` | `#hero` | 3D-визитка с контактами и навигацией |
| 1 | О команде | `AboutSection` | `#about` | Описание, статистика (20+ проектов, 3+ года), карточки ценностей |
| 2 | Технологии | `TechSection` | `#tech` | Интерактивные табы (Frontend/Backend/Design/DevOps) |
| 3 | Процесс | `ProcessSection` | `#process` | 4 шага: Брифинг → Дизайн → Разработка → Запуск |
| 4 | Цены | `PricingSection` | `#pricing` | 3 тарифа: Минимум / Стандарт / Премиум |
| 5 | Отзывы | `TestimonialsSection` | `#testimonials` | Карточки отзывов с 3D-тилтом |
| 6 | Проекты | `ProjectsCarousel` | `#projects` | Горизонтальная карусель с drag-скроллом |
| — | Подвал | `FooterSection` | `#contact` | CTA-блок (Telegram/Email) + копирайт |
| — | Анимации | `ScrollEngine` | — | Scroll-reveal, параллакс орбов |

### `/projects` — Проекты

Отдельная страница с сеткой проектов. Каждая карточка:
- Карусель изображений с точками и стрелками
- 3D-тилт при наведении
- Теги технологий
- Ссылка на сайт

## Проекты в портфолио

| Проект | Стек | Ссылка |
|--------|------|--------|
| Загородный комплекс «ЗВЁЗДНЫЙ» | Next.js, TypeScript, Strapi, PostgreSQL, Tailwind | zvezdny-complex.ru |
| Постельное бельё «НЮКТА» | React, Tailwind, Node.js, MODX | нюкта.рф |
| «Даймонд» клининг | React, Tailwind, MODX | diamondsupport.ru |
| Визитка ведущей | React, Tailwind | irinasemenova.ru |
| JungebadMoscow | React, Tailwind, Node.js, MODX | jungebadmoscow.ru |
| KiselevDA | React, Tailwind, Node.js, MODX | kiselev-lawyer.ru |

## Структура файлов

```
src/
├── App.tsx                    # BrowserRouter → AppLayout
├── main.tsx                   # Точка входа
├── index.css                  # Дизайн-система + все стили
├── components/
│   ├── AppLayout.tsx          # Роутинг (/, /projects, *)
│   ├── WebGLBackground.tsx    # Canvas-частицы
│   ├── ScrollEngine.tsx       # Scroll-reveal + параллакс
│   ├── NavBar.tsx             # Навигация
│   ├── HeroSection.tsx        # Визитка-герой
│   ├── AboutSection.tsx       # О команде
│   ├── TechSection.tsx        # Технологии (табы)
│   ├── ProcessSection.tsx     # Процесс работы
│   ├── PricingSection.tsx     # Цены
│   ├── TestimonialsSection.tsx # Отзывы
│   ├── ProjectsCarousel.tsx   # Карусель проектов
│   ├── FooterSection.tsx      # Подвал + CTA
│   └── TiltCard.tsx           # Переиспользуемый 3D-тилт
├── pages/
│   ├── Index.tsx              # Главная (композиция секций)
│   ├── Projects.tsx           # Страница проектов
│   └── NotFound.tsx           # 404
└── public/
    └── img/                   # Скриншоты проектов
```

## Ключевые паттерны

- **Стили**: CSS-переменные для дизайн-системы, inline style-объекты в компонентах (не Tailwind-утилиты для макета)
- **Анимации**: класс `.reveal` + IntersectionObserver добавляет `.visible` при появлении в viewport
- **3D-эффекты**: отслеживание курсора → CSS transform с perspective/rotate
- **Фон**: Canvas 2D с частицами, линиями связи и реакцией на мышь; декоративные `.orb` с параллаксом
- **Навигация**: якорные ссылки `#section` с smooth scroll на главной, React Router для `/projects`

## Контакты (зашиты в коде)

- Telegram: @k_k0stya
- Email: k.konstantin2212@gmail.com
- Телефон: +7 (977) 860-90-72
