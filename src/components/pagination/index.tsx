import React from "react";
import "./Pagination.css";

interface PaginationProps {
  total: number;
  selected: number;
  onChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  total,
  selected,
  onChange,
}) => {
  let items = [];
  let ellipsisLeft = false;
  let ellipsisRight = false;

  for (let i = 1; i <= total; i++) {
    if (i === 1 || i === total || (i >= selected - 2 && i <= selected + 2)) {
      items.push(
        <button
          key={i}
          disabled={i === selected}
          className={`pagination-item ${selected === i ? "selected" : ""}`}
          onClick={() => onChange(i)}
        >
          {i}
        </button>
      );
    } else if (i < selected - 2 && !ellipsisLeft) {
      ellipsisLeft = true;
      items.push(
        <span key="ellipsisLeft" className="pagination-ellipsis">
          ...
        </span>
      );
    } else if (i > selected + 2 && !ellipsisRight) {
      ellipsisRight = true;
      items.push(
        <span key="ellipsisRight" className="pagination-ellipsis">
          ...
        </span>
      );
    }
  }

  return (
    <div className="pagination-container">
      <button
        className="pagination-item"
        onClick={() => onChange(selected - 1)}
        disabled={selected === 1}
      >
        &lt;
      </button>
      {items}
      <button
        className="pagination-item"
        onClick={() => onChange(selected + 1)}
        disabled={selected === total}
      >
        &gt;
      </button>
    </div>
  );
};

export default Pagination;
