import ImgResult from './ImgResult'

const PhotoContainer = (props) => {
  return(
    <div className="photo-container">
      <h2>Results</h2>
      <ul>
        {props.images.map(image => {
          const { farm, server, secret, id } = image
          return(
            <ImgResult imageLink={`https://farm${farm}.staticflickr.com/${server}/${id}_${secret}.jpg`} key={id} />
          )
        })}
      </ul>
    </div>
  )
}


export default PhotoContainer