import React from "react";

const NewsItem = (props) => {

  let { title, description, imageUrl, newsUrl, date } = props;
  return (
    <div>
      <div className="card mx-2 my-3" >
        <img
          className="card-img-top" src={imageUrl ? imageUrl : "images.png"} alt="Card cap" />
        <div className="card-body">
          <a href={newsUrl}><h5 className="card-title" >{title}...</h5></a>
          <p className="card-text">{description}...</p>
          <a rel='noreferrer' href={newsUrl} target="_blank" className="btn btn-sm btn-primary">Read more</a>
        </div>
        <div className="card-footer text-muted">
          Published on {new Date(date).toUTCString()}
        </div>
      </div>
    </div>
  )
}
export default NewsItem
