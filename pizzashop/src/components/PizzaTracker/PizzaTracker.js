import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  updateOrderStage,
  cancelOrder,
  updateOrderTime,
} from "../../redux/actions";
import "./PizzaTracker.css";

const PizzaTracker = () => {
  const orders = useSelector((state) => state.orders);
  const dispatch = useDispatch();

  useEffect(() => {
    const interval = setInterval(() => {
      orders.forEach((order) => {
        dispatch(
          order.stage !== "Order Picked"
            ? updateOrderTime(order.orderId, order.time + 1)
            : updateOrderTime(order.orderId, order.time),
        );
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [dispatch, orders]);

  const handleCancelOrder = (orderId) => {
    dispatch(cancelOrder(orderId));
  };

  const handleNextButtonClick = (orderId, currentStage) => {
    switch (currentStage) {
      case "Order Placed":
        dispatch(updateOrderStage(orderId, "Order in Making"));
        break;
      case "Order in Making":
        dispatch(updateOrderStage(orderId, "Order Ready"));
        break;
      case "Order Ready":
        dispatch(updateOrderStage(orderId, "Order Picked"));
        break;
      default:
        console.log("Unknown stage:", currentStage);
    }
  };

  const isStale = (order) => order.time > 180; // 3 minutes in seconds

  const stages = [
    "Order Placed",
    "Order in Making",
    "Order Ready",
    "Order Picked",
  ];

  return (
    <div>
      <h2>Pizza Tracker</h2>
      <div className="pizza-columns-container">
        {stages.map((stage) => (
          <div key={stage} className="pizza-column">
            <h3>{stage}</h3>
            {orders
              .filter((order) => order.stage === stage)
              .sort((a, b) => a.time - b.time)
              .map((order) => (
                <div
                  key={order.orderId}
                  className={`pizza-card ${isStale(order) ? "stale-order" : ""} ${
                    order.stage === "Order Picked" ? "order-ready" : ""
                  }`}
                >
                  <p>Order Id: {order.orderId}</p>
                  <p>Total time spent: {order.time} sec</p>
                  <p>
                    Time in current stage: {order.time - (order.prevTime || 0)}{" "}
                    sec
                  </p>
                  <div className="action-buttons">
                    {order.stage !== "Order Picked" && (
                      <button
                        onClick={() =>
                          handleNextButtonClick(order.orderId, order.stage)
                        }
                      >
                        Next
                      </button>
                    )}
                    {order.stage !== "Order Picked" && (
                      <button onClick={() => handleCancelOrder(order.orderId)}>
                        Cancel
                      </button>
                    )}
                    {order.stage === "Order Picked" && <p>Order Picked</p>}
                  </div>
                </div>
              ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PizzaTracker;
