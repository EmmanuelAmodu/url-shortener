import React from "react"
import {render, fireEvent} from '@testing-library/react'
import UrlCard from './UrlCard';

describe("Input value", () => {
  it("updates on change", () =>{
    const urlCard = render(<UrlCard data={{
      key: 'ae20d1',
      url: 'https://github.com/catamphetamine/react-phone-number-input',
      hits: 0,
    }}/>)
    expect(urlCard.findByText('ae20d1')).toBeDefined()
  })
})
