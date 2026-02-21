import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-background p-4">
          <div className="max-w-md w-full bg-card border rounded-lg p-8 text-center space-y-6">
            <div className="flex justify-center">
              <div className="rounded-full bg-destructive/10 p-4">
                <AlertCircle className="h-12 w-12 text-destructive" />
              </div>
            </div>
            
            <div className="space-y-2">
              <h1 className="text-2xl font-bold">कुछ गलत हो गया</h1>
              <h2 className="text-xl font-semibold text-muted-foreground">Something Went Wrong</h2>
            </div>

            <p className="text-sm text-muted-foreground">
              एप्लिकेशन में एक त्रुटि हुई है। कृपया पेज को रीलोड करें।
              <br />
              <br />
              An error occurred in the application. Please reload the page.
            </p>

            {this.state.error && (
              <details className="text-left text-xs bg-muted p-3 rounded">
                <summary className="cursor-pointer font-medium mb-2">Error Details</summary>
                <pre className="whitespace-pre-wrap break-words">
                  {this.state.error.toString()}
                </pre>
              </details>
            )}

            <Button onClick={this.handleReload} className="w-full">
              पेज रीलोड करें / Reload Page
            </Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
