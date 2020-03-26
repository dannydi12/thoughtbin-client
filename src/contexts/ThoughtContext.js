import React from 'react';

const ThoughtContext = React.createContext({
  addThought: () => {},
  deleteThought: () => {},
  editThought: () => {}
})

export default ThoughtContext;