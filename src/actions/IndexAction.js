/**
 * Created by mac on 15/11/23.
 */

import {actionType} from '../constants/actionType';

import {fetch} from 'eagle';

export function query(){
    return dispatch=>{
        fetch('test/test',{},function(data){
            dispatch({
                type: actionType.QUERY,
                data: data
            });
        })
    };
}