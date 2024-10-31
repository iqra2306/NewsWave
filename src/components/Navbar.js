import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {
  render() {
    return (
      <div>
        <nav className={`navbar navbar-expand-lg navbar-light bg-light`}>
          <Link className="navbar-brand" to="/">
            <img
              src="/favicon-32x32.png"
              alt="logo"
              style={{ border: '1px solid black', borderRadius: '50%' }} />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <Link className="nav-link" to="/">
                  Home <span className="sr-only">(current)</span>
                </Link>
              </li>
              <li className="nav-item disabled">
                <Link className="nav-link " to="/">
                  About
                </Link>
              </li>
              <li className="nav-item dropdown">
                <Link
                  className="nav-link   dropdown-toggle"
                  to=""
                  id="navbarDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false">Category</Link>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <Link className="dropdown-item" to="/General">
                    General
                  </Link>
                  <Link className="dropdown-item" to="/Sports">
                    Sports
                  </Link>
                  <Link className="dropdown-item" to="/Science">
                    Science
                  </Link>
                  <Link className="dropdown-item" to="/Health">
                    Health
                  </Link>
                  <Link className="dropdown-item" to="/Technology">
                    Technology
                  </Link>
                  <Link className="dropdown-item" to="/Entertainment">
                    Entertainment
                  </Link>
                  <Link className="dropdown-item" to="/Business">
                    Business
                  </Link>
                </div>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}
