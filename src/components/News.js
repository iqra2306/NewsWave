import React, { useEffect, useState } from 'react';
import NewsItem from './NewsItem'; // Component to render individual news articles
import { fetch } from 'whatwg-fetch'; // Using fetch polyfill for making HTTP requests
import Spinner from './Spinner'; // Component to show loading spinner
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";

const News = ({ country = 'us', pagesize = 10, category = 'General' }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setloading] = useState(false);
  const [page, setpage] = useState(1);
  const [totalResults, settotalResults] = useState(0);

  document.title = `NewsWave - ${category}`;

  useEffect(() => {
    setArticles([]);
    setpage(1);
    fetchMoreData();
  }, [category, country]);

  const fetchMoreData = async () => {
    try {
      const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${process.env.REACT_APP_NEWS_API_KEY}&page=${page + 1}&pageSize=${pagesize}`;
      setloading(true);
      const data = await fetch(url);
      if (!data.ok) throw new Error("Failed to fetch data.");
      const parsedData = await data.json();
      setArticles((prevArticles) => prevArticles.concat(parsedData.articles));
      settotalResults(parsedData.totalResults);
      setpage((prevPage) => prevPage + 1);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setloading(false);
    }
  };

  return (
    <>
      <h2 className="text-center" style={{marginTop:'5rem'}}>NewsWave - Top {category} Headlines</h2>
      {loading && <Spinner />}
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length < totalResults}
        loader={loading && <Spinner />}>
        <div className="container">
          <div className="row">
            {articles.map((article) => (
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
};

News.propTypes = {
  country: PropTypes.string,
  pagesize: PropTypes.number,
  category: PropTypes.string,
};
export default News;
