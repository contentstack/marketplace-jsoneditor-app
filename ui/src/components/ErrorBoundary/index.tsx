/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React from "react";
import TrackJS from "../../trackjs";
import { datadogRum } from '@datadog/browser-rum';

interface MyProps {
  children: React.ReactElement;
}

interface MyState {
  hasError: boolean;
}

//datadog-rum Installation
datadogRum.init({
  applicationId: `${process.env.REACT_APP_DATADOG_RUM_APPLICATION_ID}`,
  clientToken: `${process.env.REACT_APP_DATADOG_RUM_CLIENT_TOKEN}`,
  site: `${process.env.REACT_APP_DATADOG_RUM_SITE}`,
  service: `${process.env.REACT_APP_DATADOG_RUM_SERVICE}`,
  sampleRate: 100,
  sessionReplaySampleRate: 20,
  trackInteractions: true,
  trackResources: true,
  trackLongTasks: true,
  defaultPrivacyLevel: 'mask-user-input',
  useCrossSiteSessionCookie: true,
});

//sending MetaData to Datadog RUM
datadogRum.setGlobalContextProperty('Application Type', 'Marketplace');
datadogRum.setGlobalContextProperty('Application Name', 'JSON Editor App');

class ErrorBoundary extends React.Component<MyProps, MyState> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: any) {
    // error tracker for error reporting service
    TrackJS.trackError(error);
    // Update state so the next render will show the fallback UI.
    console.warn(error); // Remove this line if not required.
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    // error tracker for error reporting service
    TrackJS.trackError(error);
    // You can also log the error to an error reporting service
    // logErrorToMyService(error, errorInfo);
    console.error("errorInfo ", errorInfo);
    throw new Error(errorInfo);
  }

  render() {
    if (this?.state?.hasError) {
      // error tracker for error reporting service
      TrackJS.trackError(this?.state?.hasError);
      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
