import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { ROUTER_PATH } from '@/constants/path';
import App from '@/App';

const MainPage = lazy(() => import('@/pages/MainPage'));
const LandingPage = lazy(() => import('@/pages/LandingPage'));
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
        element: <SocialMainPage />,
      },
      {
        path: ROUTER_PATH.SOCIAL_RESULT_PAGE,
        element: <SocialResultPage />,
      },
      {
        path: ROUTER_PATH.YOUTUBUE_MAIN_PAGE,
        element: <YoutubeMainPage />,
      },
      {
        path: ROUTER_PATH.YOUTUBUE_RESULT_PAGE,
        element: <YoutubeResultPage />,
      },
      {
        path: ROUTER_PATH.COMPARISON_MAIN_PAGE,
        element: <ComparisonMainPage />,
      },
      {
        path: ROUTER_PATH.COMPARISON_RESULT_PAGE,
        element: <ComparisonResultPage />,
      },
    ],
  },
]);

export default router;
