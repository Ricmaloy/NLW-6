import { BrowserRouter, Switch, Route } from "react-router-dom";
import { AdminRoom } from "../pages/AdminRoom";
import { Home } from "../pages/Home";
import { NewRoom } from "../pages/NewRoom";
import { Room } from "../pages/Room";

export function Routes() {
    return(
        <BrowserRouter>
            <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/rooms/new" component={NewRoom} exact />
            <Route path="/rooms/:id" component={Room}/>
            <Route path="/admin/rooms/:id" component={AdminRoom}/>
            </Switch>
        </BrowserRouter>
    )
}