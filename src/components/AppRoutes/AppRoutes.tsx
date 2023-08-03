import { Route, Switch } from 'react-router-dom'

import EventsPage from '../../pages/Events/Events'
import EventPage from '../../pages/Event/Event'
import PlayEventPage from '../../pages/PlayEvent/PlayEvent'
import UsersPage from '../../pages/Users/Users'
import UserPage from '../../pages/User/User'
import Login from '../../pages/Login/Login'
import EventInfoPage from '../../pages/EventInfo/EventInfo'
import EventsAdminPage from '../../pages/EventsAdmin/EventsAdmin'
import ProtectedRoutes from './ProtectedRoute/ProtectedRoutes'
import { useAuth } from '../../shared/hooks/useAuth'

// Legacy
// TODO: Insert 0auth path "/" when user is logged
//import OauthDashboard from '../Dashboard/OauthDashboard'

export default function AppRoutes(): JSX.Element {
  const user = useAuth();
  
  return (
    <Switch>
      <Route path="/event-info/:id">
        <EventInfoPage />
      </Route>
      <Route path='/events/list'>
        <ProtectedRoutes user={user.state.isAdmin} component={EventsAdminPage} />
      </Route>
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/play-event/:id">
        <PlayEventPage />
      </Route>
      <Route path="/users">
        <UsersPage />
      </Route>
      <Route path="/event/add">
        <ProtectedRoutes user={user.state.isAdmin} component={EventPage} />
      </Route>
      <Route path="/user/add">
        <UserPage />
      </Route>
      <Route path="/">
        <EventsPage />
      </Route>
    </Switch>
  )
}
