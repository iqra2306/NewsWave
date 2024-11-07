import React, { useEffect, useState } from 'react';
import NewsItem from './NewsItem'; // Component to render individual news articles
import { fetch } from 'whatwg-fetch';// Fetch polyfill for making HTTP requests
import Spinner from './Spinner';// Component to show a loading spinner
import PropTypes from 'prop-types';// Prop types for validating component props
import InfiniteScroll from "react-infinite-scroll-component";// Infinite scroll component for loading more data on scroll

const News = ({ country = 'us', pagesize = 10, category = 'General' }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  document.title = `NewsWave - ${category}`;
  // Effect to reset articles and page when the category or country changes
  useEffect(() => {
    setArticles([]);
    setPage(1);
  }, [category, country]);
  // Effect to fetch data when the page, category, or country changes
  useEffect(() => {
    fetchMoreData();
  }, [page, category, country]);

  const fetchMoreData = async () => {
    try {
      setLoading(true);
      const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${process.env.REACT_APP_NEWS_API_KEY}&page=${page}&pageSize=${pagesize}`;
      
      const data = await fetch(url);
      if (!data.ok) throw new Error("Failed to fetch data.");
      const parsedData = await data.json();
      setArticles((prevArticles) => prevArticles.concat(parsedData.articles));
      setTotalResults(parsedData.totalResults);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <>
      <h2 className="text-center" style={{ marginTop: '5rem' }}>NewsWave - Top {category} Headlines</h2>
      {loading && <Spinner />}
      <InfiniteScroll
        dataLength={articles.length}
        next={loadMore}
        hasMore={articles.length < totalResults}
        loader={<Spinner />}
      >
        <div className="container">
          <div className="row">
            {articles.map((article, index) => (
              <div className="col-sm-12 col-md-6 col-lg-4" key={`${article.url}-${index}`}>
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
};
// Prop types to validate the props passed to the News component
News.propTypes = {
  country: PropTypes.string,
  pagesize: PropTypes.number,
  category: PropTypes.string,
};

export default News;
