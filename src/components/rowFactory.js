import React from 'react';
import {connect} from "react-redux";
import {updateInvoicesList, deleteInvoice, setAppState, setCurrentInvoice} from '../actions/root';



class RowFactory extends React.Component{
    constructor(props){
        super(props);

        this.state={
            appState: 'display',
            invoice: {},
            invoices: []
        };

        this.onClickEdit = this.onClickEdit.bind();
        this.onClickDelete = this.onClickDelete.bind();
    }

    onClickEdit = () => {
        const {invoice} = this.props;
        let {setAppState} = this.props;
        let {setCurrentInvoice} = this.props;


        setCurrentInvoice(invoice);
        setAppState("edit");
    };


    onClickDelete = () => {
        let {deleteInvoice} = this.props;
        let {invoice} = this.props;

        deleteInvoice(invoice);
        updateInvoicesList();
        this.forceUpdate();
        window.location.reload();
    };


    render(){
        let {invoice, index} = this.props;
        return (
            <tr key={index}>
                <td>{invoice.id}</td>
                <td>{invoice.direction}</td>
                <td className="numCol">{invoice.number}</td>
                <td>{invoice.date_created}</td>
                <td>{invoice.date_due}</td>
                <td>{invoice.date_supply}</td>
                <td>{invoice.comment}</td>
                <td><button className="btn-primary"  onClick={this.onClickEdit}>Изменить</button></td>
                <td><button className="btn-danger" onClick={this.onClickDelete}>Удалить</button></td>
            </tr>
        );
    }
}



function mapDispatchToProps(dispatch){
    return{
        updateInvoicesList: ()=>
            dispatch(updateInvoicesList()),
        deleteInvoice: (invoice)=>
            dispatch(deleteInvoice(invoice)),
        setAppState: state =>
            dispatch(setAppState(state)),
        setCurrentInvoice: invoice =>
            dispatch(setCurrentInvoice(invoice))
    }
}


function mapStateToProps(state){
    return {
        appState: state.appState,
        invoices: state.invoices
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RowFactory);