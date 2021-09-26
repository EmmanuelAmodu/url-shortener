import { render } from '@testing-library/react';
import App from './App';
import axios from 'axios';

jest.mock('axios');
const data = {
  ae123c: {
    key: 'ae123c',
    url: 'https://github.com/catamphetamine/react-phone-number-input',
    hits: 0
  }
};

describe("Input value", () => {
  it("updates on change", () =>{
    axios.get.mockImplementationOnce(() => Promise.resolve(data));
    const app = render(<App/>)
    expect(app).toBeDefined()
  })
})
