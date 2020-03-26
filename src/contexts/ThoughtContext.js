import React from 'react';

const ThoughtContext = React.createContext({
  addToThoughtList: () => {},
  removeFromThoughtList: () => {},
  editThoughtInList: () => {}
})

export default ThoughtContext;