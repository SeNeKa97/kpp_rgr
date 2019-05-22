import React from 'react';
import ReactDOM from 'react-dom';
import Container from './components/container'

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Container />, div);
  ReactDOM.unmountComponentAtNode(div);
});
