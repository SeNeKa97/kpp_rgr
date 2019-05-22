import React from 'react';


class InvoiceCreator extends React.Component{
    constructor(props){
        super(props);

        this.state={
            currentItem: {}
        }
    }



    render(){
        return (
            <div className="InvoiceCreator">
                <h1>Creator</h1>
            </div>
        );
    }
}

export default InvoiceCreator;