import { useEffect, useState } from "react";

export default function App() {
  const [query, setQuery] = useState(``);
  const [products, setProducts] = useState([]);

  const handleSearch = () => {
    if (!query.trim()) {
      setProducts([]);
      return;
    }
    try {
      fetch(`http://localhost:3333/products?search=${query}`)
        .then((resp) => resp.json())
        .then((data) => setProducts(data));
    } catch (error) {
      console.error(err);
    }
  };
  useEffect(() => {
    handleSearch(query);
  }, [query]);

  return (
    <>
      <h1>EX - Autocomplete</h1>
      <p>Cerca il prodotto</p>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {products.length > 0 && (
        <div className="card">
          {products.map((p) => (
            <p key={p.id}>{p.name}</p>
          ))}
        </div>
      )}
    </>
  );
}
