import React, { Component ,PropTypes} from 'react';
import { connect } from 'react-redux';

import TestC from '../components/Test/Test.jsx';
import * as TestAction from '../actions/test.es6';

@connect(state => ({
    test: state.test
}), TestAction)
export default class TestWebContainer extends Component {
    constructor(props) {
        super(props);
        this.props.query();
    }

    static defaultProps={

    };

    render() {
        return (
            <div>
                <TestC />
                {this.props.test.get('name') }
            </div>
        );
    }
}