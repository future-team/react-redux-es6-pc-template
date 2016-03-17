import React, { Component ,PropTypes} from 'react';
import { connect } from 'react-redux';

import * as IndexAction from '../actions/IndexAction';

import {Input} from 'eagle-ui';

@connect(state => ({
    test: state.test
}), IndexAction)
export default class IndexContainer extends Component {

    constructor(props,context){
        super(props,context);

        this.props.query();
    }
    render(){
        return (
            <div style={{padding:'20px'}}><Input value={this.props.test.get('name')} /></div>
        );
    }
}