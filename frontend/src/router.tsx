import { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { ROUTER_PATH } from '@/constants/path';
import App from '@/App';

import MainPage from '@/pages/MainPage';
import LandingPage from '@/pages/LandingPage';

const SocialMainPage = lazy(() => import('@/pages/SocialMainPage'));
const SocialResultPage = lazy(() => import('@/pages/SocialResultPage'));
const YoutubeMainPage = lazy(() => import('@/pages/YoutubeMainPage'));
const YoutubeResultPage = lazy(() => import('@/pages/YoutubeResultPage'));
const ComparisonMainPage = lazy(() => import('@/pages/ComparisonMainPage'));
const ComparisonResultPage = lazy(() => import('@/pages/ComparisonResultPage'));
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true,
        path: '/',
        element: <MainPage />,
      },
      {
        path: ROUTER_PATH.LANDING_PAGE,
        element: <LandingPage />,
      },
      {
        path: ROUTER_PATH.SOCIAL_MAIN_PAGE,
        element: (
          <Suspense>
            <SocialMainPage />
          </Suspense>
        ),
      },
      {
        path: ROUTER_PATH.SOCIAL_RESULT_PAGE,
        element: (
          <Suspense>
            <SocialResultPage />
          </Suspense>
        ),
      },
      {
        path: ROUTER_PATH.YOUTUBE_MAIN_PAGE,
        element: (
          <Suspense>
            <YoutubeMainPage />
          </Suspense>
        ),
      },
      {
        path: ROUTER_PATH.YOUTUBE_RESULT_PAGE,
        element: (
          <Suspense>
            <YoutubeResultPage />
          </Suspense>
        ),
      },
      {
        path: ROUTER_PATH.COMPARISON_MAIN_PAGE,
        element: (
          <Suspense>
            <ComparisonMainPage />
          </Suspense>
        ),
      },
      {
        path: ROUTER_PATH.COMPARISON_RESULT_PAGE,
        element: (
          <Suspense>
            <ComparisonResultPage />
          </Suspense>
        ),
      },
    ],
  },
]);

export default router;
