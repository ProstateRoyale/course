import React, { useState } from 'react';
import axios from 'axios';

const ItemForm = ({ item, onSave, collectionId }) => {
  const [name, setName] = useState(item.name || '');
  const [tags, setTags] = useState(item.tags || '');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (item.id) {
        await axios.put(`/api/items/${item.id}`, { name, tags });
      } else {
        await axios.post('/api/items', { name, tags, collectionId });
      }
      onSave();
    } catch (error) {
      console.error('Error saving item:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Tags"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
      />
      <button type="submit">Save</button>
    </form>
  );
};

export default ItemForm;
