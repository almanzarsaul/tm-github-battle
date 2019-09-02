import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { ThemeProvider } from './contexts/theme';
import Nav from './components/Nav';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Loading from './components/Loading';

// Component
//      State
//      Lifecycle
//      UI

const Popular = React.lazy(() => import('./components/Popular'));
const Battle = React.lazy(() => import('./components/Battle'));
const Results = React.lazy(() => import('./components/Results'));

class App extends React.Component {
  state = {
    theme: 'light',
    toggleTheme: () => {
      this.setState(({ theme }) => ({
        theme: theme === 'light' ? 'dark' : 'light'
      }));
    }
  };

  componentDidMount() {
    if (typeof Storage !== 'undefined') {
      if (window.localStorage.getItem('theme')) {
        this.setState({ theme: window.localStorage.getItem('theme') });
      } else {
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
          // if user OS is set to dark mode
          this.setState({ theme: 'dark' });
        }
        window.localStorage.setItem('theme', this.state.theme);
      }
    } else {
      console.log("Browser doesn't support local storage.");
    }
  }

  componentDidUpdate() {
    if (typeof Storage !== 'undefined') {
      window.localStorage.setItem('theme', this.state.theme);
    } else {
      console.log("Browser doesn't support local storage.");
    }
  }

  render() {
    return (
      <Router>
        <ThemeProvider value={this.state}>
          <div className={this.state.theme}>
            <div className='container'>
              <Nav />
              <React.Suspense fallback={<Loading />}>
                <Switch>
                  <Route exact path='/' component={Popular} />
                  <Route exact path='/battle' component={Battle} />
                  <Route path='/battle/results' component={Results} />
                  <Route render={() => <h1>404</h1>} />
                </Switch>
              </React.Suspense>
            </div>
          </div>
        </ThemeProvider>
      </Router>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
