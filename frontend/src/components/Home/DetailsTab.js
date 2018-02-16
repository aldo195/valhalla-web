import React from 'react';
import './DetailsTab.css';
import {Col, Row} from 'antd';
import {NumberInfo} from './NumberInfo';
import {Pie} from '../Chart';

let DetailsTab = ({data, isSelected}) => (
  <Row gutter={8} style={{width: 138, margin: '8px 0'}}>
    <Col span={12}>
      <NumberInfo title={data.name} passing={data.passing} failing={data.failing} pending={data.pending} />
    </Col>
    <Col span={12} style={{paddingTop: 36}}>
      <Pie
        animate={false}
        color={!isSelected && '#BDE4FF'}
        inner={0.55}
        tooltip={false}
        margin={[0, 0, 0, 0]}
        percent={data.passing / (data.passing + data.failing + data.pending + 0.01) * 100 + 0.01}
        height={64}
      />
    </Col>
  </Row>
);

export {DetailsTab};
