import React, { ErrorInfo } from 'react';
import { toast } from 'react-toastify';

interface Props {
  children: React.ReactNode;
}

interface State {
  error?: string;
}

export const FALLBACK_ERROR_BOUNDARY_MESSAGE = 'Something went wrong';

// For more infos on react error boundaries check: https://reactjs.org/docs/error-boundaries.html
class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { error: undefined };
  }

  static getDerivedStateFromError(error: any): Partial<State> | null {
    return { error: JSON.stringify(error) };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    toast.error(error.message);
    console.error('error: ', error);
    console.error('errorInfo: ', JSON.stringify(errorInfo));
  }

  render() {
    if (this.state.error) {
      // TODO: instead render a pretty fallback error page
      return <h1>{FALLBACK_ERROR_BOUNDARY_MESSAGE}</h1>;
    }
    return this.props.children;
  }
}
export default ErrorBoundary;
