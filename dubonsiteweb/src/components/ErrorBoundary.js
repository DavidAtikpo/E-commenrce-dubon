import React, { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Mise à jour de l'état afin d'afficher l'UI de secours
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // Tu peux aussi enregistrer l'erreur dans un service de journalisation
    console.error("Error caught by ErrorBoundary:", error, info);
  }

  render() {
    if (this.state.hasError) {
      // UI de secours
      return <h1>Quelque chose s'est mal passé.</h1>;
    }

    return this.props.children; 
  }
}

export default ErrorBoundary;
