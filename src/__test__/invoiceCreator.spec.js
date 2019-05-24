import React from 'react';
import {InvoiceEditor} from '../components/invoiceEditor'
import {shallow} from 'enzyme/build'
import {describe} from "mocha";

describe('>>>H O M E --- Shallow Render REACT COMPONENTS',()=>{
    let wrapper;
    const output = 10;
    let currentInvoice = {
        id: "5ac1f09a60edb54701c767da",
        direction: "8ad47368-b85b-4b25-a209-9a975fa85ba1",
        number: 55958,
        date_created: "07 May 1973",
        date_due: "15 August 2009",
        date_supply: "28 May 2004",
        comment: "Officia cillum fugiat aliqua dolor sint adipisicing anim."
    };

    beforeEach(()=>{
        wrapper = shallow(<InvoiceEditor currentInvoice={currentInvoice}/>)
    });

    it('+++ render the DUMB component', () => {
        expect(wrapper.length).toEqual(1)
    });

    it('+++ contains output', () => {
        expect(wrapper.find('input[id="invoiceNumber"]').prop('value')).toEqual(currentInvoice.number);
    });

});