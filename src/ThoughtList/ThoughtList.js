import React, { useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import PropTypes from 'prop-types';
import ThoughtCard from '../ThoughtCard/ThoughtCard';
import { getThoughtById } from '../services/thoughtService';
import NewThoughtForm from '../NewThoughtForm/NewThoughtForm';
import './ThoughtList.css';

function ThoughtList(props) {
  const [thoughts, setThoughts] = useState(props.thoughts);

  const match = useRouteMatch('/thoughts') || '';
  const singleThought = useRouteMatch('/thoughts/:thoughtId') || '';

  const thoughtCards = thoughts.map((thought) => (
    <ThoughtCard key={thought.id} thought={thought} />
  ));

  useEffect(() => {
    if (singleThought.isExact) {
      getThoughtById(singleThought.params.thoughtId)
        .then((thought) => {
          setThoughts([thought]);
        })
        .catch(() => {
          setThoughts([]);
        });
    }
  }, []);

  useEffect(() => {
    if (!singleThought.isExact) {
      setThoughts(props.thoughts);
    }
  }, [props.thoughts]);

  useEffect(() => {
    if (match.isExact) {
      const createThoughtForm = document.getElementById('create-new-thought');
      createThoughtForm.focus();
    }
  }, [match.isExact]);

  return (
    <section className={`thought-list ${!match ? 'all-thoughts' : ''}`}>
      {match.isExact && <NewThoughtForm />}
      {thoughtCards}
      {thoughtCards.length === 0 && <p>Wow, such empty...</p>}
    </section>
  );
}

ThoughtList.propTypes = {
  thoughts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      userId: PropTypes.string,
      content: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
};

export default ThoughtList;
