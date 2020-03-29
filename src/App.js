import React from 'react';
import { Route, withRouter } from 'react-router-dom';
import InfiniteScroll from "react-infinite-scroll-component";
import config from './config';
import ThoughtContext from './contexts/ThoughtContext';
import { getToken } from './services/authService';
import { getAllThoughts, getUserThoughts } from './services/thoughtService';
import ThoughtList from './ThoughtList/ThoughtList';
import './App.css';
import Header from './Header/Header';

class App extends React.Component {
  state = {
    allThoughts: [],
    userThoughts: [],
    newThoughtCount: 0,
  }

  addToThoughtList = (newThought) => {
    this.setState({
      userThoughts: [newThought, ...this.state.userThoughts]
    })
  }

  addToAllThoughtsList = (newThought) => {
    this.setState({
      allThoughts: [newThought, ...this.state.allThoughts],
    })
  }

  editThoughtInList = (editedThought) => {
    const withEditedThought = this.state.userThoughts.map(thought => {
      if (thought.id === editedThought.id) {
        thought.content = editedThought.content;
        return thought;
      } else {
        return thought;
      }
    })

    this.setState({
      userThoughts: withEditedThought
    })
  }

  removeFromThoughtList = (thoughtId) => {
    this.setState({
      allThoughts: this.state.allThoughts.filter(thought => thought.id !== thoughtId),
      userThoughts: this.state.userThoughts.filter(thought => thought.id !== thoughtId)
    })

    if (this.state.allThoughts.find(thought => thought.id === thoughtId)) {
      this.setState({
        newThoughtCount: this.state.newThoughtCount - 1
      })
    }
  }

  getMoreThoughts = () => {
    getAllThoughts(this.state.allThoughts.length)
      .then(newThoughts => {
        this.setState({
          allThoughts: [...this.state.allThoughts, ...newThoughts].filter((thought, index, self) => self.indexOf(thought) === index)
        })
      })
  }

  getMoreUserThoughts = () => {
    getUserThoughts(this.state.userThoughts.length)
      .then(newThoughts => {
        this.setState({
          userThoughts: [...this.state.userThoughts, ...newThoughts].filter((thought, index, self) => self.indexOf(thought) === index)
        })
      })
  }

  componentDidMount() {
    new Promise((resolve, reject) => {
      if (!localStorage.getItem('token')) {
        getToken().then(() => resolve())
      } else {
        resolve()
      }
    })
      .then(() => {
        Promise.all([getAllThoughts(), getUserThoughts()])
          .then(response => {
            this.setState({
              allThoughts: response[0],
              userThoughts: response[1]
            })
          })
      })


    const ws = new WebSocket(config.WS_URL);
    ws.onmessage = (message) => {
      const incomingThought = JSON.parse(message.data);
      this.addToAllThoughtsList(incomingThought);
      this.setState({
        newThoughtCount: this.state.newThoughtCount + 1
      })
    }
  }

  switchViews = () => {
    if (this.props.location.pathname === '/thoughts') {
      return this.props.history.push('/')
    }
    return this.props.history.push('/thoughts')
  }

