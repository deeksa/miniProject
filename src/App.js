import './App.css'
import {Switch, Route} from 'react-router-dom'
import LoginPage from './components/LoginPage'
import HomePage from './components/HomePage'
import UserDetail from './components/UserDetail'
import ProtectedRoute from './components/ProtectedRoute'
import MyProfile from './components/MyProfile'
import NotFound from './components/NotFound'

const App = () => (
  <Switch>
    <Route exact path="/login" component={LoginPage} />
    <ProtectedRoute exact path="/" component={HomePage} />
    <ProtectedRoute exact path="/users/:id" component={UserDetail} />
    <ProtectedRoute exact path="/my-profile" component={MyProfile} />
    <Route component={NotFound} />
  </Switch>
)

export default App
