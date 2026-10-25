import { Component } from "react";

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error) {
    console.error("Prime Fresh UI error:", error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="crash-screen">
          <div>
            <p className="kicker">Prime Fresh Oil Mills</p>
            <h1>The mill desk hit a snag.</h1>
            <p className="muted">Reload the page to continue reviewing oils and specifications.</p>
            <button className="btn btn-primary" type="button" onClick={() => window.location.reload()}>
              Reload
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
