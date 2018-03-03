import React from 'react';
import * as exceptionTypes from '../../constants/exceptionTypes';
import {Exception} from '../../components/Exception';

export default () => <Exception type={exceptionTypes.INTERNAL_SERVER_ERROR} style={{minHeight: 500, height: '80%'}} />;
