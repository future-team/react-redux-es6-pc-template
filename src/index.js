import React from 'react';
import AppRouter from './containers/AppRouter';
import {BindReact} from 'eagle';

import * as reducers from './reducers/index';
require('../less/index.less');
//require('../less/public.less');

React.render(
<BindReact Module={AppRouter} reducers={reducers} />,
document.getElementById('root')
);
