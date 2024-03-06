import React from "react";
import PizzaForm from "./components/PizzaForm/PizzaForm";
import PizzaTracker from "./components/PizzaTracker/PizzaTracker";
import MainDisplay from "./components/MainDisplay/MainDisplay";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import "./App.css";

const App = () => {
  return (
    <div>
      <Header />
      <PizzaForm />
      <PizzaTracker />
      <MainDisplay />
      <Footer />
    </div>
  );
};

export default App;
