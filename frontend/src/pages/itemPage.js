import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ItemPage = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [likes, setLikes] = useState(0);
  const [userLiked, setUserLiked] = useState(false);
  const token = localStorage.getItem('token');
  const isAuthenticated = !!token;

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await axios.get(`/api/items/${id}`);
        setItem(response.data);
      } catch (error) {
        console.error('Error fetching item:', error);
      }
    };

    const fetchComments = async () => {
      try {
        const response = await axios.get(`/api/comments/${id}`);
        setComments(response.data);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    const fetchLikes = async () => {
      try {
        const response = await axios.get(`/api/likes/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setLikes(response.data.count);
        setUserLiked(response.data.userLiked);
      } catch (error) {
        console.error('Error fetching likes:', error);
      }
    };

    fetchItem();
    fetchComments();
    fetchLikes();
  }, [id, token]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('/api/comments', { content: newComment, itemId: id }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setComments([...comments, { content: newComment }]);
      setNewComment('');
    } catch (error) {
      console.error('Error posting comment:', error);
    }
  };

  const handleLikeToggle = async () => {
    try {
      if (userLiked) {
        await axios.delete('/api/likes', {
          data: { itemId: id },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setLikes(likes - 1);
      } else {
        await axios.post('/api/likes', { itemId: id }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setLikes(likes + 1);
      }
      setUserLiked(!userLiked);
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };

  if (!item) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>{item.name}</h1>
      <p>Tags: {item.tags}</p>
      <p>Collection: {item.collection.name}</p>

      <div>
        {isAuthenticated && (
          <button onClick={handleLikeToggle}>
            {userLiked ? 'Unlike' : 'Like'} ({likes})
          </button>
        )}
      </div>

      <div>
        <h2>Comments</h2>
        {isAuthenticated && (
          <form onSubmit={handleCommentSubmit}>
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              required
            />
            <button type="submit">Add Comment</button>
          </form>
        )}
        <ul>
          {comments.map((comment, index) => (
            <li key={index}>{comment.content}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ItemPage;
