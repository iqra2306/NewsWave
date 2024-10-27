import React, { Component } from 'react';
import NewsItem from './NewsItem'; // Component to render individual news articles
import { fetch } from 'whatwg-fetch'; // Using fetch polyfill for making HTTP requests
import Spinner from './Spinner'; // Component to show loading spinner

export default class News extends Component {
  // Initializing state in the constructor
  constructor() {
    super();
    this.state = {
      articles: [], // Holds the articles fetched from the API
      loading: false, // Indicates if the data is being fetched
      page: 1, // Current page number
    };
  }

  // Fetching articles once the component mounts
  async componentDidMount() {
    let url = `https://newsapi.org/v2/everything?q=apple&from=2024-10-25&to=2024-10-25&sortBy=popularity&apiKey=2efc8949c1c649d0a3b4c268b6fd06b5&pageSize=${this.props.pagesize}`;
    this.setState({ loading: true }); // Set loading state to true before making the API call
    let data = await fetch(url); 
    let parsedData = await data.json();
    this.setState({ loading: false, articles: parsedData.articles }); // Set state with fetched articles and stop loading
  }

  // Handler function to load page 1 data
  handleNext1 = async () => {
    this.setState({ page: 1, loading: true }); // Update state and set loading to true
    let url = `https://newsapi.org/v2/everything?q=apple&from=2024-10-25&to=2024-10-27&sortBy=popularity&apiKey=2efc8949c1c649d0a3b4c268b6fd06b5&page=1&pageSize=${this.props.pagesize}`;
    let data = await fetch(url); 
    let parsedData = await data.json();
    this.setState({ loading: false, articles: parsedData.articles }); // Update articles and stop loading
  };

  // Handler function to load page 2 data
  handleNext2 = async () => {
    this.setState({ page: 2, loading: true }); // Update state for page 2
    let url = `https://newsapi.org/v2/everything?q=apple&from=2024-10-25&to=2024-10-25&sortBy=popularity&apiKey=2efc8949c1c649d0a3b4c268b6fd06b5&page=2&pageSize=${this.props.pagesize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({ loading: false, articles: parsedData.articles }); // Update articles and stop loading
  };

  // Similar handler functions for pages 3, 4, and 5
  handleNext3 = async () => {
    this.setState({ page: 3, loading: true });
    let url = `https://newsapi.org/v2/everything?q=apple&from=2024-10-25&to=2024-10-25&sortBy=popularity&apiKey=2efc8949c1c649d0a3b4c268b6fd06b5&page=3&pageSize=${this.props.pagesize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({ loading: false, articles: parsedData.articles });
  };

  handleNext4 = async () => {
    this.setState({ page: 4, loading: true });
    let url = `https://newsapi.org/v2/everything?q=apple&from=2024-10-25&to=2024-10-25&sortBy=popularity&apiKey=2efc8949c1c649d0a3b4c268b6fd06b5&page=4&pageSize=${this.props.pagesize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({ loading: false, articles: parsedData.articles });
  };

  handleNext5 = async () => {
    this.setState({ page: 5, loading: true });
    let url = `https://newsapi.org/v2/everything?q=apple&from=2024-10-25&to=2024-10-25&sortBy=popularity&apiKey=2efc8949c1c649d0a3b4c268b6fd06b5&page=5&pageSize=${this.props.pagesize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({ loading: false, articles: parsedData.articles });
  };

  // Render method to display the component
  render() {
    return (
      <div className='container my-3'>
        <h2>NewsWave - All articles mentioning Apple</h2>
        {/* Display spinner if loading */}
        {this.state.loading && <Spinner />}
        <div className="row">
          {/* Map through articles to create NewsItem components */}
          {!this.state.loading && this.state.articles.map((article) => (
            <div className="col-md-4" key={article.url}>
              <NewsItem
                title={article.title ? article.title.slice(0, 45) : ""}
                description={article.description ? article.description.slice(0, 80) : ""}
                imageUrl={article.urlToImage}
                newsUrl={article.url}
              />
            </div>
          ))}
        </div>

        {/* Pagination buttons */}
        <div className="container d-flex justify-content-center align-items-center">
          <div className="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">
            <div className="btn-group mr-2" role="group" aria-label="First group">
              {/* Buttons to navigate pages */}
              <button type="button" className="btn btn-secondary" onClick={this.handleNext1}>1</button>
              <button type="button" className="btn btn-secondary" onClick={this.handleNext2}>2</button>
              <button type="button" className="btn btn-secondary" onClick={this.handleNext3}>3</button>
              <button type="button" className="btn btn-secondary" onClick={this.handleNext4}>4</button>
              <button type="button" className="btn btn-secondary" onClick={this.handleNext5}>5</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
