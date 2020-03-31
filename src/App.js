import React from 'react';
import { Route, withRouter } from 'react-router-dom';
import InfiniteScroll from "react-infinite-scroll-component";
import config from './config';
import ThoughtContext from './contexts/ThoughtContext';
import { getToken } from './services/authService';
import { getAllThoughts, getUserThoughts } from './services/thoughtService';
import ThoughtList from './ThoughtList/ThoughtList';
import Header from './Header/Header';
import './App.css';
import './animations.css';

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

  refreshSocket = () => {
    const ws = new WebSocket(config.WS_URL);
    ws.onmessage = (message) => {
      const incomingThought = JSON.parse(message.data);
      this.addToAllThoughtsList(incomingThought);
      this.setState({
        newThoughtCount: this.state.newThoughtCount + 1
      })
    }
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
    ws.onclose = (e) => {
      this.refreshSocket()
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
        <footer className='main-footer'>
          <p>Powered by <span role="img" className='thought-bubble' aria-label="thoughts">&#x1F4AD;</span></p>
        </footer>
      </ThoughtContext.Provider>
    );
  }
}

export default withRouter(App);
