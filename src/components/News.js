import React, { Component } from 'react';
import NewsItem from './NewsItem'; // Component to render individual news articles
import { fetch } from 'whatwg-fetch'; // Using fetch polyfill for making HTTP requests
import Spinner from './Spinner'; // Component to show loading spinner
import PropTypes from 'prop-types';

export default class News extends Component {
  static defaultProps = {
    country: 'us',
    pagesize: 10,
    category: 'General',
  };

  static propTypes = {
    country: PropTypes.string,
    pagesize: PropTypes.number,
    category: PropTypes.string,
  };

  // Initializing state in the constructor
  constructor(props) {
    super(props);
    this.state = {
      articles: [], // Holds the articles fetched from the API
      loading: false, // Indicates if the data is being fetched
      page: 1, // Current page number
    };
    document.title=` NewsWave ${this.props.category} `;
  }

  // Helper method to fetch data
  fetchData = async (page) => {
    const { country, category, pagesize } = this.props;
    const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=2efc8949c1c649d0a3b4c268b6fd06b5&page=${page}&pageSize=${pagesize}`;

    this.setState({ loading: true });
    const data = await fetch(url);
    const parsedData = await data.json();

    this.setState({
      articles: parsedData.articles,
      loading: false,
    });
  };

  // Fetching articles once the component mounts
  async componentDidMount() {
    this.fetchData(this.state.page);
  }

  // Generalized page handler function
  handlePageChange = (page) => {
    this.setState({ page }, () => this.fetchData(page));
  };

  // Render method to display the component
  render() {
    return (
      <div className="container-fluid my-3 mx-2">
        <h2 className="text-center">NewsWave - Top {this.props.category} Headlines</h2>

        {/* Display spinner if loading */}
        {this.state.loading && <Spinner />}

        <div className="row">
          {/* Map through articles to create NewsItem components */}
          {!this.state.loading && this.state.articles.map((article) => (
            <div className="col-sm-12 col-md-6 col-lg-4" key={article.url}>
              <NewsItem
                title={article.title ? article.title.slice(0, 45) : ""}
                description={article.description ? article.description.slice(0, 80) : ""}
                imageUrl={article.urlToImage}
                newsUrl={article.url}
                date={article.publishedAt}
              />
            </div>
          ))}
        </div>

        {/* Pagination buttons */}
        <div className="container d-flex justify-content-center align-items-center">
          <div className="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">
            <div className="btn-group mr-2" role="group" aria-label="Page Navigation">
              {[1, 2, 3, 4, 5].map((pageNumber) => (
                <button
                  key={pageNumber}
                  type="button"
                  className={`btn btn-secondary ${this.state.page === pageNumber ? 'active' : ''}`}
                  onClick={() => this.handlePageChange(pageNumber)}>
                  {pageNumber}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
