import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import CollectionForm from '../components/collectionForm';

const UserPage = () => {
  const [collections, setCollections] = useState([]);
  const [editingCollection, setEditingCollection] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const response = await axios.get('/api/auth/check', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setIsAuthenticated(response.data.isAuthenticated);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        setIsAuthenticated(false);
      }
    };

    checkAuth();
    fetchCollections();
  }, []);

  const fetchCollections = async () => {
    try {
      const response = await axios.get('/api/collections');
      setCollections(response.data);
    } catch (error) {
      console.error('Error fetching collections:', error);
    }
  };

  const handleSave = () => {
    setEditingCollection(null);
    fetchCollections();
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/collections/${id}`);
      fetchCollections();
    } catch (error) {
      console.error('Error deleting collection:', error);
    }
  };

  return (
    <div>
      <h1>Your Collections</h1>
      {isAuthenticated && (
        <button onClick={() => setEditingCollection({})}>Add Collection</button>
      )}
      {editingCollection && (
        <CollectionForm collection={editingCollection} onSave={handleSave} />
      )}
      <ul>
        {collections.map((collection) => (
          <li key={collection.id}>
            <Link to={`/collections/${collection.id}`}>{collection.name}</Link>
            {isAuthenticated && (
              <>
                <button onClick={() => setEditingCollection(collection)}>Edit</button>
                <button onClick={() => handleDelete(collection.id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserPage;
