import { Navigate, createBrowserRouter } from 'react-router-dom'
import { Layout } from './layout/Layout'
import { ContestPage } from './pages/ContestPage'
import { HomePage } from './pages/HomePage'
import { LkLoginPage } from './pages/LkLoginPage'
import { LkLayout } from './pages/LkLayout'
import { LkActivityPage } from './pages/LkActivityPage'
import { LkActivityVotesPage } from './pages/LkActivityVotesPage'
import { LkContestApplicationPage } from './pages/LkContestApplicationPage'
import { LkContestPage } from './pages/LkContestPage'
import { LkContestsPage } from './pages/LkContestsPage'
import { LkProfilePage } from './pages/LkProfilePage'
import { LkSurveysPage } from './pages/LkSurveysPage'
import { ProjectPage } from './pages/ProjectPage'
import { contests, getProjectById } from './data/projects'

const lkContestTitles: Record<string, string> = {
  'kids-drawing': 'Детский рисунок',
  'best-home-yard': 'Лучший дом, лучший двор',
  'best-photo': 'Лучшее фото кота',
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    handle: {
      crumb: () => ({ label: 'Главная', to: '/' }),
    },
    children: [
      { index: true, element: <HomePage /> },
      {
        path: 'lk/login',
        element: <LkLoginPage />,
        handle: { crumb: () => ({ label: 'Войти', to: '/lk/login' }) },
      },
      // contest details in LK: without LK tabs/layout
      {
        path: 'lk/contests/:contestId',
        element: <LkContestPage />,
        handle: {
          hideBreadcrumbs: true,
          crumb: (m: any) => ({
            label: m?.params?.contestId ?? 'Конкурс',
            to: `/lk/contests/${m?.params?.contestId ?? ''}`,
          }),
        },
      },
      {
        path: 'lk',
        element: <LkLayout />,
        handle: { crumb: () => ({ label: 'Личный кабинет', to: '/lk/profile' }) },
        children: [
          { index: true, element: <LkProfilePage /> },
          {
            path: 'profile',
            element: <LkProfilePage />,
            handle: { crumb: () => ({ label: 'Профиль', to: '/lk/profile' }) },
          },
          { path: 'activity', element: <Navigate to="/lk/dictations" replace /> },
          {
            path: 'dictations',
            element: <LkActivityPage />,
            handle: { crumb: () => ({ label: 'Диктанты', to: '/lk/dictations' }) },
          },
          { path: 'dictations/votes', element: <LkActivityVotesPage /> },
          { path: 'dictations/dictations', element: <Navigate to="/lk/dictations" replace /> },
          {
            path: 'contests',
            element: <LkContestsPage />,
            handle: { crumb: () => ({ label: 'Конкурсы', to: '/lk/contests' }) },
          },
          {
            path: 'contests/:contestId/application',
            element: <LkContestApplicationPage />,
            handle: {
              crumb: (m: any) => {
                const id = m?.params?.contestId
                const contestTitle = id
                  ? contests.find((c) => c.id === id)?.title
                  : undefined
                const title =
                  contestTitle ?? (id ? lkContestTitles[id] : undefined) ?? id ?? 'Конкурс'

                return [
                  { label: 'Конкурсы', to: '/lk/contests' },
                  {
                    label: `Моя заявка на конкурс ${title}`,
                    to: `/lk/contests/${id ?? ''}/application`,
                  },
                ]
              },
            },
          },
          {
            path: 'surveys',
            element: <LkSurveysPage />,
            handle: { crumb: () => ({ label: 'Опросы', to: '/lk/surveys' }) },
          },
        ],
      },
      {
        path: ':projectId/contests/:contestId',
        element: <ContestPage />,
        handle: {
          hideBreadcrumbs: true,
          crumb: (m: any) => ({
            label: 'Конкурс',
            to: `/${m?.params?.projectId ?? ''}/contests/${m?.params?.contestId ?? ''}`,
          }),
        },
      },
      {
        path: ':projectId',
        element: <ProjectPage />,
        handle: {
          hideBreadcrumbs: true,
          crumb: (m: any) => {
            const id = m?.params?.projectId
            const title = id ? getProjectById(id)?.title : undefined
            return { label: title ?? id ?? 'Проект', to: `/${id ?? ''}` }
          },
        },
      },
    ],
  },
])

