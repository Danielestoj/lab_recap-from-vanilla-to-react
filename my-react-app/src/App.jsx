import './App.css'
import { useState, useEffect } from "react";
import "./App.css";

function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [skip, setSkip] = useState(0);

  const limit = 10;

  async function fetchUsers() {
    setLoading(true);

    try {
      const response = await fetch(
        `https://dummyjson.com/users?limit=${limit}&skip=${skip}`
      );

      const datos = await response.json();

      const newUsers = datos.users;

      setUsers((prevUsers) => [...prevUsers, ...newUsers]);

      setSkip((prev) => prev + limit);

    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h1>User Profiles</h1>

      <div id="user-list-container">
        {users.map((user) => (
          <div className="user-card" key={user.id}>
            <img src={user.image} alt={user.firstName} />

            <h3>
              {user.firstName} {user.lastName}
            </h3>
          </div>
        ))}
      </div>

      <button onClick={fetchUsers} disabled={loading}>
        {loading ? "Loading..." : "Load More"}
      </button>
    </div>
  );
}

export default UserList;