import React from "react";
import { Card } from 'react-bootstrap'

export default function UrlCard({ data }) {
  return (
    <Card style={{
      width: '25rem',
      height: '200px',
      margin: '5px'
    }}>
      <Card.Body>
        <Card.Title>Code: {data.key}</Card.Title>
        <br />
        <Card.Text>Long URL: {data.url}</Card.Text>
        <Card.Text>
          Short URL: 
          <a href={'http://localhost:3001/' + data.key}>
            http://localhost:3001/{data.key}
          </a>
        </Card.Text>
        <Card.Text>Total Traffic: {data.hits}</Card.Text>
      </Card.Body>
    </Card>
  )
}
