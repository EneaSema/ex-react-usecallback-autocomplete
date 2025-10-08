import { useState, useEffect } from "react";

function App() {
  const [query, setQuery] = useState(``);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:3333/products?search=${query}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setProducts(data);
      })
      .catch((err) => console.error(err));
  }, []);
  return (
    <>
      <h1>EX - Autocomplete</h1>
      <input
        type="text"
        title="Seleziona il prodotto"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {products && (
        <ul>
          {products.map((p, i) => {
            <li key={i}>{p}</li>;
          })}
        </ul>
      )}
    </>
  );
}

export default App;
