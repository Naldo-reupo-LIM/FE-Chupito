import { Route, Switch } from 'react-router-dom'

import EventsPage from '../../pages/Events/Events'
import EventPage from '../../pages/Event/Event'
import PlayEventPage from '../../pages/PlayEvent/PlayEvent'
import UsersPage from '../../pages/Users/Users'
import UserPage from '../../pages/User/User'
import Login from '../../pages/Login/Login'
import EventInfoPage from '../../pages/EventInfo/EventInfo'

// Legacy
// TODO: Insert 0auth path "/" when user is logged
//import OauthDashboard from '../Dashboard/OauthDashboard'

export default function AppRoutes(): JSX.Element {
  return (
    <Switch>
      <Route path="/event-info">
        <EventInfoPage />
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
        <EventPage />
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
