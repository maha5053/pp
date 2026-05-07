# Wireframe: Проекты партии (prototype)

Это отдельное приложение-вайрфрейм в папке `prototype/`.

## Стек

- React 19
- Vite 8
- TypeScript
- React Router 7 (`react-router-dom`)
- Tailwind CSS 4 (через `@tailwindcss/vite`)

## Важно про Node.js

Vite 8 требует Node **20.19+** или **22.12+**.  
В текущем окружении удобно запускать команды через временный Node 22:

```bash
cd "prototype"
npx -y -p node@22 -c "npm install"
npx -y -p node@22 -c "npm run dev -- --host"
```

Открыть в браузере: `http://localhost:5173/`

Сборка:

```bash
cd "prototype"
npx -y -p node@22 -c "npm run build"
```

## Роутинг

Реализовано в `src/router.tsx`:

- `/` — главная: список проектов карточками
- `/:projectId` — страница проекта (баннер, блоки, ленты)
- `/:projectId/contests/:contestId` — страница конкурса (отдельная страница, не вложена в проект)

## Данные и модели

- Типы данных: `src/types/index.ts`
- Seed-данные:
  - проекты: `src/data/projects.ts` (`projects`)
  - конкурсы + заявки: `src/data/projects.ts` (`contests`)
- Хелперы поиска:
  - `getProjectById(projectId)`
  - `getContestById(projectId, contestId)`

### Что отображается

- **Главная** (`src/pages/HomePage.tsx`):
  - сетка карточек проектов из `projects`
  - переход на `/:projectId`
- **Проект** (`src/pages/ProjectPage.tsx`):
  - “баннер” (градиент) + заголовок/подзаголовок/теги
  - блок “О проекте”
  - блок “Ответственные лица” (фото/ФИО/роль)
  - ленты: новости / конкурсы / диктанты
  - конкурсы кликабельны и ведут на `/:projectId/contests/:contestId`
- **Конкурс** (`src/pages/ContestPage.tsx`):
  - описание и CTA “Подать заявку”
  - список **только одобренных** заявок (`approved: true`)
  - голосование за одобренные заявки (toggle)

## Заявки, модерация и голосование (wireframe-логика)

### Модерация

В прототипе модерация моделируется флагом:

- `Application.approved: boolean`

Форма “Подать заявку” создаёт заявку с `approved: false` (поэтому она не появится в списке одобренных).

### localStorage

Нужен, чтобы в прототипе сохранялись:

- **Отправленные пользователем заявки** (в рамках конкурса)
- **Голос пользователя** за конкретные заявки (в рамках конкурса)

Ключи:

- `applications:<projectId>:<contestId>` → массив `Application[]`
- `votes:<projectId>:<contestId>` → объект `{ [applicationId]: true }`

Служебные функции:

- `src/lib/storage.ts` — безопасные JSON read/write helpers
- `src/features/applications/useContestApplications.ts` — чтение/добавление заявок
- `src/features/voting/useContestVotes.ts` — чтение/переключение голоса

### Счётчик голосов

В seed-данных у каждой заявки есть `seedVotes`.  
На экране показываем: `seedVotes + (voted ? 1 : 0)`.

## Layout (общие элементы)

- `src/layout/Layout.tsx` — общий каркас страницы
- `src/layout/Header.tsx` — шапка (логотип/название + ссылка “Главная”)
- `src/layout/Footer.tsx` — футер (копирайт + ссылки-заглушки)

## Tailwind

- `src/index.css` содержит `@import "tailwindcss";`
- Tailwind подключён как плагин Vite в `vite.config.ts` (`@tailwindcss/vite`)

## Структура проекта

```
prototype/
  src/
    components/               # UI-кирпичики (Modal)
    data/                     # seed-данные
    features/
      applications/           # работа с localStorage заявок
      voting/                 # работа с localStorage голосов
    layout/                   # Header/Footer/Layout
    lib/                      # storage helpers
    pages/                    # Home/Project/Contest
    types/                    # доменные типы
    router.tsx                # роутинг
    main.tsx / App.tsx        # входные точки
```

## Быстрая проверка вручную

1. Откройте `/` — должны быть карточки проектов.
2. Перейдите в проект — блоки и ленты должны рендериться из seed-данных.
3. Откройте конкурс из ленты конкурса — должна открыться отдельная страница.
4. Нажмите “Подать заявку”, заполните форму и отправьте:
   - появится уведомление “ждёт модерации”
   - заявка сохранится в `localStorage`, но не появится в “Одобренных” (approved=false).
5. В “Одобренных заявках” нажмите “Голосовать”:
   - кнопка переключится в состояние “Голос учтён”
   - счётчик увеличится на 1 и сохранится в `localStorage`.

