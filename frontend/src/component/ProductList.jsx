import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  const fetchProducts = async () => {
    const token = localStorage.getItem("authToken");
    try {
      const response = await axios.get("http://localhost:5000/products", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products", error);
    }
  };

  const filterProducts = () => {
    setFilteredProducts(
      products.filter(
        (product) =>
          product["data category"]
            .toLowerCase()
            .includes(search.toLowerCase()) ||
          product.fields.toLowerCase().includes(search.toLowerCase())
      )
    );
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [search, products]);

  console.log(products);

  return (
    <div className="product-list-container  p-8">
      <Input
        type="text"
        placeholder="Search by category or fields"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
      />
      <div className="flex gap-4 px-4 py-2">
        {filteredProducts.map((product) => (
          <Card
            key={product.id}
            title={product["data category"]}
            bordered={false}
            style={{
              width: 300,
            }}
          >
            <p>Record Count: {product["Record count"]}</p>
            <p>Fields: {product.fields}</p>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
