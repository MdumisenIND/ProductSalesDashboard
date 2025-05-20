import { useState, useEffect } from "react";
import { fetchProducts } from "./api/products";
import type { Product } from "./types/Product";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProductsGrid } from "./components/ProductsGrid";
import { SalesDashboard } from "./components/SalesDashboard";
import "bootstrap/dist/css/bootstrap.min.css";

const App: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchProducts()
      .then((ps) => setProducts(ps))
      .catch(() => setError("Failed to load products"))
      .finally(() => setLoading(false));
  }, []);

  return (
    <BrowserRouter>
      <div className="container my-5">
        <Routes>
          {/* Main product grid */}
          <Route
            path="/"
            element={
              <div className="card p-4 shadow">
                <h2 className="mb-3">Product Dashboard</h2>
                <hr />
                {loading && (
                  <div className="text-center p-3">
                    <div className="spinner-border text-primary" />
                  </div>
                )}
                {error && <div className="alert alert-danger">{error}</div>}
                {!loading && !error && <ProductsGrid products={products} />}
              </div>
            }
          />
          {/* Sales report for product */}
          <Route
            path="/sales/:productId"
            element={<SalesDashboard products={products} />}
          />
          <Route path="*" element={<h3>Not Found</h3>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
