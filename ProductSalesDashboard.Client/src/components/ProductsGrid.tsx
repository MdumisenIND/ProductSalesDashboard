import React from "react";
import type { Product } from "../types/Product.ts";
import { Link } from "react-router-dom";

interface ProductsGridProps {
  products: Product[];
}

export const ProductsGrid: React.FC<ProductsGridProps> = ({ products }) => (
  <div className="row">
    {products.map((p) => (
      <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4" key={p.productId}>
        <div className="card h-100 border shadow-sm">
          <Link
            to={`/sales/${p.productId}`}
            className="text-decoration-none text-dark"
          >
            <img
              src={p.image}
              className="card-img-top"
              alt={p.description}
              style={{ height: "180px", objectFit: "cover" }}
            />
            <div className="card-body d-flex flex-column">
              <h5 className="card-title">{p.description}</h5>
              <span className="badge bg-primary mb-2">{p.category}</span>
              <h6 className="card-subtitle mt-auto text-muted">
                ${p.salePrice.toFixed(2)}
              </h6>
            </div>
          </Link>
        </div>
      </div>
    ))}
  </div>
);
