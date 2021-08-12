import { Component } from 'react'
import NotFound from './NotFound'
import ImgResult from './ImgResult'
import axios from 'axios'
import apiKey from '../config'

class PhotoContainer extends Component {

  constructor(props) {
    super(props)
    console.log(props)
    this.state = {
      images: [],
      loading: true,
      searchQuery: props.query || 'dogs'
    }
  }

  componentDidMount() {
    this.performSearch()
  }

  performSearch = (query = this.state.searchQuery) => {
    axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=24&format=json&nojsoncallback=1`)
      .then(res => {
        console.log(res.data.photos.photo)
        this.setState({
          images: res.data.photos.photo,
          loading: false
        })
      })
  }

  render() {
    console.log(this.state.searchQuery)
    return(
      <div className="photo-container">
        <h2>Results</h2>
        <ul>
          {this.state.loading ? <p>Loading...</p> : this.state.images.length === 0 ?
          <NotFound /> :
          this.state.images.map(image => {
            const { farm, server, secret, id } = image
            return(
              <ImgResult imageLink={`https://farm${farm}.staticflickr.com/${server}/${id}_${secret}.jpg`} key={id} />
            )
          })}
        </ul>
      </div>
    )
  }
}

export default PhotoContainer