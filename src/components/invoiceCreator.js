import React from 'react';
import {connect} from "react-redux";
import {setAppState, createInvoice, updateInvoicesList} from '../actions/root';
import "../index.css";


class InvoiceCreator extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            errorsFound: false
        };

        this.onClickBack = this.onClickBack.bind();
        this.onClickCreate = this.onClickCreate.bind();
        this.dataValidate = this.dataValidate.bind();

        this.generateId = this.generateId.bind();
        this.generateDirection = this.generateDirection.bind();
        this.randomChar = this.randomChar.bind();
        this.formatDate = this.formatDate.bind();
    }


    onClickBack = () =>{
        const {setAppState} = this.props;

        setAppState("display");
    };


    onClickCreate = () => {
        const {setAppState} = this.props;
        const {createInvoice} = this.props;

        if (this.dataValidate()){
            let number = parseInt(document.getElementById("invoiceNumber").value);
            let dateDue= document.getElementById("invoiceDateDue").value;
            let dateSupply= document.getElementById("invoiceDateSupply").value;
            let comment= document.getElementById("invoiceComment").value;
            
            let invoice = {
                id: this.generateId(),
                direction: this.generateDirection(),
                number: number,
                date_created: this.formatDate(new Date()),
                date_due: this.formatDate(dateDue),
                date_supply: this.formatDate(dateSupply),
                comment: comment
            };

            createInvoice(invoice);
            setAppState("display");
        }
    };


    generateId = () => {
        let id = [];
        let idLength = 24;

        for(let i = 0; i < idLength; i++)
            id.push(this.randomChar());

        return id.join("");
    };


    generateDirection = () => {
        let id = [];
        const lengths = [8, 4, 4, 4, 12];

        for(let i = 0; i < lengths[0]; i++)
            id.push(this.randomChar());
        id.push('-');

        for(let i = 0; i < lengths[1]; i++)
            id.push(this.randomChar());
        id.push('-');

        for(let i = 0; i < lengths[2]; i++)
            id.push(this.randomChar());
        id.push('-');

        for(let i = 0; i < lengths[3]; i++)
            id.push(this.randomChar());
        id.push('-');

        for(let i = 0; i < lengths[4]; i++)
            id.push(this.randomChar());

        return id.join("");
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


    randomChar = () =>{
        let chars = '0123456789abcdef';
        let charsLength = chars.length;

        return chars.charAt(Math.floor(Math.random()*charsLength));
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


    render(){
        return (
            <div className="InvoiceCreator">
                <div className="header">
                    <h1>Создать инвойс</h1>
                </div>
                <hr/>
                <form>
                    <p id="errorText"/>
                    <label>Номер инвойса:</label><br/>
                    <input type="text" id="invoiceNumber" placeholder="Номер" required/><br/>
                    <label>Дата прихода инвойса:</label><br/>
                    <input type="date" id="invoiceDateDue" required/><br/>
                    <label>Дата подачи инвойса:</label><br/>
                    <input type="date" id="invoiceDateSupply" required/><br/>
                    <label>Комментарий к инвойсу:</label><br/>
                    <input type="text" id="invoiceComment" placeholder="Комментарий" required/><br/>
                    <hr/>
                    <button className="btn-primary" style={{marginRight: 5+"px"}}  onClick={this.onClickBack}>Вернуться</button>
                    <input type="submit" className="createButton btn-success" onClick={this.onClickCreate} value="Создать"/>
                </form>


            </div>
        );
    }
}


function mapDispatchToProps(dispatch){
    return {
        setAppState: state =>
            dispatch(setAppState(state)),
        createInvoice: invoice =>
            dispatch(createInvoice(invoice)),
        updateInvoicesList: () =>
            dispatch(updateInvoicesList())
    };
}


function mapStateToProps(state){
    return{
        appState: state.appState,
        invoices: state.invoices
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(InvoiceCreator);