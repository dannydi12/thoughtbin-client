import React from 'react';
import routeData from 'react-router';
import ReactDOM from 'react-dom';
import ThoughtList from './ThoughtList';

const thoughtsFixture = [
  {
    id: 1,
    userId: 'any-user-id',
    created_at: new Date('2039-01-22T16:28:32.615Z').toISOString(),
    content: 'We do not merely destroy our enemies; we change them.',
  },
  {
    id: 2,
    userId: 'any-user-id',
    created_at: new Date('2022-01-22T16:28:32.615Z').toISOString(),
    content: 'War is peace. Freedom is slavery. Ignorance is strength.',
  },
  {
    id: 3,
    userId: 'any-user-id',
    created_at: new Date('2020-01-22T16:28:32.615Z').toISOString(),
    content: 'The best books... are those that tell you what you know already.',
  },
  {
    id: 4,
    userId: 'any-user-id',
    created_at: new Date('1984-01-22T16:28:32.615Z').toISOString(),
    content: 'Big Brother is Watching You.',
  },
];

it('renders without crashing', () => {
  const mockLocation = {
    pathname: '/thoughts',
    hash: '',
    search: '',
    state: '',
  };

  jest.spyOn(routeData, 'useRouteMatch').mockReturnValue(mockLocation);

  const div = document.createElement('div');
  ReactDOM.render(<ThoughtList thoughts={thoughtsFixture} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
