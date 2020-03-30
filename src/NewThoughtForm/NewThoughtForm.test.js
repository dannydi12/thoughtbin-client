import React from 'react';
import ReactDOM from 'react-dom';
import NewThoughtForm from './NewThoughtForm';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<NewThoughtForm />, div);
  ReactDOM.unmountComponentAtNode(div);
});