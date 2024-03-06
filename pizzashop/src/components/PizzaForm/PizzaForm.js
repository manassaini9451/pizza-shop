import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { placeOrder } from "../../redux/actions";
import "./PizzaForm.css";

const PizzaForm = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders);

  const [order, setOrder] = useState({ type: "", size: "", base: "" });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setOrder((prevOrder) => ({ ...prevOrder, [name]: value }));
  };

  const handlePlaceOrder = () => {
    if (orders.length < 10) {
      if (order.type && order.size && order.base) {
        dispatch(placeOrder(order));
        setOrder({ type: "", size: "", base: "" });
      } else {
        alert("Please fill in all fields.");
      }
    } else {
      alert("Not taking any more orders for now.");
    }
  };

  return (
    <div className="form-container">
      <h2>Place Pizza Order</h2>
      <form>
        <label className="label">
          Pizza Type:
          <select
            className="select"
            name="type"
            value={order.type}
            onChange={handleInputChange}
          >
            <option value="">Select Type</option>
            <option value="Veg">Veg</option>
            <option value="Non-Veg">Non-Veg</option>
          </select>
        </label>

        <label className="label">
          Pizza Size:
          <select
            className="select"
            name="size"
            value={order.size}
            onChange={handleInputChange}
          >
            <option value="">Select Size</option>
            <option value="Small">Small</option>
            <option value="Medium">Medium</option>
            <option value="Large">Large</option>
          </select>
        </label>

        <label className="label">
          Pizza Base:
          <select
            className="select"
            name="base"
            value={order.base}
            onChange={handleInputChange}
          >
            <option value="">Select Base</option>
            <option value="Thin">Thin</option>
            <option value="Thick">Thick</option>
          </select>
        </label>
        <button className="button" type="button" onClick={handlePlaceOrder}>
          Place Order
        </button>
      </form>
    </div>
  );
};

export default PizzaForm;
