import '../../../css/master.scss';

// Import React and HelloText class
import React from 'react';
import HelloText from './hello-text';

// Create class called HelloBox that extends the base React Component class
export default class HelloBox extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <HelloText name="Dan" />
      </div>
    );
  }
}
