import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import LandingPage from "./components/LandingPage";
import StorePage from "./components/StorePage";
import ProductPage from "./components/ProductPage";
import ManageProductsPage from "./components/ManageProductsPage";
import ProductFormPage from "./components/ProductFormPage";
import CartPage from "./components/CartPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path = '/'>
            <LandingPage/>
          </Route>
          <Route path="/login" >
            <LoginFormPage/>
          </Route>
          <Route path="/signup">
            <SignupFormPage/>
          </Route>
          <Route exact path = '/store'>
            <StorePage/>
          </Route>
          <Route exact path = '/store/products/new'>
            <ProductFormPage/>
          </Route>
          <Route exact path = '/store/products/:productId'>
            <ProductPage/>
          </Route>
          <Route exact path = '/store/products/:productId/edit'>
            <ProductFormPage/>
          </Route>
          <Route exact path = '/current/products'>
            <ManageProductsPage/>
          </Route>
          <Route exact path = '/cart'>
            <CartPage/>
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
