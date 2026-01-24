import React, { useState } from "react";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    try {
      const res = await fetch(
        "http://127.0.0.1:8000/api/newsletter/subscribe",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        
        if (res.status === 422 && data.message?.email) {
          throw new Error(data.message.email[0]);
        }
        throw new Error(data.message || "Subscription failed");
      }

      setMessage(data.message || "Subscribed successfully!");
      setEmail(""); 
    } catch (err) {
      console.error(err);
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="my-10 text-center">
      <p className="text-2xl prata-regular">
        Subscribe now and get updated offers
      </p>
      <p className="text-green-400 mt-3">
        Once a member you will get updated offers and updates whenever they happen
      </p>

      <form
        onSubmit={onSubmitHandler}
        className="w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3"
      >
        <input
          className="w-full sm:flex-1 outline-none"
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button
          type="submit"
          className="bg-black text-xs text-white px-10 py-4"
          disabled={loading}
        >
          {loading ? "Subscribing..." : "Subscribe"}
        </button>
      </form>

      {message && <p className="mt-2 text-orange-400">{message}</p>}
      {error && <p className="mt-2 text-green-400">{error}</p>}
    </div>
  );
};

export default Newsletter;
