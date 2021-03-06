//#region Imports

import clsx from 'clsx';
import React from 'react';
import { Button, Dropdown, Icon, Menu } from 'semantic-ui-react';
import AvatarTrigger from './Avatar';
import styles from './styles.module.css';
import { useCallback } from 'react';

import secureStorage from 'utils/functions/secureStorage';
import USER_FIELDS from 'utils/constants/field/user';
import { useHistory } from 'react-router-dom';
import ROUTE_NAME from 'routes/route-name';

//#endregion

const TopMenu = ({ setVisible }) => {
    const history = useHistory();
    const buttonClass = clsx(styles.hoverItem, styles.hamburguerButton);

    const logout = useCallback(() => {
        secureStorage.removeItem(USER_FIELDS.THIS);
        history.push(ROUTE_NAME.OUT.LOGIN);
    }, [history]);

    return (
        <Menu stackable className={styles.menu}>
            <Menu.Menu position='left'>
                <Menu.Item className={styles.item}>
                    <Button icon className={buttonClass} onClick={() => setVisible(true)}>
                        <Icon name='align justify' />
                    </Button>
                </Menu.Item>
            </Menu.Menu>

            <Menu.Menu position='right'>
                <Dropdown item className={clsx(styles.hoverItem, styles.icon)} trigger={<AvatarTrigger />}>
                    <Dropdown.Menu>
                        <Dropdown.Header content='Configurações' icon='settings' />
                        <Dropdown.Item onClick={() => logout()}>
                            <Icon name='bed' />
                            Logout
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </Menu.Menu>
        </Menu>
    );
};

export default TopMenu;
