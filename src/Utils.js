const formHandler = (thought, setThoughtForm) => {
  autoExpandText(thought)

  setThoughtForm({
    length: thought.value.length
  })
}

const autoExpandText = (field) => {
  field.style.height = 'inherit';
  field.style.height = field.scrollHeight + 'px';
}

export {formHandler};