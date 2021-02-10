import React from 'react';
import {withRouter} from 'react-router-dom';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
      errorInfo: null
    };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
  }

  render() {
    const {error, errorInfo} = this.state;

    if (error) {
      return <div>
        {error && error.toString()}
        <br/>
        <p>Error occured {errorInfo.componentStack}</p>
      </div>
    }
    return this.props.children;
  }
};

export default withRouter(ErrorBoundary);
