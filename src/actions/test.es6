import {actionType} from '../constants/action-type.es6';

import {fetch} from 'eg-tools';

export function query(){
    return dispatch=>{
        fetch('/test',{},function(data){
            dispatch({
                type: actionType.QUERY,
                data: data
            });
        })
    };
}