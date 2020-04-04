import React from 'react';
import ReactDOM from 'react-dom';
import EditButton from './EditButton';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<EditButton clickFunction={() => {}} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
