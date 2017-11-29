import Content from './components/Content/ContentFilm';
import MoveDescription from './components/MoveDescription/MoveDescription';

export default [
  {
    path: '/film/:query/:id',
    component: MoveDescription
  },
  {
    path: '/search/:query',
    component: Content
  },
  {
    path: '/film/:query',
    component: Content
  },
]