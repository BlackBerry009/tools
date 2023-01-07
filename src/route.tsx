import { RouteObject, useRoutes } from 'react-router-dom';
import { LayoutApp } from './components/Layout';
import { Song } from './pages/Song';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <LayoutApp />,
    children: [
      {
        index: true,
        element: <Song />
      },
      {
        path: 'song',
        element: <Song />
      }
    ]
  }
];

export const App = () => {
  return useRoutes(routes);
};
