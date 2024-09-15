import { useState } from "react";

export const FormItemsView = ({ handler }) => {
  const [formData, setFormData] = useState({
    product: "",
    price: "",
    quantity: "",
  });

  const [errors, setErrors] = useState({});
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    let formErrors = {};

    if (!formData.product) formErrors.product = "El Producto es obligatorio";
    if (!formData.price) formErrors.price = "El Precio es obligatorio";
    if (!formData.quantity) formErrors.quantity = "El Cantidad es obligatorio";

    if (isNaN(formData.price))
      formErrors.price = "El Precio debe ser un valor numérico válido";
    if (isNaN(formData.quantity))
      formErrors.quantity = "El Cantidad debe ser un valor numérico válido";

    setErrors(formErrors);

    // Si no hay errores, retornamos true
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      handler(formData);
      setFormData({
        product: "",
        price: "",
        quantity: "",
      });
    } else {
      console.log(errors);
    }
  };

  return (
    <>
      <form className="w-50" onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            className={`m-3 form-control ${errors.product ? "is-invalid" : ""}`}
            id="product"
            name="product"
            placeholder="Producto"
            value={formData.product}
            onChange={handleChange}
          />
          {errors.product && (
            <div className="invalid-feedback">{errors.product}</div>
          )}
        </div>
        <div className="form-group">
          <input
            type="text"
            className={`m-3 form-control ${errors.price ? "is-invalid" : ""}`}
            id="price"
            name="price"
            placeholder="Precio"
            value={formData.price}
            onChange={handleChange}
          />
          {errors.product && (
            <div className="invalid-feedback">{errors.price}</div>
          )}
        </div>
        <div className="form-group">
          <input
            type="text"
            className={`m-3 form-control ${
              errors.quantity ? "is-invalid" : ""
            }`}
            id="quantity"
            name="quantity"
            placeholder="Cantidad"
            value={formData.quantity}
            onChange={handleChange}
          />
          {errors.quantity && (
            <div className="invalid-feedback">{errors.quantity}</div>
          )}
        </div>
        <button type="submit" className="btn btn-primary m/3">
          Nuevo Item
        </button>
      </form>
    </>
  );
};
