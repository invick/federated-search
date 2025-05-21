/**
 * Federated Search Frontend
 * Author: V. Adams
 * Date: May 2025
 * Description: React application for searching across multiple websites simultaneously.
 */

import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

/**
 * Main App component that renders the search interface and handles search functionality.
 */
function App() {
  // State for the search query input
  const [query, setQuery] = useState('');
  
  // State for the list of sites to search
  const [sites, setSites] = useState([
    'https://www.google.com',
    'https://www.bing.com',
    'https://duckduckgo.com'
  ]);
  
  // State for the new site input field
  const [newSite, setNewSite] = useState('');
  
  // State for storing search results
  const [results, setResults] = useState([]);
  
  // Loading state for the search operation
  const [isLoading, setIsLoading] = useState(false);
  
  // Error state for displaying error messages
  const [error, setError] = useState('');

  /**
   * Handles the search form submission.
   * Sends a request to the backend with the search query and sites.
   * 
   * @param {Event} e - The form submission event
   */
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    
    setIsLoading(true);
    setError('');
    
    try {
      // Send search request to the backend
      const response = await axios.post('http://localhost:8000/search', {
        query: query.trim(),
        sites: sites
      }, {
        headers: {
          'Content-Type': 'application/json',
        }
      });
      
      // Update results with the response data
      setResults(response.data);
    } catch (err) {
      // Handle any errors that occur during the search
      const errorMessage = err.response?.data?.detail || err.message;
      setError(`Error performing search: ${errorMessage}`);
      console.error('Search error:', err);
    } finally {
      // Always set loading to false when the operation is complete
      setIsLoading(false);
    }
  };

  /**
   * Adds a new site to the list of sites to search.
   * 
   * @param {Event} e - The form submission event
   */
  const addSite = (e) => {
    e.preventDefault();
    const trimmedSite = newSite.trim();
    if (trimmedSite && !sites.includes(trimmedSite)) {
      setSites([...sites, trimmedSite]);
      setNewSite('');
    }
  };

  /**
   * Removes a site from the list of sites to search.
   * 
   * @param {string} siteToRemove - The site URL to remove
   */
  const removeSite = (siteToRemove) => {
    setSites(sites.filter(site => site !== siteToRemove));
  };

  return (
    <div className="app">
      <header className="header">
        <h1>Federated Search</h1>
        <p className="subtitle">Search across multiple websites simultaneously</p>
      </header>
      
      <main className="main-content">
        <div className="search-container">
          <form onSubmit={handleSearch} className="search-form">
            <div className="search-box">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Enter your search query..."
                className="search-input"
                disabled={isLoading}
              />
              <button 
                type="submit" 
                className="search-button"
                disabled={isLoading || !query.trim()}
              >
                {isLoading ? 'Searching...' : 'Search'}
              </button>
            </div>
          </form>
          
          <div className="sites-section">
            <h3>Search on these sites:</h3>
            <div className="sites-list">
              {sites.map((site, index) => (
                <div key={index} className="site-tag">
                  {site}
                  <button 
                    type="button" 
                    onClick={() => removeSite(site)}
                    className="remove-site"
                    title="Remove site"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
            <form onSubmit={addSite} className="add-site-form">
              <input
                type="text"
                value={newSite}
                onChange={(e) => setNewSite(e.target.value)}
                placeholder="Add a website URL"
                className="add-site-input"
              />
              <button 
                type="submit" 
                className="add-site-button"
                disabled={!newSite.trim() || sites.includes(newSite.trim())}
              >
                Add
              </button>
            </form>
          </div>
        </div>
        
        {error && <div className="error-message">{error}</div>}
        
        <div className="results-container">
          {isLoading ? (
            <div className="loading">Searching across {sites.length} sites...</div>
          ) : results.length > 0 ? (
            <div className="results-list">
              {results.map((result, index) => (
                <div key={index} className="result-item">
                  <div className="result-header">
                    <a 
                      href={result.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="result-title"
                    >
                      {result.title || 'Untitled'}
                    </a>
                    <span className="result-source">From: {result.source}</span>
                  </div>
                  <div className="result-url">{result.url}</div>
                  <div className="result-snippet">{result.snippet}</div>
                </div>
              ))}
            </div>
          ) : query && !isLoading ? (
            <div className="no-results">No results found. Try a different search term or add more sites to search.</div>
          ) : (
            <div className="welcome-message">
              <h2>Welcome to Federated Search</h2>
              <p>Enter a search query above to search across multiple websites simultaneously.</p>
              <p>You can add or remove websites using the controls above.</p>
            </div>
          )}
        </div>
      </main>
      
      <footer className="footer">
        <p>Federated Search &copy; {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}

export default App;
