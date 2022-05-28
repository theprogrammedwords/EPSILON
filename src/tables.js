import React, { useState, useMemo } from "react";
import styled from "styled-components";
import config from "./config";

const Wrapper = styled.div`
  margin: 16px;
  border: 1px solid lavender;
  border-radius: 8px;
  .tables {
    display: flex;
    p {
      width: 33%;
      padding: 10px;
    }
    p.ascending::after {
      content: "⬇️";
      display: inline-block;
      margin-left: 1em;
    }

    p.descending::after {
      content: "⬆️";
      display: inline-block;
      margin-left: 1em;
    }
  }

  .tables:hover {
    background: #f0f6ff;
  }

  .even {
    background: #f7f7f7;
  }
`;

const useSortableData = (items, config = null) => {
  const [sortConfig, setSortConfig] = React.useState(config);

  const sortedItems = React.useMemo(() => {
    let sortableItems = [...items];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [items, sortConfig]);

  const requestSort = (key) => {
    let direction = "ascending";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  return { items: sortedItems, requestSort, sortConfig };
};

const Tables = (props) => {
  const { items, requestSort, sortConfig } = useSortableData(config);
  const getClassNamesFor = (name) => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };
  return (
    <Wrapper>
      <div className="tables">
        <p
          style={{ cursor: "pointer" }}
          onClick={() => requestSort("name")}
          className={getClassNamesFor("name")}
        >
          <strong>Product Name</strong>
        </p>
        <p
          style={{ cursor: "pointer" }}
          onClick={() => requestSort("price")}
          className={getClassNamesFor("price")}
        >
          <strong>Price</strong>
        </p>
        <p
          style={{ cursor: "pointer" }}
          onClick={() => requestSort("category")}
          className={getClassNamesFor("category")}
        >
          <strong>Category</strong>
        </p>
      </div>
      {items.map((item, index) => {
        return (
          <div key={index} className={`tables ${index % 2 ? "even" : "odd"}`}>
            <p>{item.name}</p>
            <p>{item.price}</p>
            <p>{item.category}</p>
          </div>
        );
      })}
    </Wrapper>
  );
};

export default Tables;
