import BookSearch from '../components/BookSearch';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import ReactDOM from 'react-dom';
import { StaticRouter, Redirect } from 'react-router-dom';
import { configure, shallow } from 'enzyme';
import { renderRoutes } from 'react-router-config';

configure({ adapter: new Adapter() });

describe('BookSearch.js -> <BookSearch />', () => {
  const event = {
    preventDefault: () => {}
  };

  beforeEach(() => {
    global.fetch = jest.fn().mockImplementation((url, body) => {
      if (url === '/livecheck') {
        return Promise.resolve({
          status: 200,
          json: () => {
            return {
              status: 'Running!'
            };
          }
        });
      } else if (url.startsWith('/v1/books')) {
        return Promise.resolve({
          status: 200,
          json: () => {
            return new Promise((resolve, rejct) => {
              resolve({ relatedBooks: ['Harry Potter'] });
            });
          }
        });
      }
    });
  });

  it('renders without crashing', () => {
    const wrapper = shallow(<BookSearch />);
    expect(wrapper.state().response).toEqual('');
  });

  it('renders and calls livecheck API correctly', () => {
    const app = shallow(<BookSearch />);

    return app.instance().callApi()
      .then((response) => {
        expect(global.fetch).toHaveBeenCalledWith('/livecheck');
        expect(response).toEqual({
          status: 'Running!'
        });
      });
  });

  it('renders and calls books API on handleSubmit with input', async () => {
    const app = shallow(<BookSearch />).instance();
    app.state.post = 'test';

    return app.handleSubmit(event)
      .then((response) => {
        expect(global.fetch).toHaveBeenCalledWith('/v1/books?q=test', expect.anything());
        expect(app.state.responseToPost).toEqual(['Harry Potter']);
      });
  });

  it('alerts on handleSubmit with blank input', () => {
    window.alert = jest.fn();

    const app = shallow(<BookSearch />).instance();
    app.state.post = '';

    app.handleSubmit(event);
    expect(window.alert).toHaveBeenCalledWith('Value should not be empty!');
  });
});
