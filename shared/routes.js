// shared/routes.js
import BookSearch from './components/BookSearch';
import Conversation from './components/Conversation';
import NotFound from './components/NotFound';
const routes = [
  {
    path: '/booksearch',
    exact: true,
    component: BookSearch
  },
  {
    path: '/conversation',
    component: Conversation
  },
  {
    path: '*',
    restricted: false,
    component: NotFound
  }
];
export default routes;
