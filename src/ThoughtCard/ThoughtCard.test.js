import React from 'react';
import routeData from 'react-router';
import ReactDOM from 'react-dom';
import ThoughtCard from './ThoughtCard';

it('renders without crashing', () => {
  const mockLocation = {
    pathname: '/thoughts',
    hash: '',
    search: '',
    state: ''
  }
  
  jest.spyOn(routeData, 'useRouteMatch').mockReturnValue(mockLocation)

  const thought = {
    id: 777,
    userId: '443c043a-b026-4a96-8ca9-903f795c47c1',
    content: 'Orthodoxy means not thinking--not needing to think. Orthodoxy is unconsciousness.'
  }

  const div = document.createElement('div');
  ReactDOM.render(<ThoughtCard thought={thought} />, div);
  ReactDOM.unmountComponentAtNode(div);
});