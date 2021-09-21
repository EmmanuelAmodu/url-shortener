import React, { Component } from 'react';
import './App.css';
import SearchForm from './SearchForm';
import UrlForm from './UrlForm';
import UrlCard from './UrlCard';
import axios from 'axios';
import { Container, Row, Col } from 'react-bootstrap'

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      isLoading: false,
      newurl: '',
      urlList: [],
      urlListToDisplay: []
    }
  }

  componentDidMount() {
    axios.get('http://localhost:3001/api')
      .then((response) => {
        const data = this.serializeResponse(response.data);
        this.setState({
          urlList: data,
          urlListToDisplay: data
        });
      })
  }

  serializeResponse(data) {
    return Object.keys(data).map(key => ({
      key, ...data[key]
    }));
  }

  search(e) {
    e.preventDefault();
    let searchTerm = e.target.value;
    if (searchTerm.length >= 3) {
      this.setState({
        urlListToDisplay: this.state.urlList.filter(e => {
          return e.url.includes(searchTerm) || e.url.includes(searchTerm);
        }),
      });
    } else {
      this.setState({
        urlListToDisplay: this.state.urlList,
      });
    }
  }

  saveUrl(e) {
    e.preventDefault();
    axios.put('http://localhost:3001/api/encode', {
      url: this.state.newurl
    }).then(response => {
      const list = [...this.state.urlList, response.data.data];
      this.setState({
        urlList: list,
        urlListToDisplay: list,
        newurl: ''
      });
    });
  }

  setFormValue(event) {
    this.setState({ newurl: event.target.value });
  }

  render() {
    return (
      <div className='App' style={{
        marginTop: '50px'
      }}>
        <Container>
          <SearchForm handleChange={this.search.bind(this)} />
          <Row>
            <Col>
              <UrlForm
                newurl={this.state.newurl}
                handleSubmit={this.saveUrl.bind(this)}
                handleChange={this.setFormValue.bind(this)}
              />
            </Col>
            {this.state.urlListToDisplay.map((val, key) => (
              <Col key={key}>
                <UrlCard data={val} />
              </Col>
            ))}
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;
