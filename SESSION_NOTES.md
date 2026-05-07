# Prototype — заметки для следующей сессии

Эта памятка фиксирует, что уже сделано в прототипе, где это лежит в коде и как быстро поднять проект локально.

## Стек

- React 19 + Vite 8 + TypeScript
- React Router 7 (`react-router-dom`)
- Tailwind CSS 4 (через `@tailwindcss/vite`)

## Запуск локально

Vite 8 требует Node **20.19+** или **22.12+**. В окружении с Node 20.18 запускали через временный Node 22:

```bash
cd "prototype"
npx -y -p node@22 -c "npm install"
npx -y -p node@22 -c "npm run dev -- --host --port 5173"
```

Открывать: `http://localhost:5173/`

## Шапка и футер

- **Header**: `src/layout/Header.tsx`
  - слева: логотип `public/er-logo.png` (скачан с Wikipedia)
  - справа:
    - неавторизован → кнопка `Войти` (`/lk/login`)
    - авторизован → ФИО/телефон (ссылка на `/lk/profile`) + иконка logout (очищает сессию и возвращает на `/`)
- **Footer**: `src/layout/Footer.tsx`
  - название: «Проекты Партии»
  - юридический текст + «Разработано в Кортекс»

## Навигация: хлебные крошки + «назад»

- Компонент: `src/components/Breadcrumbs.tsx`
  - слева стоит компактная ссылка `←` (реально ходит по history назад, иначе ведёт на `/`)
  - крошки строятся через `handle.crumb` из роутера
- Подключено глобально в layout: `src/layout/Layout.tsx`
- Подписи крошек задаются в: `src/router.tsx`

## Seed / мок-данные проектов

Файл: `src/data/projects.ts`

Проекты (3 шт):
- `digital-portal` — «Цифровая Россия»
- `housing-school` — «Школа ЖКХ»
- `kids-sport` — «Детский спорт»

Также там же:
- `contests: Contest[]` — мок конкурсов и заявок для страницы конкурса проекта (`/:projectId/contests/:contestId`)

## LocalStorage: ключи

Хелперы: `src/lib/storage.ts`

- **Сессия**: `session:user` → `{ phone, createdAt }`
  - код: `src/features/auth/session.ts`, `src/features/auth/useSession.ts`
- **Профиль**: `profile:<phone>` → расширенная модель (регион/адрес/ФИО по частям/пол/дата рождения/email/«являюсь»)
  - код: `src/features/profile/profile.ts`, форма: `src/pages/LkProfilePage.tsx`
- **Опросы (история)**: `surveys:<phone>` → `SurveyHistoryEntry[]`
  - код: `src/features/surveysHistory/surveysHistory.ts`
- **Диктанты (результаты + сертификат PNG)**:
  - `dictationResult:<phone>:<dictationId>` → `{ dictationId, scorePercent, completedAt, certificatePngDataUrl }`
  - генерация PNG: `src/features/dictations/certificate.ts`
  - модель: `src/features/dictations/results.ts`
  - листинг результатов: `src/features/dictations/listResults.ts`
- **Заявки на конкурс**: `applications:<projectId>:<contestId>` → `Application[]`
  - хук: `src/features/applications/useContestApplications.ts`
- **Голоса в конкурсе**: `votes:<projectId>:<contestId>` → `{ [applicationId]: true }`
  - хук: `src/features/voting/useContestVotes.ts`
  - история голосов: `src/features/votesHistory/votesHistory.ts`

## Роуты

Основной роутер: `src/router.tsx`

### Публичные

- `/` — список проектов (`src/pages/HomePage.tsx`)
- `/:projectId` — страница проекта (`src/pages/ProjectPage.tsx`)
- `/:projectId/contests/:contestId` — страница конкурса проекта (`src/pages/ContestPage.tsx`)

### ЛК (логин)

- `/lk/login` — вход по телефону (имитация) (`src/pages/LkLoginPage.tsx`)

### ЛК (вкладки внутри `LkLayout`)

Layout вкладок: `src/pages/LkLayout.tsx`

- `/lk` — редирект/дефолт на профиль (index в `LkLayout`)
- `/lk/profile` — профиль (поля как на присланном скрине) (`src/pages/LkProfilePage.tsx`)
- `/lk/dictations` — вкладка «Диктанты» со всеми результатами + компактными сертификатами (`src/pages/LkActivityPage.tsx`)
- `/lk/dictations/votes` — «Смотреть все» по голосованиям (используется в wireframe-логике ЛК) (`src/pages/LkActivityVotesPage.tsx`)
- `/lk/surveys` — вкладка «Опросы» (история прохождений) (`src/pages/LkSurveysPage.tsx`)
- `/lk/contests` — вкладка «Конкурсы» (список конкурсов + блоки «моя заявка»/«мои голоса») (`src/pages/LkContestsPage.tsx`)
- `/lk/contests/:contestId/application` — страница «моя заявка» (wireframe) (`src/pages/LkContestApplicationPage.tsx`)

Примечание: старый путь `/lk/activity` сохранён как редирект на `/lk/dictations` (совместимость с предыдущими заметками/ссылками).

### Деталка конкурса “как на проде” (БЕЗ вкладок ЛК)

Чтобы на деталке не показывались заголовок ЛК и табы, маршрут вынесен из `LkLayout`:

- `/lk/contests/:contestId` — детальная страница конкурса по структуре как в примере (`src/pages/LkContestPage.tsx`)
  - реализованы блоки: заголовок+анонс+CTA, стадии, описание, номинации, поданные заявки, организатор, партнёры
  - сделано для трёх конкурсов: `kids-drawing`, `best-home-yard`, `best-photo`

## Вкладка «Диктанты»: сертификаты компактно

Файл: `src/pages/LkActivityPage.tsx`

- сертификат показывается маленькой миниатюрой
- при наведении — оверлей «Скачать сертификат»
- по клику скачивается полный PNG (`download`)
- бейдж с процентами убран, вместо него строка вида: «Ваш результат: X из 30 (Y%)»
- ниже добавлен блок пустого состояния для wireframe: «Вы пока не прошли ни одного диктанта…»

## Примечания по мокам

- В `LkSurveysPage.tsx` и `LkContestsPage.tsx` внизу есть блоки «пустого состояния» (показываются всегда как wireframe-демо).
- В `LkSurveysPage.tsx` есть демо-сидинг опросов, если истории нет.
- В `LkActivityPage.tsx` есть демо-сидинг результатов диктантов, если их ещё нет.

