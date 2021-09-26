import React from "react"
import {render, fireEvent} from '@testing-library/react'
import SearchForm from './SearchForm';

describe("Input value", () => {
  it("updates on change", () =>{
    const {queryByPlaceholderText} = render(<SearchForm handleChange={() => {}}/>)
    const searchInput = queryByPlaceholderText('Search by long url or code');
    fireEvent.change(searchInput, {target: {value: "https://github.com/catamphetamine/react-phone-number-input"}})
    expect(searchInput.value).toBe("https://github.com/catamphetamine/react-phone-number-input")
  })
})
