import React, {Component} from 'react'
import ImgResult from './ImgResult'

class PhotoContainer extends Component {

  componentDidUpdate() {
    if(this.props.searchText !== this.props.query){
        this.props.initSearch(this.props.query)
    }
  }

  render() {
    return(
      <div className="photo-container">
        <h2>Results</h2>
        <ul>
          {this.props.images.map(image => {
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