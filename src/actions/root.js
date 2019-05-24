export const deleteInvoice = (invoice) => (
    {type: 'DELETE_INVOICE', invoice}
);

export const editInvoice = (invoice, newInvoice) => (
    {type: 'EDIT_INVOICE', invoice, newInvoice}
);

export const createInvoice = (invoice) => (
    {type: 'CREATE_INVOICE', invoice}
);

export const updateInvoicesList = () => (
    {type: 'UPDATE_INVOICES_LIST'}
);

export const setAppState = (newState) => (
    {type: 'SET_APP_STATE', newState}
);

export const setCurrentInvoice = (invoice) => (
    {type: 'SET_CURRENT_INVOICE', invoice}
);