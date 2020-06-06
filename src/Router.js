import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Login from './pages/components/Login/Login';
import SignUp from './pages/components/SignUp/SignUp';
import History from './pages/components/History/History';
import Health from './pages/components/Health/Health';
import Upload from './pages/components/Upload/Upload';
import Enroll from './pages/components/Enroll/Enroll';
import Patient from './pages/components/Patient/Patient';
import EditPatientHistory from './pages/components/EditPatientHistory/EditPatientHistory';
import EditEnroll from './pages/components/Enroll/Edit-enroll/Edit-enroll'
import Profile from './pages/components/Profile/Profile'
import Auth from './auth';

const Router = (props) => (
  <Switch>
    <Route exact path="/">
      <Redirect to="/patient" />
    </Route>

    <Route exact path="/login" component={Login} />
    <Route path="/signup" component={SignUp} />
    <Route path="/upload" component={Upload} />
    <Route exact path="/patient" component={Patient} />
    <Route path="/editPatientHistory/:patientId/:editPatientId" component={EditPatientHistory} />
    <PrivateRoute path="/addPatientHistory/:patientId" component={EditPatientHistory} />
    <PrivateRoute path="/history/:historyId" component={History} />
    <PrivateRoute path="/health/:id" component={Health} />
    <PrivateRoute path="/profile" component={Profile} />
    <PrivateRoute path="/enroll" component={Enroll} />
    {/* <PrivateRoute path="/editPatientHistory/:patientId" component={EditPatientHistory} /> */}
    <PrivateRoute path="/update-patient/:editEnrollId" component={EditEnroll} />
  </Switch>
);

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      Auth.getAuth() ? (
        <Component {...props} />
      ) : (
          <Redirect
            to={{
              pathname: '/login',
            }}
          />
        )
    }
  />
);

export default Router;
