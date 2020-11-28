//#region Imports

import 'assets/css/global.css';
import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import { SystemContextProvider } from 'storage/system/context';
import USER_FIELDS from 'utils/constants/field/user';
import AppRoutes from './AppRoutes';
import secureStorage from './utils/functions/secureStorage';

//#endregion

const App = () => {
    // Repopular System Context
    const user = secureStorage.getItem([USER_FIELDS.THIS]);

    return (
        <SystemContextProvider defaultValues={{ user }}>
            <AppRoutes />
        </SystemContextProvider>
    );
};
export default App;
