import React from 'react';
import * as exceptionTypes from '../../constants/exceptionTypes';
import {Exception} from '../../components/Exception';

export default () => <Exception type={exceptionTypes.NOT_FOUND_ERROR} style={{minHeight: 500, height: '80%'}} />;
