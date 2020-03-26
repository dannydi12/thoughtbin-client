import React from 'react';

const ThoughtContext = React.createContext({
  addThought: () => {},
  removeFromThoughtList: () => {},
  editThought: () => {}
})

export default ThoughtContext;