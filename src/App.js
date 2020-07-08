import React, { Component } from "react";
import "./App.css";
import SearchForm from "./Components/SearchForm";
import GifList from "./Components/GifList";
import axios from "axios";

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      gifs: [],
      loading: true,
      number: 15,
      searchText: "",
      submission: "John Cena",
    };
  }

  performSearch = (query) => {
    axios
      .get(`http://api.giphy.com/v1/gifs/search?q=${query}&limit=${this.state.number}&api_key=ueN1qWVA8zwPKXoXs5jUXmIFpVuJStKn `)
      .then((response) => {
        this.setState({
          gifs: response.data.data,
          loading: false,
        });
      })
      .catch((error) => {
        console.log("Error fetching and parsing data", error);
      });
  };
  onScroll = (e) => {
    // checking to see if we made it to the end

    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      this.setState((state) => ({
        number: state.number + 9,
      }));
      this.performSearch(this.state.submission);
    }
  };

  onSearchChange = (e) => {
    this.setState({ searchText: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    window.scrollTo(0, 0);
    this.setState((state) => ({
      loading: true,
      submission: state.searchText,
      number: 15,
    }));
    this.performSearch(this.state.searchText);
    e.currentTarget.reset();
  };
  componentDidMount() {
    window.addEventListener("scroll", this.onScroll, false);
    this.performSearch(this.state.submission);
  }

  componentWillUnmount() {
    // this is taking away the function when it is time to unmount
    window.removeEventListener("scroll", this.onScroll, false);
  }

  render() {
    console.log(this.state.gifs);
    return (
      <div>
        <div className="main-header">
          <div className="inner">
            <h1 className="main-title">GifSearch</h1>
            <form className="search-form" onSubmit={this.handleSubmit}>
              <label className="is-hidden" htmlFor="search">
                Search
              </label>
              <input type="search" ref={(input) => (this.query = input)} onChange={this.onSearchChange} name="search" placeholder="Search..." />
              <button type="submit" id="submit" className="search-button">
                <i className="material-icons icn-search">search</i>
              </button>
            </form>
          </div>
        </div>
        <div className="main-content">{this.state.loading ? <p>Loading</p> : <GifList data={this.state.gifs} />}</div>
      </div>
    );
  }
}
