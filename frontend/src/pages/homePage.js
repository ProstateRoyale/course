import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import TagCloud from '../components/tagCloud';

const HomePage = () => {
  const [recentCollections, setRecentCollections] = useState([]);
  const [largestCollections, setLargestCollections] = useState([]);

  const fetchCollections = async () => {
    try {
      const [recentResponse, largestResponse] = await Promise.all([
        axios.get('/api/collections/recent'),
        axios.get('/api/collections/largest'),
      ]);

      setRecentCollections(recentResponse.data);
      setLargestCollections(largestResponse.data);
    } catch (error) {
      console.error('Error fetching collections:', error);
    }
  };

  useEffect(() => {
    fetchCollections();
  }, []);

  return (
    <div>
      <h1>Home Page</h1>
      <h2>Recent Collections</h2>
      <ul>
        {recentCollections.map((collection) => (
          <li key={collection.id}>
            <Link to={`/collections/${collection.id}`}>{collection.name}</Link>
          </li>
        ))}
      </ul>
      <h2>Largest Collections</h2>
      <ul>
        {largestCollections.map((collection) => (
          <li key={collection.id}>
            <Link to={`/collections/${collection.id}`}>{collection.name}</Link>
          </li>
        ))}
      </ul>
      <TagCloud />
    </div>
  );
};

export default HomePage;
