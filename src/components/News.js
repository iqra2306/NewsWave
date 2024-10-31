import React, { Component } from 'react';
import NewsItem from './NewsItem'; // Component to render individual news articles
import { fetch } from 'whatwg-fetch'; // Using fetch polyfill for making HTTP requests
import Spinner from './Spinner'; // Component to show loading spinner
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";

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

  constructor(props) {
    super(props);
    this.state = {
      articles: [], // Holds the articles fetched from the API
      loading: false, // Indicates if the data is being fetched
      page: 1, // Current page number
      totalResults: 0 // Total number of results from the API
    };
    document.title = `NewsWave - ${this.props.category}`;
  }

  // Fetching articles once the component mounts
  async componentDidMount() {
    this.fetchMoreData();
  }

  // Load more data on scroll
  fetchMoreData = async () => {
    const { country, category, pagesize } = this.props;
    const { page } = this.state;
    const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=2efc8949c1c649d0a3b4c268b6fd06b5&page=${page}&pageSize=${pagesize}`;

    this.setState({ loading: true });
    
    try {
      const data = await fetch(url);
      const parsedData = await data.json();
      
      this.setState({
        articles: this.state.articles.concat(parsedData.articles || []),
        loading: false,
        totalResults: parsedData.totalResults,
        page: page + 1
      });
    } catch (error) {
      console.error("Error fetching data:", error);
      this.setState({ loading: false });
    }
  };

  render() {
    return (
      <>
        <h2 className="text-center">NewsWave - Top {this.props.category} Headlines</h2>
        
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length < this.state.totalResults}
          loader={<Spinner />}
        >
          <div className="container">

          
          <div className="row">
            {this.state.articles.map((article) => (
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
          </div>
        </InfiniteScroll>
      </>
    );
  }
}
