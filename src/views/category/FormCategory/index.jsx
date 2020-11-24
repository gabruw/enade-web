//#region Imports

import { yupResolver } from '@hookform/resolvers/yup';
import FieldWrapper from 'components/FieldWrapper';
import MessageBox from 'components/MessageBox';
import React, { useCallback } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Button, Form } from 'semantic-ui-react';
import CATEGORY_FIELDS from 'utils/constants/field/category';
import CATEGORY_LABELS from 'utils/constants/label/category';
import useRequestState from 'utils/hooks/useRequestState';
import { includeCategory } from '../services/send-data';
import categorySchema from './schema';
import styles from './styles.modules.css';

//#endregion

const FormCategory = () => {
    const methods = useForm({
        reValidateMode: 'onBlur',
        resolver: yupResolver(categorySchema)
    });
    const { handleSubmit, errors } = methods;

    const { run, requestState } = useRequestState();
    const onSubmit = useCallback(
        async (data) => {
            await run(() => includeCategory(data));
        },
        [run]
    );

    return (
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={styles.field}>
                    <FieldWrapper
                        as={Form.Input}
                        errors={errors}
                        name={CATEGORY_FIELDS.DESCRIPTION}
                        label={CATEGORY_LABELS.DESCRIPTION}
                    />
                </div>

                <div className={styles.buttonContent}>
                    <Button type='submit' primary>
                        Salvar
                    </Button>
                </div>

                <MessageBox list={requestState.error} error />
            </form>
        </FormProvider>
    );
};

export default FormCategory;
