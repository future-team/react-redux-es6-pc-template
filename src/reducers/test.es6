import { createReducer } from 'eg-tools';
import Immutable from 'immutable';

import {actionType} from '../constants/action-type.es6';

const initialState = Immutable.fromJS({
    name:'init'
});

export const test = createReducer(initialState, {
    [actionType.QUERY]: (data, action) => {
        return data.merge(Immutable.fromJS(action.data));
    }
});