/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React from "react";
import { datadogRum } from "@datadog/browser-rum";

interface MyProps {
  children: React.ReactElement;
}

interface MyState {
  hasError: boolean;
}

const ENV: string = process.env.NODE_ENV;

//  datadog-rum Installation
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
  defaultPrivacyLevel: "mask-user-input",
  useCrossSiteSessionCookie: true,
});

// sending MetaData to Datadog RUM
datadogRum.setGlobalContextProperty("Application Type", "Marketplace");
datadogRum.setGlobalContextProperty("Application Name", "JSON Editor App");

class ErrorBoundary extends React.Component<MyProps, MyState> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: any) {
    // Update state so the next render will show the fallback UI.
    console.warn(error); // Remove this line if not required.
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    // You can also log the error to an error reporting service
    if (ENV === "development") {
      console.error(error);
      return;
    }
    datadogRum.addError(error);
  }

  render() {
    if (this?.state?.hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
