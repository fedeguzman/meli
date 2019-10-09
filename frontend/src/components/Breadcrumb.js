import React from "react";

const Breadcrumb = props => {
  return (
    <nav aria-label="categorias">
      <ol className="breadcrumb">
        {props.categories.map((category, i) => {
          return (
            <li className="breadcrumb-item" key={i}>
              {category}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
