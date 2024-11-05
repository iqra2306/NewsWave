import React, { useEffect, useState } from 'react';
import NewsItem from './NewsItem';
import { fetch } from 'whatwg-fetch';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";

const News = ({ country = 'us', pagesize = 10, category = 'General' }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  document.title = `NewsWave - ${category}`;

  useEffect(() => {
    setArticles([]);
    setPage(1);
  }, [category, country]);

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
