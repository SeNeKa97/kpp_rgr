import React from 'react';
import {setAppState, deleteInvoice} from "../actions/root";
import {connect} from "react-redux";
import InvoiceTable from "./invoiceTable";


class InvoiceDisplay extends React.Component{
    constructor(props){
        super(props);

        this.state={
            appState: 'display'
        };

        this.onClick = this.onClick.bind();
    }

    onClick = () => {
        let {setAppState} = this.props;

        setAppState("create");
    };



    render(){
        return (
            <div className="InvoiceDisplay">
                <div className="header">
                    <h1>Список инвойсов</h1>
                </div>
                <hr/>
                <button className="btn-success" onClick={this.onClick}>Добавить Invoice</button>
                <p/>

                <InvoiceTable/>
                <br/>
                <hr/>
                <div className="footer">
                    ©, Bogdan Shevchuk, 2019 RGR
                </div>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch){
    return {
        setAppState: appState =>
            dispatch(setAppState(appState)),
        deleteInvoice: invoice =>
            dispatch(deleteInvoice(invoice))
    }
}

function mapStateToProps(state){
    return {
        appState: state.appState,
        invoices: state.invoices
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(InvoiceDisplay);