import {Route, Routes} from 'react-router-dom';
import {EPath} from '../enums/EPath';
import NotFound from '../views/NotFound';
import Todolist from '../views/Todolist';

enum ERoute {
  Path = 'path',
  Component = 'Component',
}

interface IRoute {
  [ERoute.Path]: EPath;
  [ERoute.Component](): JSX.Element;
}

const publicRoutes: IRoute[] = [
  {[ERoute.Path]: EPath.NotFound, [ERoute.Component]: NotFound},
  {[ERoute.Path]: EPath.TodoList, [ERoute.Component]: Todolist},
];

const AppRouter = () => (
  <Routes>
    {publicRoutes.map(({path, Component}) => (
      <Route key={path} path={path} element={<Component />} />
    ))}
  </Routes>
);

export default AppRouter;
