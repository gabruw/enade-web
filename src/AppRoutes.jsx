//#region Imports

import RoutesFilter from 'components/RoutesFilter';
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ROUTES from 'routes/routes';

//#endregion

const AppRoutes = () => (
    <BrowserRouter>
        <Switch>
            {ROUTES.map(({ path, exact, component }) => (
                <Route key={path} path={path} exact={exact}>
                    <RoutesFilter>{component}</RoutesFilter>
                </Route>
            ))}
        </Switch>
    </BrowserRouter>
);

export default AppRoutes;
