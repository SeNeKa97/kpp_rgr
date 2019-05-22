import React from 'react';


class InvoiceDisplay extends React.Component{
    constructor(props){
        super(props);

        this.state={
            currentItem: {}
        }
    }



    render(){
        return (
            <div className="InvoiceDisplay">
                <h1>Display</h1>
            </div>
        );
    }
}

export default InvoiceDisplay;