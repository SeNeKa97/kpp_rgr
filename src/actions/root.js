export const deleteInvoice = (invoice) => (
    {type: 'DELETE_INVOICE'}
);

export const updateInvoice = (invoice, newData) => (
    {type: 'UPDATE_INVOICE', invoice, newData}
);

export const createInvoice = (invoice) => (
    {type: 'CREATE_INVOICE', invoice}
);

export const updateInvoicesList = () => (
    {type: 'UPDATE_INVOICES_LIST'}
);