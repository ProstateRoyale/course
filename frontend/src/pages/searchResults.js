import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';

const SearchResults = () => {
  const [results, setResults] = useState([]);
  const [noResults, setNoResults] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const fetchResults = async () => {
      const query = new URLSearchParams(location.search).get('query');
      try {
        const response = await axios.get(`/api/search?query=${query}`);
        if (response.data.message === 'No matching collections found') {
          setNoResults(true);
          setResults([]);
        } else {
          setNoResults(false);
          setResults(response.data);
        }
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    };

    fetchResults();
  }, [location.search]);

  return (
    <div>
      <h1>Search Results</h1>
      {noResults ? (
        <p>No matching collections found</p>
      ) : (
        <ul>
          {results.map((collection) => (
            <li key={collection.id}>
              <Link to={`/collections/${collection.id}`}>{collection.name}</Link>
              <ul>
                {collection.items.map(item => (
                  <li key={item.id}>
                    <Link to={`/items/${item.id}`}>{item.name}</Link>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchResults;
