import React from 'react';


class InvoiceEditor extends React.Component{
    constructor(props){
        super(props);

        this.state={
            currentItem: {}
        }
    }



    render(){
        return (
            <div className="InvoiceEditor">
                <h1>Editor</h1>
            </div>
        );
    }
}

export default InvoiceEditor;