import { Component } from 'react'
import {
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom'
import SearchForm from './components/SearchForm'
import MainNav from './components/MainNav'
import PhotoContainer from './components/PhotoContainer'
import NoRoute from './components/NoRoute'


class App extends Component {

  state = {
    searchQuery: 'dogs'
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <SearchForm />
          <MainNav />
          <Switch>
            <Route exact path="/" render={ () => <PhotoContainer />} />
            <Route path="/search/:tag" render={ ({match}) => {
              console.log(match.params.tag)
              return (<PhotoContainer query={match.params.tag} />)
            }} />
            {/* <Route path="/search/:tag" component={PhotoContainer} /> */}
            <Route component={NoRoute} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;