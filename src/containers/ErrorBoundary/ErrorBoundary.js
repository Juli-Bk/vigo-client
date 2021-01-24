import React from 'react';
import Page404 from '../../pages/Page404/Page404';
import { withRouter } from 'react-router-dom';

class ErrorBoundary extends React.Component {
    state = {
      hasError: false
    };

    componentDidCatch (error, info) {
      if (error) {
        this.setState({ hasError: true });
      }
    }

    componentDidUpdate (prevProps, prevState) {
      const { location } = this.props;

      if (location !== prevProps.location) {
        this.setState({ hasError: false });
      }
    }

    render () {
      const { hasError } = this.state;
      const { children } = this.props;

      if (hasError) {
        return <Page404 errorType={500}/>;
      }

      return children;
    }
}

export default withRouter(ErrorBoundary);
