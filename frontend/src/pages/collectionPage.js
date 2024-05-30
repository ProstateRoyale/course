import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import ItemForm from '../components/itemForm';

const CollectionPage = () => {
  const { id } = useParams();
  const [collection, setCollection] = useState(null);
  const [editingItem, setEditingItem] = useState(null);
  const token = localStorage.getItem('token');
  const isAuthenticated = !!token;

  const fetchCollection = useCallback(async () => {
    try {
      const response = await axios.get(`/api/collections/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCollection(response.data);
    } catch (error) {
      console.error('Error fetching collection:', error);
    }
  }, [id, token]);

  useEffect(() => {
    fetchCollection();
  }, [fetchCollection]);

  const handleSave = () => {
    setEditingItem(null);
    fetchCollection();
  };

  const handleDeleteItem = async (itemId) => {
    try {
      await axios.delete(`/api/items/${itemId}`);
      fetchCollection();
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  return (
    <div>
      {collection && (
        <>
          <h1>{collection.name}</h1>
          <p>{collection.description}</p>
          <ul>
            {collection.items.map((item) => (
              <li key={item.id}>
                {item.name}
                {isAuthenticated && (
                  <>
                    <button onClick={() => setEditingItem(item)}>Edit</button>
                    <button onClick={() => handleDeleteItem(item.id)}>Delete</button>
                  </>
                )}
              </li>
            ))}
          </ul>
          {isAuthenticated && (
            <>
              <button onClick={() => setEditingItem({})}>Add Item</button>
              {editingItem && (
                <ItemForm item={editingItem} onSave={handleSave} collectionId={collection.id} />
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default CollectionPage;