import React from "react";
import { Row, Form, Col } from 'react-bootstrap'

export default function SearchForm({ handleChange }) {
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
            placeholder="Search by long url or code"
            onChange={handleChange}
          />
        </Col>
      </Row>
    </Form>
  );
}
