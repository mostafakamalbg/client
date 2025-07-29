import { useEffect, useState } from "react";

function App() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  // 🔁 Load products on mount
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/api/products`)
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  // ➕ Add product
  const handleAdd = async () => { 
    await
    fetch(`${process.env.REACT_APP_API_URL}/api/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name:name, price: Number(price) })
    })
      .then(res => res.json())
      .then(data => {
        setProducts([...products, data]);
        setName("");
        setPrice("");
      });
  };

  return (
    <div>
      <h2>📦 Product List</h2>
      <ul>
        {products.map(p => (
          <li key={p.id}>{p.name} - ${p.price}</li>
        ))}
      </ul>

      <h3>Add New Product</h3>
      <input
        placeholder="Product name"
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <input
        placeholder="Price"
        type="number"
        value={price}
        onChange={e => setPrice(e.target.value)}
      />
      <button onClick={handleAdd}>Add Product</button>
    </div>
  
  );
}

export default App;
