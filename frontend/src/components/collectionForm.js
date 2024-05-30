import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CollectionForm = ({ collection, onSave }) => {
  const [name, setName] = useState(collection ? collection.name : '');
  const [description, setDescription] = useState(collection ? collection.description : '');
  const [category, setCategory] = useState(collection ? collection.category : 'Books');
  const [image, setImage] = useState(collection ? collection.image : '');
  const [error, setError] = useState('');

  useEffect(() => {
    if (collection) {
      setName(collection.name || '');
      setDescription(collection.description || '');
      setCategory(collection.category || 'Books');
      setImage(collection.image || '');
    } else {
      setName('');
      setDescription('');
      setCategory('Books');
      setImage('');
    }
  }, [collection]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newCollection = {
      name,
      description,
      category,
      image,
    };

    try {
      if (collection && collection.id) {
        await axios.put(`/api/collections/${collection.id}`, newCollection);
      } else {
        await axios.post('/api/collections', newCollection);
      }
      onSave();
    } catch (err) {
      setError('Error saving collection');
    }
  };

  return (
    <div>
      <h1>{collection ? 'Add Collection' : 'Edit Collection'}</h1>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)} required>
          <option value="Books">Books</option>
          <option value="Signs">Signs</option>
          <option value="Silverware">Silverware</option>
          <option value="Other">Other</option>
        </select>
        <input
          type="text"
          placeholder="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default CollectionForm;


// import React, { useState, useEffect } from 'react'; если не работает то поставить это
// import axios from 'axios';

// const CollectionForm = ({ collection, onSave }) => {
//   const [name, setName] = useState(collection ? collection.name : '');
//   const [description, setDescription] = useState(collection ? collection.description : '');
//   const [category, setCategory] = useState(collection ? collection.category : 'Books');
//   const [image, setImage] = useState(collection ? collection.image : '');
//   const [error, setError] = useState('');

//   useEffect(() => {
//     if (collection) {
//       setName(collection.name || '');
//       setDescription(collection.description || '');
//       setCategory(collection.category || 'Books');
//       setImage(collection.image || '');
//     }
//   }, [collection]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const newCollection = {
//       name,
//       description,
//       category,
//       image,
//     };

//     try {
//       if (collection && collection.id) {
//         await axios.put(`/api/collections/${collection.id}`, newCollection);
//       } else {
//         await axios.post('/api/collections', newCollection);
//       }
//       onSave();
//     } catch (err) {
//       setError('Error saving collection');
//     }
//   };

//   return (
//     <div>
//       <h1>{collection ? 'Edit Collection' : 'Add Collection'}</h1>
//       {error && <p>{error}</p>}
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           placeholder="Name"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           required
//         />
//         <textarea
//           placeholder="Description"
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//           required
//         />
//         <select value={category} onChange={(e) => setCategory(e.target.value)} required>
//           <option value="Books">Books</option>
//           <option value="Signs">Signs</option>
//           <option value="Silverware">Silverware</option>
//           <option value="Other">Other</option>
//         </select>
//         <input
//           type="text"
//           placeholder="Image URL"
//           value={image}
//           onChange={(e) => setImage(e.target.value)}
//         />
//         <button type="submit">Save</button>
//       </form>
//     </div>
//   );
// };

// export default CollectionForm;
