
import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

const HomePage = lazy(() => import('../pages/home/page'));
const DevVibePage = lazy(() => import('../pages/devvibe/page'));
const JobsPage = lazy(() => import('../pages/jobs/page'));
const CreateJobPage = lazy(() => import('../pages/jobs/create/page'));
const FindTeammatesPage = lazy(() => import('../pages/find-teammates/page'));
const MyProjectsPage = lazy(() => import('../pages/my-projects/page'));
const ProjectDetailPage = lazy(() => import('../pages/my-projects/detail/page'));
const LoginPage = lazy(() => import('../pages/login/page'));
const SignupPage = lazy(() => import('../pages/signup/page'));
const NotFoundPage = lazy(() => import('../pages/NotFound'));

const routes: RouteObject[] = [
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/devvibe',
    element: <DevVibePage />,
  },
  {
    path: '/jobs',
    element: <JobsPage />,
  },
  {
    path: '/jobs/create',
    element: <CreateJobPage />,
  },
  {
    path: '/find-teammates',
    element: <FindTeammatesPage />,
  },
  {
    path: '/my-projects',
    element: <MyProjectsPage />,
  },
  {
    path: '/my-projects/:projectId',
    element: <ProjectDetailPage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/signup',
    element: <SignupPage />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
];

export default routes;
