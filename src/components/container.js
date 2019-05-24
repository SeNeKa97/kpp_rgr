import React from 'react';
import {connect} from "react-redux";
import {updateInvoicesList} from '../actions/root';
import InvoiceDisplay from './invoiceDisplay';
import InvoiceCreator from './invoiceCreator';
import InvoiceEditor from './invoiceEditor';


class Container extends React.Component{
    constructor(props){
        super(props);

        this.state={
            appState: 'display'
        };

        this.switchRender = this.switchRender.bind();
    }


    switchRender = () => {
        let {appState} = this.props;

        if(appState === 'display'){
            return <InvoiceDisplay/>
        } else if (appState === 'edit'){
            return <InvoiceEditor/>
        } else if (appState === 'create'){
            return <InvoiceCreator/>
        } else {
            return <h1>Wrong app state!</h1>
        }
    };


    render(){
        return (
            <div className=" wrapper Container">
                {this.switchRender()}
            </div>
        );
    }
}

function mapDispatchToProps(dispatch){
    return{
        updateInvoicesList: ()=>
            dispatch(updateInvoicesList())
    }
}
function mapStateToProps(state){
    return {
        appState: state.appState
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);