import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const TagCloud = () => {
  const [tags, setTags] = useState([]);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await axios.get('/api/tags');
        setTags(response.data);
      } catch (error) {
        console.error('Error fetching tags:', error);
      }
    };

    fetchTags();
  }, []);

  return (
    <div>
      <h2>Tags</h2>
      <div>
        {tags.map((tag) => (
          <Link key={tag} to={`/search?query=${tag}`} className="tag-link">
            {tag}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TagCloud;
