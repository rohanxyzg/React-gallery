import React, { Component } from 'react';
import { BrowserRouter, Route , Switch , Redirect } from 'react-router-dom';
import axios from 'axios';
import Navigation from './components/Nav';
import apiKey from './config';
import Photos from './components/Photos';
import createHistory from 'history/createBrowserHistory';
import NotFound from './components/NotFound';
class App extends Component {
  state = {
    photos: [],
    loading: true,
  }
  componentDidMount(){
    this.performSearch();
  }
 
  performSearch = (text = 'cats') => {
    this.setState({
      loading: true
    });
    axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&text=${text}&per_page=16&sort=relevance&content_type=1&format=json&nojsoncallback=1`)
    .then(response => {
      console.log(response.data);
      this.setState({
        photos: response.data.photos.photo,
        loading: false
     });
    

    })
    .catch(error => {
      // eslint-disable-next-line no-console
      console.error('Error fetching Flickr API data', error);
    });    
    }
  render(){

  

    const history = createHistory();
    let searchText = history.location.pathname.replace(/[^\w\s]/gi, '').replace("search", '');
  
    return (
    
      <BrowserRouter>
        <div className="container">
          <Navigation />
          <Switch>
            <Route exact path="/" render={()=><Redirect to="/cats" />} />
            <Route path="/bottles" render={() => <Photos data={this.state.photos} search={this.performSearch} text="bottles" loading={this.state.loading}/>} />
            <Route path="/phones" render={() => <Photos data={this.state.photos} search={this.performSearch} text="phones" loading={this.state.loading}/>} />
            <Route path="/cats" render={() => <Photos data={this.state.photos} search={this.performSearch} text="cats" loading={this.state.loading}/>} />

            <Route exact path="/search/:text" render={  () => <Photos data={this.state.photos}  search={this.performSearch} text={searchText} loading={this.state.loading}/>} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
