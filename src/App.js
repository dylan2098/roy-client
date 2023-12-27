import {
  BrowserRouter,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import AdminLayout from "layouts/admin/Admin.js";
import AuthLayout from "layouts/auth/Auth.js";

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route {...rest} render={props => (
      localStorage.royClient_accessToken ? Component ? <Component {...props} /> : rest.render(props) : <Redirect to="/auth/login" />
    )} />
  )
}


const PublicRoute = ({ component: Component, ...rest }) => {
  if (rest.path === '/auth/login' && localStorage.royClient_accessToken) {
    return <Redirect to="/admin/home" />
  }

  return (
    <Route {...rest} render={props => Component ? <Component {...props} /> : rest.render(props)} />
  )
}

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <PrivateRoute path={"/admin"} render={(props) => <AdminLayout {...props} />} />
        <PublicRoute path="/auth/login" render={(props) => <AuthLayout {...props} />} />
        <Redirect from="/" to="/admin/home" />
      </Switch>
    </BrowserRouter>
  );
}


export default App;