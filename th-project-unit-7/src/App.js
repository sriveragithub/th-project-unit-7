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

  componentDidUpdate(prevState) {
    console.log(this.state.images)
    console.log(prevState.images)
  }

  performSearch = (query) => {
    console.log(this.state.searchQuery)
    axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=24&format=json&nojsoncallback=1`)
      .then(res => {
        console.log(res.data.photos.photo)
        this.setState({
          images: res.data.photos.photo,
          loading: false
        })
      })
    console.log(this.state.searchQuery)
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <SearchForm initSearch={this.performSearch} />
          <MainNav initSearch={this.performSearch} />
          <Switch>
            {this.state.loading ? <>Loading...</> : this.state.images.length !== 0 ? <Route exact path="/" render={ () => <PhotoContainer images={this.state.images} />} /> : <NotFound />}
            {this.state.loading ? <>Loading...</> : this.state.images.length !== 0 ? <Route path="/search/:tag" render={ () => <PhotoContainer images={this.state.images} /> } />  : <NotFound />}
            {/* <Route path="/search/:tag" component={PhotoContainer} /> */}
            <Route component={NoRoute} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;