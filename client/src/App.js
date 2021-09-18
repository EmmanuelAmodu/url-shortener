import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import { Button, Container, Row, Form, Col } from 'react-bootstrap'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: false,
      urlList: [],
    }
  }

  componentDidMount() {
    this.getUrls()
  }

  getUrls() {
    axios.get('/api')
      .then((response) => {
        const data = Object.keys(response.data).map(key => ({
          key, ...response.data
        }));

        this.setState({
          urlList: data
        })
      })
  }

  render() {
    let card = this.state.urlList.map((val, key) => {
      return (
        <React.Fragment>
          <Col xs={3}>2 of 3 (wider)</Col>
        </React.Fragment>
      )
    });

    let searchForm = (
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
            />
          </Col>
        </Row>
      </Form>
    )

    let urlForm = (
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Long URL</Form.Label>
          <Form.Control type="domain" placeholder="Enter Long URL" />
        </Form.Group>
        <Form.Group as={Row} className="mb-3">
          <Button type="submit">Shorten</Button>
        </Form.Group>
      </Form>
    )

    return (
      <div className='App'>
        <Container>
          {searchForm}
          <Row>
            <Col xs={3}>
              {urlForm}
            </Col>
            {card}
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;
