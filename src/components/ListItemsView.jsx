import PropTypes from "prop-types";

import { RowItemView } from "./RowItemView";

export const ListItemsView = ({ title, items, handleDeleteItem }) => {
  return (
    <>
      <h4>{title}</h4>
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th>Producto</th>
            <th>Precio</th>
            <th>Cantidad</th>
          </tr>
        </thead>
        <tbody>
          {items.map(({ id, product, price, quantity }, i) => (
            <RowItemView
              key={id}
              id={id}
              product={product}
              price={price}
              quantity={quantity}
              handleDeleteItem={(id) => handleDeleteItem(id)}
            />
          ))}
        </tbody>
      </table>
    </>
  );
};

ListItemsView.propTypes = {
  title: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
};
