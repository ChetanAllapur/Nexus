import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render sees the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // You can log the error to an error reporting service here
    console.error("ErrorBoundary caught an error:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: 20, fontFamily: 'Inter, system-ui, sans-serif' }}>
          <h2>Nexus Roadmap encountered an error</h2>
          <p>Please refresh the page or check the browser console for details.</p>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
