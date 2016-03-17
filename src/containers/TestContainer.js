/**
 * Created by bei.hua on 15/11/24.
 */
import InvoiceLess from '../../less/invoice.less';
import InvoiceAdd from '../components/invoice/InvoiceAddDialog.js';
import BankChangeHistory from '../components/bank/BankChangeHistory.js';

/**
 * Created by bei.hua on 15/11/24.
 */
import React, { Component } from 'react';
import {Grid} from 'eagle-ui';

export default class TestContainer extends Component{

    constructor(props, context) {
        super(props, context);
    }
    render(){
        return (
            <Grid>
                <BankChangeHistory/>
            </Grid>
        );
    }
}