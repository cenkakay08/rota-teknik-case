import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CustomerInfo from "./pages/CustomerInfo";
import Sales from "./pages/Sales";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Sales />
        </Route>
        <Route path="/customerInfo">
          <CustomerInfo />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
