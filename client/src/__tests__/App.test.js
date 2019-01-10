import App from '../App';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import ReactDOM from 'react-dom';
import { configure, shallow } from 'enzyme';

configure({ adapter: new Adapter() });

describe('App.js -> <App />', () => {
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
            return {
              relatedBooks: ['Harry Potter']
            };
          }
        });
      }
    });
  });

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
  });

  it('renders and calls livecheck API correctly', () => {
    const app = shallow(<App />);
    expect.assertions(2);

    return app.instance().callApi()
      .then((response) => {
        expect(global.fetch).to.have.been.called.with('http://localhost:5000/livecheck');
        expect(response).toEqual({
          status: 'Running!'
        });
      });
  });

  it('renders and calls books API on handleSubmit with input', () => {
    const app = shallow(<App />).instance();
    app.state.post = 'test';
    expect.assertions(2);

    return app.handleSubmit(event)
      .then((response) => {
        expect(global.fetch).toHaveBeenCalledWith('/v1/books?q=test', expect.anything());
        expect(app.state.responseToPost).toEqual(['Harry Potter']);
      });
  });

  it('alerts on handleSubmit with blank input', () => {
    window.alert = jest.fn();

    const app = shallow(<App />).instance();
    app.state.post = '';
    expect.assertions(1);

    app.handleSubmit(event)
      .then(() => {
        expect(window.alert).toHaveBeenCalledWith('Value should not be empty!');
      });
  });
});