  render() {
    return (
      <ThoughtContext.Provider value={{
        addToThoughtList: this.addToThoughtList,
        editThoughtInList: this.editThoughtInList,
        removeFromThoughtList: this.removeFromThoughtList
      }}>
        <main>
          <Header />
          <svg className='brainbox' viewBox="-2 0 480 480" xmlns="http://www.w3.org/2000/svg">
            <path d="m325.65625 80 16 24v40l-24 24v16l-32 8-8 24h-24l-16-16v-176l16-16h24l8 24h24l16 16zm0 0" fill="#8fceec67" />
            <path d="m189.65625 32 8-24h24l16 16v176l-16 16h-24l-8-24-32-8v-16l-24-24v-40l16-24v-32l16-16zm0 0" fill="#8fceec67" />
            <g fill="#28ACFF">
              <path d="m412.511719 275.878906c-1.445313-2.40625-4.046875-3.878906-6.855469-3.878906h-336c-2.789062.03125-5.355469 1.535156-6.746094 3.953125l-.109375-.074219-48 80c-1.484375 2.472656-1.527343 5.550782-.105469 8.058594 1.417969 2.511719 4.078126 4.0625 6.960938 4.0625h40v104c0 4.417969 3.582031 8 8 8h336c4.417969 0 8-3.582031 8-8v-104h40c2.882812 0 5.542969-1.550781 6.960938-4.0625 1.417968-2.507812 1.378906-5.585938-.105469-8.058594zm-376.71875 76.121094 25.863281-43.113281v43.113281zm137.863281 112h-96v-176h96zm224 0h-208v-155.121094l33.144531 55.242188c1.445313 2.40625 4.046875 3.878906 6.855469 3.878906h168zm-163.472656-112-38.398438-64h205.34375l38.398438 64zm0 0" />
              <path d="m349.65625 432h32v16h-32zm0 0" />
              <path d="m317.65625 432h16v16h-16zm0 0" />
              <path d="m365.65625 176h16v32h-16zm0 0" />
              <path d="m365.65625 224h16v16h-16zm0 0" />
              <path d="m397.65625 192h16v32h-16zm0 0" />
              <path d="m397.65625 240h16v16h-16zm0 0" />
              <path d="m93.65625 176h16v32h-16zm0 0" />
              <path d="m93.65625 224h16v16h-16zm0 0" />
              <path d="m61.65625 192h16v32h-16zm0 0" />
              <path d="m61.65625 240h16v16h-16zm0 0" />
              <path d="m435.3125 53.65625-11.3125-11.3125c-30.648438 31.714844-48.566406 73.589844-50.34375 117.65625h16c1.9375-39.785156 18.144531-77.539062 45.65625-106.34375zm0 0" />
              <path d="m429.65625 176c1.9375-39.785156 18.144531-77.539062 45.65625-106.34375l-11.3125-11.3125c-30.648438 31.714844-48.566406 73.589844-50.34375 117.65625zm0 0" />
              <path d="m101.65625 160c-1.78125-44.066406-19.699219-85.941406-50.34375-117.65625l-11.3125 11.3125c27.445312 28.847656 43.640625 66.578125 45.65625 106.34375zm0 0" />
              <path d="m61.65625 176c-1.78125-44.066406-19.699219-85.941406-50.34375-117.65625l-11.3125 11.3125c27.445312 28.847656 43.640625 66.578125 45.65625 106.34375zm0 0" />
              <path d="m280 117.65625 11.3125-11.3125-13.65625-13.65625v-20.6875h-16v24c0 2.121094.84375 4.15625 2.34375 5.65625zm0 0" />
              <path d="m283.3125 130.34375-11.3125 11.3125 5.65625 5.65625v12.6875h16v-16c0-2.121094-.84375-4.15625-2.34375-5.65625zm0 0" />
              <path d="m149.65625 171.3125v12.6875c0 3.671875 2.5 6.871094 6.0625 7.761719l27.738281 6.933593 6.613281 19.832032c1.089844 3.265625 4.144532 5.46875 7.585938 5.472656h24c2.121094 0 4.15625-.84375 5.65625-2.34375l10.34375-10.34375 10.34375 10.34375c1.5 1.5 3.535156 2.34375 5.65625 2.34375h24c3.441406-.003906 6.496094-2.207031 7.582031-5.472656l6.617188-19.832032 27.738281-6.933593c3.5625-.890625 6.0625-4.089844 6.0625-7.761719v-12.6875l21.65625-21.65625c1.5-1.5 2.34375-3.535156 2.34375-5.65625v-40c-.003906-1.578125-.46875-3.125-1.34375-4.441406l-14.65625-21.957032v-29.601562c0-2.121094-.84375-4.15625-2.34375-5.65625l-16-16c-1.5-1.5-3.535156-2.34375-5.65625-2.34375h-18.230469l-6.1875-18.527344c-1.085937-3.265625-4.140625-5.46874975-7.582031-5.472656h-24c-2.121094 0-4.15625.84375-5.65625 2.34375l-10.34375 10.34375-10.34375-10.34375c-1.5-1.5-3.535156-2.34375-5.65625-2.34375h-24c-3.441406.00390625-6.496094 2.207031-7.585938 5.472656l-6.183593 18.527344h-18.230469c-2.121094 0-4.15625.84375-5.65625 2.34375l-16 16c-1.5 1.5-2.34375 3.535156-2.34375 5.65625v29.601562l-14.65625 21.984376c-.871094 1.308593-1.335938 2.84375-1.34375 4.414062v40c0 2.121094.84375 4.15625 2.34375 5.65625zm107.3125-155.3125h14.917969l4.617187 13.839844-12.503906 12.503906c-1.5 1.5-2.34375 3.535156-2.34375 5.65625v8h16v-4.6875l11.3125-11.3125h17.375l11.3125 11.3125v25.375l-13.65625 13.65625c-1.5 1.5-2.34375 3.535156-2.34375 5.65625v8h16v-4.6875l6.757812-6.753906 9.242188 13.839844v34.265624l-8 8v-12.664062h-16v41.753906l-21.542969 5.390625-10.457031-10.457031v-4.6875h-16v8c0 2.121094.84375 4.15625 2.34375 5.65625l12.503906 12.503906-4.617187 13.839844h-14.917969l-11.3125-11.3125v-169.375zm-115.3125 90.398438 9.238281-13.863282 6.761719 6.753906v4.710938h16v-8c0-2.121094-.84375-4.15625-2.34375-5.65625l-13.65625-13.65625v-25.375l11.3125-11.3125h17.375l11.3125 11.3125v4.6875h16v-8c0-2.121094-.84375-4.15625-2.34375-5.65625l-12.503906-12.503906 4.617187-13.839844h14.917969l11.3125 11.3125v169.375l-11.3125 11.3125h-14.917969l-4.617187-13.839844 12.503906-12.503906c1.5-1.5 2.34375-3.535156 2.34375-5.65625v-8h-16v4.6875l-10.457031 10.457031-21.542969-5.390625v-41.753906h-16v12.6875l-8-8zm0 0" />
              <path d="m211.3125 101.65625c1.5-1.5 2.34375-3.535156 2.34375-5.65625v-24h-16v20.6875l-13.65625 13.65625 11.3125 11.3125zm0 0" />
              <path d="m197.65625 147.3125 5.65625-5.65625-11.3125-11.3125-8 8c-1.5 1.5-2.34375 3.535156-2.34375 5.65625v16h16zm0 0" />
            </g>
          </svg>
          <section className='call-to-action'>
            <h2>What's on your mind?</h2>
            <button onClick={this.switchViews}>
              {this.props.location.pathname === '/thoughts' ? 'View others\' thoughts' : 'Express a thought'}
            </button>
          </section>

          <Route exact path='/thoughts/:thoughtId'>
            <ThoughtList thoughts={[]} />
          </Route>

          <Route exact path='/thoughts'>
            <InfiniteScroll
              dataLength={this.state.userThoughts.length}
              next={this.getMoreUserThoughts}
              hasMore={true}
              loader={this.state.userThoughts.length > 19 ? <p className='loading'>Loading...</p> : <></>}>
              <ThoughtList thoughts={this.state.userThoughts} />
            </InfiniteScroll>
          </Route>

          <Route exact path='/'>
            <InfiniteScroll
              dataLength={this.state.allThoughts.length}
              next={this.getMoreThoughts}
              hasMore={true}
              loader={this.state.allThoughts.length > 19 ? <p className='loading'>Loading...</p> : <></>}>
              <ThoughtList thoughts={this.state.allThoughts} />
            </InfiniteScroll>
          </Route>

        </main>
      </ThoughtContext.Provider>
    );
  }
}

export default withRouter(App);
