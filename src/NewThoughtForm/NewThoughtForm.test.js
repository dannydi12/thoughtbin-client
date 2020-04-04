import React from 'react';
import ReactDOM from 'react-dom';
import NewThoughtForm from './NewThoughtForm';

it('renders without crashing', () => {
  const thought = {
    id: 1,
    userId: 'any-user-id',
    created_at: new Date('2039-01-22T16:28:32.615Z').toISOString(),
    content: 'We do not merely destroy our enemies; we change them.',
  };

  const div = document.createElement('div');
  ReactDOM.render(<NewThoughtForm thought={thought} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
