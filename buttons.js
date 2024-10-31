fetchData = async (page) => {
    const { country, category, pagesize } = this.props;
    const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=2efc8949c1c649d0a3b4c268b6fd06b5&page=${page}&pageSize=${pagesize}`;

    this.setState({ loading: true });
    const data = await fetch(url);
    const parsedData = await data.json();

    this.setState({
      articles: parsedData.articles,
      loading: false,
      totalResults: parsedData.totalResults
    });
  };




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