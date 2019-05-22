const initialState = {
    appState: 'display',
    count: 0,
    invoices:[]
};



const invoicesReducer = function(state=initialState, action){
    let invoices = {};
    let invoice = {};
    let count = 0;
    let index = -1;

    switch (action.type){
        case 'CREATE_INVOICE':
            let created = action.invoice;

            count = state.count;
            invoices = [...state.invoices];

            if(!invoices.includes(created) && created != null) {
                invoices = [...invoices, created];
                count++;
            }

            return {
                ...state,
                count,
                invoices
            };
        case 'EDIT_INVOICE':
            invoice = action.invoice;
            let newInvoice = action.newData;

            invoices = [...state.invoices];
            index = invoices.indexOf(invoice);

            if (index !== 1) {
                invoices.splice(index, 1, newInvoice)
            }

            return {
                ...state,
                invoices
            };
        case 'DELETE_INVOICE':
            invoice = action.invoice;
            invoices = state.invoices;
            count = state.count;

            index = invoices.indexOf(invoice);

            if (index !== 1) {
                invoices.splice(index, 1);
                count--;
            }

            return {
                ...state,
                count,
                invoices
            };
        case 'UPDATE_INVOICES_LIST':

            return {
                ...state
            };
        default:
            return state;
    }

};

export default invoicesReducer;