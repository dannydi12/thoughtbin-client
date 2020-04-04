import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import EditThoughtForm from './EditThoughtForm';

configure({ adapter: new Adapter() });

beforeAll(() => {
  const div = document.createElement('div');
  window.domNode = div;
  document.body.appendChild(div);
});

it('renders without crashing', () => {
  const thought = {
    id: 777,
    userId: '443c043a-b026-4a96-8ca9-903f795c47c1',
    content: 'Orthodoxy means not thinking--not needing to think. Orthodoxy is unconsciousness.',
  };

  shallow(<EditThoughtForm thought={thought} cancelEdit={() => { }} />,
    { attachTo: window.domNode });
});
