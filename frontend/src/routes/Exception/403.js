import React from 'react';
import * as exceptionTypes from '../../constants/exceptionTypes';
import {Exception} from '../../components/Exception/index';

export default () => (
  <Exception type={exceptionTypes.UNAUTHORIZED_ACCESS_ERROR} style={{minHeight: 500, height: '80%'}} />
);
