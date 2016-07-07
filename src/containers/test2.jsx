import React, { Component ,PropTypes} from 'react';
import { connect } from 'react-redux';
import * as testAction from '../actions/test.es6';

@connect(state => ({
    test: state.test
}), testAction)
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
                {this.props.test.get('name') }
            </div>
        );
    }
}