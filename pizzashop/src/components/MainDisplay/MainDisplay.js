import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { cancelOrder } from "../../redux/actions";
import "./MainDisplay.css";

const MainDisplay = () => {
  const orders = useSelector((state) => state.orders);
  const dispatch = useDispatch();

  // Calculate total time spent on each order and total pizzas delivered today
  const totalPizzasDeliveredToday = orders.filter(
    (order) => order.stage === "Order Picked",
  ).length;

  const handleCancelOrder = (orderId) => {
    dispatch(cancelOrder(orderId));
  };

  return (
    <div className="main-display-container">
      <h2>Main Section</h2>
      <table className="main-table">
        <thead>
          <tr>
            <th>Order Id</th>
            <th>Stage</th>
            <th>Total time spent</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.orderId}>
              <td>{order.orderId}</td>
              <td>{order.stage}</td>
              <td>{order.time} sec</td>
              <td>
                {order.stage !== "Order Picked" && (
                  <button onClick={() => handleCancelOrder(order.orderId)}>
                    Cancel
                  </button>
                )}
              </td>
            </tr>
          ))}
          <tr className="total-delivered-row">
            <td colSpan="2">Total order delivered today:</td>
            <td colSpan="2">{totalPizzasDeliveredToday}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default MainDisplay;
