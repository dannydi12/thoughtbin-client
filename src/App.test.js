import React from 'react';
import routeData from 'react-router';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';

it('renders without crashing', () => {
  const mockLocation = {
    pathname: '/thoughts',
    hash: '',
    search: '',
    state: '',
  };

  jest.spyOn(routeData, 'useRouteMatch').mockReturnValue(mockLocation);

  const div = document.createElement('div');
  ReactDOM.render(
    <Router>
      <App />
    </Router>, div,
  );
  ReactDOM.unmountComponentAtNode(div);
});
