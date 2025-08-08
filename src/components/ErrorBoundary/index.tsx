/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React from "react";

interface MyProps {
  children: React.ReactElement;
}

interface MyState {
  hasError: boolean;
}

const ENV: string = process.env.NODE_ENV;

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
    }
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
