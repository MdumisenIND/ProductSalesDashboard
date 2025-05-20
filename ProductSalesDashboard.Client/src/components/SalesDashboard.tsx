import React, { useEffect, useState } from "react";
import type { Sale } from "../types/Sale";
import type { Product } from "../types/Product";
import { fetchSales } from "../api/sales";
import { useParams, Link } from "react-router-dom";

const PAGE_SIZE = 50;

interface SalesDashboardProps {
  products: Product[];
}

export const SalesDashboard: React.FC<SalesDashboardProps> = ({ products }) => {
  const { productId } = useParams<{ productId: string }>();
  const [sales, setSales] = useState<Sale[]>([]);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [dateFrom, setDateFrom] = useState<string>("");
  const [dateTo, setDateTo] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const prodIdNum = Number(productId);
  const product = products.find((p) => p.productId === prodIdNum);

  async function fetchData() {
    if (!prodIdNum) return;
    setLoading(true);
    const res = await fetchSales(
      prodIdNum,
      dateFrom || undefined,
      dateTo || undefined,
      page
    );
    setSales(res);
    setTotalCount(
      res.length < PAGE_SIZE
        ? (page - 1) * PAGE_SIZE + res.length
        : (page + 1) * PAGE_SIZE
    );
    setLoading(false);
  }

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, [productId, dateFrom, dateTo, page]);

  if (!product) {
    return (
      <div>
        <div className="alert alert-warning">Product not found.</div>
        <Link to="/" className="btn btn-outline-primary">
          Back to Products
        </Link>
      </div>
    );
  }

  const onFilter = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    //fetchData();
  };

  return (
    <>
      <h3>
        Sales for{" "}
        <span className="badge bg-secondary">{product.description}</span>
      </h3>
      <Link to="/" className="btn btn-secondary mb-3">
        &laquo; Back to Products
      </Link>
      <form className="row g-3 mb-3" onSubmit={onFilter}>
        <div className="col-md-2">
          <input
            type="date"
            className="form-control"
            value={dateFrom}
            onChange={(e) => {
              setDateFrom(e.target.value);
              setPage(1);
            }}
          />
        </div>
        <div className="col-md-2">
          <input
            type="date"
            className="form-control"
            value={dateTo}
            onChange={(e) => {
              setDateTo(e.target.value);
              setPage(1);
            }}
          />
        </div>
        <div className="col-md-2">
          <button
            className="btn btn-primary w-100"
            disabled={loading}
            type="submit"
          >
            Filter
          </button>
        </div>
      </form>

      <div className="table-responsive">
        <table className="table table-striped align-middle">
          <thead>
            <tr>
              <th>Sale ID</th>
              <th>Price</th>
              <th>Qty</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={4} className="text-center">
                  Loading...
                </td>
              </tr>
            ) : sales.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center">
                  No data
                </td>
              </tr>
            ) : (
              sales.map((sale) => (
                <tr key={sale.saleId}>
                  <td>{sale.saleId}</td>
                  <td>R{sale.salePrice.toFixed(2)}</td>
                  <td>{sale.saleQty}</td>
                  <td>{sale.saleDate}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Simple Pagination */}
      <nav>
        <ul className="pagination justify-content-center">
          <li className={"page-item" + (page === 1 ? " disabled" : "")}>
            <button
              className="page-link"
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
            >
              Previous
            </button>
          </li>
          <li className="page-item disabled">
            <span className="page-link">{page}</span>
          </li>
          <li
            className={
              "page-item" + (sales.length < PAGE_SIZE ? " disabled" : "")
            }
          >
            <button
              className="page-link"
              onClick={() => setPage(page + 1)}
              disabled={sales.length < PAGE_SIZE}
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    </>
  );
};
