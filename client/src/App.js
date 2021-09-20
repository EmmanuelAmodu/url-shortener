import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import { Button, Container, Row, Form, Col, Card } from 'react-bootstrap'

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
      key, ...data[key]
    }));
  }

  getAllUrls() {
    axios.get('http://localhost:3001/api')
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
      const items = this.state.urlList.filter(e => e.key.includes(searchTerm));
      this.setState({
        urlListToDisplay: items,
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
              onChange={this.search.bind(this)}
            />
          </Col>
        </Row>
      </Form>
    )
  }

  urlForm() {
    return (
      <Form onSubmit={this.saveUrl.bind(this)}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Long URL</Form.Label>
          <Form.Control
            type="domain"
            placeholder="Enter Long URL"
            onChange={this.setFormValue.bind(this)}
            value={this.state.newurl}
          />
        </Form.Group>
        <Form.Group as={Row} className="mb-3">
          <Button type="submit">Shorten</Button>
        </Form.Group>
      </Form>
    )
  }

  urlCard(val) {
    return (
      <Card style={{ 
        width: '25rem',
        height: '250px',
        margin: '5px' 
      }}>
        <Card.Body>
          <Card.Title>Code: {val.key}</Card.Title>
          <Card.Text>
            <p>Long URL: {val.url}</p>
            <p>
              Short URL:
              <a href={'http://localhost:3001/' + val.key}>
                http://localhost:3001/{val.key}
              </a>
            </p>
            <p>Total Traffic: {val.hits}</p>
            </Card.Text>
        </Card.Body>
      </Card>
    )
  }

  render() {
    let card = this.state.urlListToDisplay.map((val, key) => {
      return (
        <React.Fragment>
          <Col>
            {this.urlCard(val, key)}
          </Col>
        </React.Fragment>
      )
    });

    return (
      <div className='App'>
        <Container>
          {this.searchForm()}
          <Row>
            <Col>
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
