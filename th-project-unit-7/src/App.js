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
import NotFound from './components/NotFound'
import axios from 'axios'
import apiKey from './config'

class App extends Component {

  state = {
    images: [],
    loading: true,
    searchQuery: ''
  }

  componentDidMount() {
    this.performSearch()
  }

  performSearch = (query = 'dogs') => {
    this.setState({
      loading: true
    })
    axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=24&format=json&nojsoncallback=1`)
      .then(res => {
        this.setState({
          images: res.data.photos.photo,
          loading: false,
          searchQuery: query
        })
      })
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <SearchForm initSearch={this.performSearch} />
          <MainNav initSearch={this.performSearch} />
          {this.state.loading ?
          <>Loading...</> :
          this.state.images.length !== 0 ?
            (<Switch>
              <Route exact path="/" render={ () => <PhotoContainer images={this.state.images} />} />
              <Route exact path="/search/:tag" render={ ({match}) => (
                <PhotoContainer
                  images={this.state.images}
                  initSearch={this.performSearch}
                  searchText={this.state.searchQuery}
                  query={match.params.tag}
                />
              )} />
              <Route component={NoRoute} />
            </Switch>) :
            <NotFound />
          }
        </div>
      </BrowserRouter>
    );
  }
}

export default App;