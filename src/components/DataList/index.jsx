//#region Imports

import ModalCrudUI from 'containers/ModalCrudUI';
import React, { Fragment, useCallback, useRef, useState } from 'react';
import { Table } from 'semantic-ui-react';
import styles from './styles.module.css';
import TableBody from './TableBody';
import TableFooter from './TableFooter';
import TableHeader from './TableHeader';

//#endregion

const DataList = ({ headers, data, edit, remove, isLoading, pageable, fetch }) => {
    const modalRef = useRef();
    const [selectedId, setSelectedId] = useState(null);

    const handleRemove = useCallback(async () => {
        await remove(selectedId);
        fetch();
    }, [remove, selectedId, fetch]);

    return (
        <Fragment>
            <ModalCrudUI ref={modalRef} onConfirm={() => handleRemove()} isRemove>
                <div className={styles.modalText}>
                    Ao confirmar a solicitação, este item será excluído. Deseja continuar?
                </div>
            </ModalCrudUI>

            <Table celled>
                <TableHeader headers={headers} />

                <TableBody
                    show={() => modalRef.current.show()}
                    {...{ headers, data, edit, setSelectedId, isLoading }}
                />

                <TableFooter fetch={fetch} pageable={pageable} />
            </Table>
        </Fragment>
    );
};

export default DataList;
