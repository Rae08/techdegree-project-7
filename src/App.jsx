import React, { Component } from "react";
import "./App.css";
import SearchForm from "./components/SearchForm";
import MainNav from "./components/MainNav";
import PhotoContainer from "./components/PhotoContainer";
import apiKey from "./config";
import {
  BrowserRouter,
  Route,
  Switch,
  useParams,
  useLocation
} from "react-router-dom";
import Error from "./components/404";
import axios from "axios";

const key = apiKey;

class App extends Component {
  constructor() {
    super();
    this.state = {
      catPhotos: [],
      dogPhotos: [],
      horsePhotos: [],
      searchPhotos: [],
      loading: true,
      searchLoading: true
    };
  }

  // when the page is accessed, it will fetch the data for the 3 categories
  componentDidMount() {
    axios
      .get(
        `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${key}&tags=cats&per_page=24&format=json&nojsoncallback=1`
      )
      .then(response => {
        this.setState({
          catPhotos: response.data.photos.photo,
          loading: false
        });
      })
      .catch(error => {
        console.log("Error fetching and parsing data", error);
      });

    axios
      .get(
        `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${key}&tags=dogs&per_page=24&format=json&nojsoncallback=1`
      )
      .then(response => {
        this.setState({
          dogPhotos: response.data.photos.photo,
          loading: false
        });
      })
      .catch(error => {
        console.log("Error fetching and parsing data", error);
      });

    axios
      .get(
        `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${key}&tags=horses&per_page=24&format=json&nojsoncallback=1`
      )
      .then(response => {
        this.setState({
          horsePhotos: response.data.photos.photo,
          loading: false
        });
      })
      .catch(error => {
        console.log("Error fetching and parsing data", error);
      });
  }

  // when a search is done by either using the search form or navigating to the url /search/<search term> then it will get the results for the search term
  performSearch = search => {
    if (this.state.searchPhotos.length > 0) {
      this.setState({
        searchPhotos: [],
        searchLoading: true
      });
    }
    axios
      .get(
        `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${key}&tags=${search}&per_page=24&format=json&nojsoncallback=1`
      )
      .then(response => {
        this.setState({
          searchPhotos: response.data.photos.photo,
          searchLoading: false
        });
      })
      .catch(error => {
        console.log("Error fetching and parsing data", error);
      });
  };

  // when the intitial route is loaded it will display the catPhoto's
  // if a user navigates to a route that does not exist, the 404 page will be displayed.
  render() {
    return (
      <div className="container">
        <BrowserRouter>
          <SearchForm onSearch={this.performSearch} />
          <MainNav />
          <Switch>
            <Route
              exact
              path="/"
              render={() => (
                <PhotoContainer
                  photos={this.state.catPhotos}
                  loading={this.state.loading}
                />
              )}
            />
            <Route
              exact
              path="/cats"
              render={() => (
                <PhotoContainer
                  photos={this.state.catPhotos}
                  loading={this.state.loading}
                />
              )}
            />
            <Route
              exact
              path="/dogs"
              render={() => (
                <PhotoContainer
                  photos={this.state.dogPhotos}
                  loading={this.state.loading}
                />
              )}
            />
            <Route
              exact
              path="/horses"
              render={() => (
                <PhotoContainer
                  photos={this.state.horsePhotos}
                  loading={this.state.loading}
                />
              )}
            />
            <Route
              path="/search/:query"
              render={routeProps => (
                <PhotoContainer
                  {...routeProps}
                  photos={this.state.searchPhotos}
                  loading={this.state.searchLoading}
                  onSearch={this.performSearch}
                  clear={this.clearPrevSearch}
                />
              )}
            />
            <Route component={Error} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
