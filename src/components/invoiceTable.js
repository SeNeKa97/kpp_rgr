import React from 'react';
import {updateInvoicesList, setAppState, deleteInvoice} from "../actions/root";
import {connect} from "react-redux";
import RowFactory from "./rowFactory";
import '../index.css';


class InvoiceTable extends React.Component{
    constructor(props){
        super(props);

        this.state={
            appState: 'display'
        };
    }

    componentWillMount() {
        let {updateInvoicesList} = this.props;

        updateInvoicesList();
    }

    render(){
        let {invoices} = this.props;
        return (
            <div className="InvoiceTable">
                <table>
                    <tr>
                        <th className="idCol">Id</th>
                        <th className="dirCol">Направление</th>
                        <th className="numCol">Номер</th>
                        <th className="dcCol">Дата создания</th>
                        <th className="ddCol">Дата прохождения</th>
                        <th className="dsCol">Дата подачи</th>
                        <th className="commentCol">Комментарий</th>
                        <th className="editCol"/>
                        <th className="deleteCol"/>
                    </tr>
                    {
                        invoices.map((invoice, index)=>{
                        return <RowFactory invoice={invoice} index={index}/>
                    })}
                </table>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch){
    return {
        setAppState: appState =>
            dispatch(setAppState(appState)),
        updateInvoicesList: () =>
            dispatch(updateInvoicesList()),
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

export default connect(mapStateToProps, mapDispatchToProps)(InvoiceTable);