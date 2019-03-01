// shared/routes.js
import BookSearch from './components/BookSearch';
import Conversation from './components/Conversation';
import ChatBot from './components/ChatBot';
import NotFound from './components/NotFound';
import Root from './components/Root';
import Home from './components/Home';
const routes = [
  {
    component: Root,
    routes: [
      {
        path: '/',
        exact: true,
        component: Home
      },
      {
        path: '/booksearch',
        exact: true,
        component: BookSearch
      },
      {
        path: '/conversation',
        exact: true,
        component: Conversation
      },
      {
        path: '/chatbot',
        exact: true,
        component: ChatBot
      },
      {
        path: '*',
        restricted: false,
        component: NotFound
      }
    ]
  }
];
export default routes;
