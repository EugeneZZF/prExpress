import React, { useEffect, useState } from "react";
import styles from "./Test.module.css";

const accesskey = localStorage.getItem("tokenKey");

// Import necessary libraries and generated gRPC-Web client and messages

// Initialize the gRPC client with the server's hostname

const loginData = {
  username: "admin",
  password: "Z5h4 nPwo nlXO xzbT vqfR 4dis",
  uri: "https://ca82805-wordpress-oa7zo.tw1.ru",
};
// Replace with your server's address

/**
 * React component to fetch and display WordPress categories.
 */
function Test() {
  // State variables to manage categories, loading state, and errors
  const [categories, setCategories] = useState([]); // Stores the list of categories
  const [loading, setLoading] = useState(true); // Indicates if data is being loaded
  const [error, setError] = useState(null); // Stores any error messages

  // useEffect hook to fetch categories when the component mounts

  if (loading) {
    return <div>Loading categories...</div>;
  }

  if (error) {
    return <div>Error fetching categories: {error}</div>;
  }

  return (
    <div>
      <h1>WordPress Categories</h1>
      <ul>
        {categories.map((category) => (
          <li key={category.id}>
            <a href={category.link}>{category.name}</a>
            <p>{category.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Test;
