import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import { Button, Container, Row, Form, Col } from 'react-bootstrap'

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
    this.getAllUrls()
  }

  serializeResponse(data) {
    return Object.keys(data).map(key => ({
      key, ...data
    }));
  }

  getAllUrls() {
    axios.get('http://url-shortner-backend/api')
      .then((response) => {
        const data = this.serializeResponse(response.data);
        this.setState({
          urlList: data,
          urlListToDisplay: data
        });
      })
  }

  search(e) {
    e.preventDefault();
    let searchTerm = e.target.value;
    if (searchTerm.length >= 3) {
      const items = this.state.urlList.filter(e => e.key.contains(searchTerm));
      this.setState({
        urlListToDisplay: items
      });
    } else {
      this.setState({
        urlListToDisplay: this.state.urlList
      });
    }
  }

  saveUrl(e) {
    e.preventDefault();
    axios.post('http://url-shortner-backend/api/encode', {
      url: this.state.newurl
    }).then(response => {
      const data = this.serializeResponse(response.data);
      const list = [...this.state.urlList, data];
      this.setState({
        urlList: list,
        urlListToDisplay: list
      });
    });
  }

  setFormValue(event) {
    this.setState({newurl: event.target.value});
  }

  searchForm() {
    return (
      <Form>
        <Row className="justify-content-md-center">
          <Col lg="6">
            <Form.Label htmlFor="inlineFormInput" visuallyHidden>
              Search
            </Form.Label>
            <Form.Control
              className="mb-2"
              id="inlineFormInput"
              placeholder="Search Url code"
              onChange={this.search}
            />
          </Col>
        </Row>
      </Form>
    )
  }

  urlForm() {
    return (
      <Form onSubmit={this.saveUrl}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Long URL</Form.Label>
          <Form.Control
            type="domain"
            placeholder="Enter Long URL" 
            onChange={this.setFormValue}
          />
        </Form.Group>
        <Form.Group as={Row} className="mb-3">
          <Button type="submit">Shorten</Button>
        </Form.Group>
      </Form>
    )
  }

  render() {
    let card = this.state.urlListToDisplay.map((val, key) => {
      return (
        <React.Fragment>
          <Col xs={3}>

          </Col>
        </React.Fragment>
      )
    });

    return (
      <div className='App'>
        <Container>
          {this.searchForm()}
          <Row>
            <Col xs={3}>
              {this.urlForm()}
            </Col>
            {card}
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;
