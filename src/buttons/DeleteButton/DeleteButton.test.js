import React from 'react';
import ReactDOM from 'react-dom';
import DeleteButton from './DeleteButton';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<DeleteButton clickFunction={() => {}}/>, div);
  ReactDOM.unmountComponentAtNode(div);
});