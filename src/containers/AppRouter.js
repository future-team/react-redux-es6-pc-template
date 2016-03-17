import React, { Component ,PropTypes} from 'react';
import { Redirect, Router, Route } from 'react-router';
import History from 'history/lib/createHashHistory';

import Index from './IndexContainer';

export default class AppRouter extends Component {
    constructor(props) {
        super(props);
        // Opt-out of persistent state, not recommended.
        this.history = new History({
            queryKey: false
        });

    }

    static defaultProps={

    };

    /**
     * 页面路由总览，children为外接做入口，外接入口即为AppRouter
     * @returns {XML}
     */
    render() {
        return (
            <div>
                <Router history={this.history}>
                    <Route path="/index" name="index" component={Index} />
                    <Redirect from="/" to="/index" />
                </Router>
            </div>
        );
    }
//<PaymentsComponent rsp={rsp} header={title} submit={submit}/>
}







