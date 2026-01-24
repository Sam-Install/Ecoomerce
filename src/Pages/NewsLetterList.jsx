import React, { useEffect, useState } from "react";

const NewsletterList = () => {
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/newsletter", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setSubscribers(data);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [token]);

  if (loading) return <p>Loading subscribers...</p>;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Newsletter Subscribers</h1>
      <ul>
        {subscribers.map((sub) => (
          <li key={sub.id} className="border p-2 rounded mb-2">
            {sub.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NewsletterList;
