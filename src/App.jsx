import { useState, useEffect, useCallback } from "react";
function debounce(callback, delay) {
  let timer;
  return (value) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      callback(value);
    }, delay);
  };
}

export default function App() {
  const [query, setQuery] = useState(``);
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handlesearch = async (query) => {
    if (!query.trim()) {
      setProducts([]);
      return;
    }
    try {
      const resp = await fetch(
        `http://localhost:3333/products?search=${query}`
      );
      const data = await resp.json();

      console.log(data), setProducts(data);
      console.log("Api");
    } catch (error) {
      console.error(error);
    }
  };

  const debounceHandleSearch = useCallback(debounce(handlesearch, 300), []);
  useEffect(() => {
    debounceHandleSearch(query);
  }, [query]);

  const handleSelect = async (id) => {
    try {
      const resp = await fetch(`http://localhost:3333/products/${id}`);
      const data = await resp.json();
      console.log(data);
      setSelectedProduct(data);
      setQuery(``);
      setProducts([]);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <h1>EX - Autocomplete</h1>
      <p>Cambo di ricerca prodotti</p>
      <div className="container-card">
        <input
          type="text"
          placeholder="Cerca il prodotto che vuoi"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        {products.length > 0 && (
          <>
            {products.map((p) => (
              <p key={p.id} onClick={() => handleSelect(p.id)}>
                {p.name}
              </p>
            ))}
          </>
        )}
        {selectedProduct && (
          <div>
            <h2>{selectedProduct.name}</h2>
            <img src={selectedProduct.image} alt={selectedProduct.name} />
            <p>{selectedProduct.description}</p>
            <p>
              <strong>Prezzo:</strong>
              {selectedProduct.price.toFixed(2)}€
            </p>
          </div>
        )}
      </div>
    </>
  );
}
