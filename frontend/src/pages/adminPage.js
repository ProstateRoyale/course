import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminPage = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('/api/users', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleBlockUser = async (userId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`/api/users/${userId}/block`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(users.map(user => user.id === userId ? { ...user, isBlocked: true } : user));
    } catch (error) {
      console.error('Error blocking user:', error);
    }
  };

  const handleUnblockUser = async (userId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`/api/users/${userId}/unblock`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(users.map(user => user.id === userId ? { ...user, isBlocked: false } : user));
    } catch (error) {
      console.error('Error unblocking user:', error);
    }
  };

  return (
    <div>
      <h1>User Management</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.username} ({user.email}) {user.isBlocked ? 'Blocked' : 'Active'}
            {user.isBlocked ? (
              <button onClick={() => handleUnblockUser(user.id)}>Unblock</button>
            ) : (
              <button onClick={() => handleBlockUser(user.id)}>Block</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPage;
