//#region Imports

import clsx from 'clsx';
import ScreenLoader from 'components/ScreenLoader';
import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import ROUTE_NAME from 'routes/route-name';
import { Segment } from 'semantic-ui-react';
import useSystemContext from 'storage/system/context';
import AUTHENTICATION_FIELDS from 'utils/constants/field/authentication';
import USER_FIELDS from 'utils/constants/field/user';
import secureStorage from 'utils/functions/secureStorage';
import useRequestState from 'utils/hooks/useRequestState';
import Login from './FormLogin';
import FormRegistration from './FormRegistration';
import { refresh } from './services/get-data';
import styles from './styles.module.css';

//#endregion

const Authentication = () => {
    const history = useHistory();
    const { user, addUser, removeUser } = useSystemContext();

    const [isLogin, setIsLogin] = useState(true);
    const [canRefresh, setCanRefresh] = useState(true);
    const segmentClass = clsx(styles.segment, { [styles.segmentLg]: !isLogin });

    const { run, requestState } = useRequestState();
    const fetchToken = useCallback(() => run(() => refresh()), [run]);

    useEffect(() => {
        if (canRefresh) {
            const localUser = secureStorage.getItem([USER_FIELDS.THIS]);
            if (localUser) {
                fetchToken()
                    .then(({ data }) => {
                        addUser({ ...user, [AUTHENTICATION_FIELDS.TOKEN]: data[AUTHENTICATION_FIELDS.TOKEN] });
                        history.push(ROUTE_NAME.IN.HOME);
                    })
                    .catch(() => {
                        removeUser();
                        history.push(ROUTE_NAME.OUT.HOME);
                    });
            }
        }
    }, [canRefresh, fetchToken, addUser, user, history, removeUser]);

    return (
        <div className={styles.content}>
            <ScreenLoader isLoading={requestState.isLoading} />

            <Segment className={segmentClass}>
                <div className={styles.context}>
                    {isLogin ? (
                        <Login setCanRefresh={setCanRefresh} setIsLogin={setIsLogin} />
                    ) : (
                        <FormRegistration setCanRefresh={setCanRefresh} setIsLogin={setIsLogin} />
                    )}
                </div>
            </Segment>
        </div>
    );
};

export default Authentication;
