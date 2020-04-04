import React from 'react';
import ReactDOM from 'react-dom';
import ShareButton from './ShareButton';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ShareButton clickFunction={() => {}} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
