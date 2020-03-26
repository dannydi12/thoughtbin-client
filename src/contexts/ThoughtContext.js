import React from 'react';

const ThoughtContext = React.createContext({
  addUserThought: () => {},
  deleteThought: () => {},
  editThought: () => {}
})

export default ThoughtContext;