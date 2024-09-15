import { useEffect, useState } from "react";
import { calcularTotal, getInvoice } from "./services/getInvoice";
import { ClientView } from "./components/ClientView";
import { CompanyView } from "./components/CompanyView";
import { InvoiceView } from "./components/InvoiceView";
import { ListItemsView } from "./components/ListItemsView";
import { TotalView } from "./components/TotalView";
import { FormItemsView } from "./components/FormItemsView";

const invoiceInitial = {
  id: 0,
  name: "",
  client: {
    name: "",
    lastName: "",
    address: {
      country: "",
      city: "",
      street: "",
      number: 0,
    },
  },
  company: {
    name: "",
    fiscalNumber: 0,
  },
  items: [],
  total: 0,
};

export const InoviceApp = () => {
  const [activeForm, setActiveForm] = useState(false);

  const [total, setTotal] = useState(0);
  const [invoice, setInvoice] = useState(invoiceInitial);
  const [items, setItems] = useState([]);
  const [counter, setCounter] = useState(4);

  useEffect(() => {
    const data = getInvoice();
    setInvoice(data);
    setItems(data.items);
  }, []);

  useEffect(() => {
    setTotal(calcularTotal(items));
  }, [items]);

  const { id, name, client, company } = invoice;

  const handleInvoiceItems = ({ product, price, quantity }) => {
    setItems([
      ...items,
      {
        id: counter,
        product: product.trim(),
        price: +price,
        quantity: parseInt(quantity, 10),
      },
    ]);

    setCounter(counter + 1);
  };

  const handleDeleteItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const onActiveForm = () => {
    setActiveForm(!activeForm);
  };

  return (
    <>
      <div className="container">
        <div className="card my-3">
          <div className="card-header">Ejemplo Factura</div>
          <div className="card-body">
            <InvoiceView id={id} name={name} />
            <div className="row my-3">
              <div className="col">
                <ClientView title="Datos del cliente" client={client} />
              </div>
              <div className="col">
                <CompanyView title="Datos de la empresa" company={company} />
              </div>
            </div>
            <ListItemsView
              title="Productos de la factura"
              items={items}
              handleDeleteItem={(id) => handleDeleteItem(id)}
            />
            <TotalView total={total} />
            <button className="btn btn-secondary" onClick={onActiveForm}>
              {!activeForm ? "Agregar Item" : "Ocultar Formulario"}
            </button>
            {!activeForm || <FormItemsView handler={handleInvoiceItems} />}
          </div>
        </div>
      </div>
    </>
  );
};
