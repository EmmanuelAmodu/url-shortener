import React from "react";
import { Row, Form, Button } from 'react-bootstrap'

export default function UrlForm({ newurl, handleSubmit, handleChange }) {
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Long URL</Form.Label>
        <Form.Control
          type="domain"
          placeholder="Enter Long URL"
          onChange={handleChange}
          value={newurl}
        />
      </Form.Group>
      <Form.Group as={Row} className="mb-3">
        <Button type="submit">Shorten</Button>
      </Form.Group>
    </Form>
  );
}
