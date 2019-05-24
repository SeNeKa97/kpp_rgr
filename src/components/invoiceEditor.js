import React from 'react';
import {connect} from "react-redux";
import {setAppState, editInvoice, updateInvoicesList, setCurrentInvoice} from '../actions/root';
import "../index.css";


export class InvoiceEditor extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            errorsFound: false
        };

        this.onClickBack = this.onClickBack.bind();
        this.onClickEdit = this.onClickEdit.bind();
        this.dataValidate = this.dataValidate.bind();
        this.reverseFormatDate = this.reverseFormatDate.bind();

        this.formatDate = this.formatDate.bind();
    }


    onClickBack = () =>{
        const {setAppState, setCurrentInvoice} = this.props;

        setCurrentInvoice({});
        setAppState("display");
    };


    onClickEdit = () => {
        const {currentInvoice} = this.props;
        const {setAppState} = this.props;
        const {editInvoice, setCurrentInvoice} = this.props;

        if (this.dataValidate()){
            let number = parseInt(document.getElementById("invoiceNumber").value);
            let dateDue= document.getElementById("invoiceDateDue").value;
            let dateSupply= document.getElementById("invoiceDateSupply").value;
            let comment= document.getElementById("invoiceComment").value;

            let newInvoice = {
                ...currentInvoice,
                number: number,
                date_supply: this.formatDate(dateSupply),
                date_due: this.formatDate(dateDue),
                comment: comment
            };

            editInvoice(currentInvoice, newInvoice);
            setCurrentInvoice({});
            setAppState("display");
        }
    };


    formatDate = (inDate) => {
        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"];

        let date = new Date(inDate);
        let day = date.getDate();
        let year = date.getFullYear();
        let month = date.getMonth();

        return ("00" + day).substr(-2,2) + " " + monthNames[month] + " "+ year;
    };


    reverseFormatDate = (inDate) => {
        let {setAppState, setCurrentInvoice} = this.props;
        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"];
        try {
            let dateArray = inDate.split(" ");
            let day = parseInt(dateArray[0]);
            let monthString = dateArray[1];
            let year = parseInt(dateArray[2]);

            let month = monthNames.indexOf(monthString)+1;

            return ""+year+"-"+("00" + month).substr(-2,2)+"-"+("00" + day).substr(-2,2);
        } catch(err){
            setCurrentInvoice({});
            setAppState("display");
        }

    };


    dataValidate = () => {
        let number = document.getElementById("invoiceNumber");
        let dateDue= document.getElementById("invoiceDateDue");
        let dateSupply= document.getElementById("invoiceDateSupply");
        let comment= document.getElementById("invoiceComment");
        let errorText = document.getElementById("errorText");

        let numberRegex = /[0-9]{1,6}/;

        if(!number.value.match(numberRegex)||!dateDue.value||!dateSupply.value||!comment.value){
            this.setState({...this.state, errorsFound: true});
            errorText.innerText = "Errors found!";
            return false;
        } else{
            this.setState({...this.state, errorsFound: false});
            errorText.innerText = "";
            return true;
        }
    };


    componentDidMount() {
        const {currentInvoice} = this.props;

        let number = document.getElementById("invoiceNumber");
        let dateDue = document.getElementById("invoiceDateDue");
        let dateSupply = document.getElementById("invoiceDateSupply");
        let comment = document.getElementById("invoiceComment");

        number.value = currentInvoice.number;
        dateDue.value = this.reverseFormatDate(currentInvoice.date_due);
        dateSupply.value = this.reverseFormatDate(currentInvoice.date_supply);
        comment.value = currentInvoice.comment;
    }


    render(){
        let {currentInvoice} = this.props;
        return (
            <div className="InvoiceEditor">
                <div className="header">
                    <h1>Редактировать инвойс №{currentInvoice.number}</h1>
                </div>
                <form>
                    <p id="errorText"/>
                    <label>Номер инвойса:</label><br/>
                    <input type="text" id="invoiceNumber" placeholder="Номер" required /><br/>
                    <label>Дата прихода инвойса:</label><br/>
                    <input type="date" id="invoiceDateDue" required /><br/>
                    <label>Дата подачи инвойса:</label><br/>
                    <input type="date" id="invoiceDateSupply" required/><br/>
                    <label>Комментарий к инвойсу:</label><br/>
                    <input type="text" id="invoiceComment" placeholder="Комментарий" required/><br/>
                    <hr/>
                    <button className="btn-primary" style={{marginRight: 5+"px"}}   onClick={this.onClickBack}>Вернуться</button>
                    <input type="submit" className="createButton btn-success" onClick={this.onClickEdit} value="Сохранить"/>
                </form>


            </div>
        );
    }
}


function mapDispatchToProps(dispatch){
    return {
        setAppState: state =>
            dispatch(setAppState(state)),
        setCurrentInvoice: invoice =>
            dispatch(setCurrentInvoice(invoice)),
        editInvoice: (invoice, newInvoice) =>
            dispatch(editInvoice(invoice, newInvoice)),
        updateInvoicesList: () =>
            dispatch(updateInvoicesList())
    };
}


function mapStateToProps(state){
    return{
        appState: state.appState,
        invoices: state.invoices,
        currentInvoice: state.currentInvoice
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(InvoiceEditor);