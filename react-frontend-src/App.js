import './App.css';
import * as React from 'react';
import Manager from './manager/Login';
import Corporate from './corporate/Login';
import Customer from './customer/Landing';
import CustomerStoreView from './customer/Store';
import CorporateStores from './corporate/Stores';
import CorporateStore from './corporate/Store';
import ManagerMissing from './manager/Missing';
import ManagerHome from './manager/Home';
import ManagerInventory from './manager/Inventory';
import CorporateCreateItem from './corporate/CreateItem';

//router
import { BrowserRouter as Router, Routes, Route, Link, Navigate, useParams, useNavigate } from 'react-router-dom';
import AuthContext from './store/auth-context';
import CorporateAssignItemLocation from './corporate/AssignItemLocation';
import CorporateCreateStoreAlternative from './corporate/storeCreateAlternative';
import CorporateHome from './corporate/Home';

function App() {

  const authCtx = React.useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;
  const padding = {
    padding: 5
  }
  // console.log("Logged in from app.js")
  return (
    <div>
      <Router>
        <Routes>
          {/* DO NOT DELETE: The following routes with isLoggedIn logic as they will be needed in the next iteration, currently I'm disabling them to allow
          more seamless user interaction for iteration 1 grading*/}
          {/*           
          {!isLoggedIn && (<Route exact path="/corporate/login" element={<Corporate />} />)}
          {isLoggedIn && (
            <Route path="/corporate/all_stores" element={<CorporateStores />} />
          )}
          {isLoggedIn && (
            <Route path="/corporate/all_stores/:storeId" element={<CorporateStore />} />
          )}
          {isLoggedIn && (
            <Route path="/corporate/create" element={<CorporateCreate />} />
          )} */}

          <Route exact path="/corporate/home" element={<CorporateHome />} />
          <Route exact path="/corporate/login" element={<Corporate />} />
          <Route path="/corporate/all_stores" element={<CorporateStores />} />
          <Route path="/corporate/:storeId/storeInventory" element={<CorporateStore />} />
          <Route path="/corporate/createItem" element={<CorporateCreateItem />} />
          <Route path="/corporate/assignItemLocation" element={<CorporateAssignItemLocation />} />
          <Route path="/corporate/createStoreAlternative" element={<CorporateCreateStoreAlternative />} />
        </Routes>

        <Routes>
          <Route exact path="/manager/login" element={<Manager />} />
          <Route path="/manager/:storeId/home" element={<ManagerHome />} />
          <Route path="/manager/:storeId/inventory" element={<ManagerInventory />} />
          <Route path="/manager/:storeId/missing" element={<ManagerMissing />} />
        </Routes>

        <Routes>
          <Route path="/" element={<Customer />} />
          <Route path="/all_stores/:storeId" element={<CustomerStoreView />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App;
