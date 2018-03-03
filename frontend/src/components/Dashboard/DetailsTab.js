import React from 'react';
import './DetailsTab.css';
import {Col, Row} from 'antd';
import NumberInfo from './NumberInfo';
import {Pie} from '../Chart';

const DetailsTab = ({data, isSelected}) => {
  const passing = data.passing || 0;
  const failing = data.failing || 0;
  const pending = data.pending || 0;

  return (
    <Row gutter={8} style={{width: 138, margin: '8px 0'}}>
      <Col span={12}>
        <NumberInfo title={data.name} passing={passing} failing={failing} pending={pending} />
      </Col>
      <Col span={12} style={{paddingTop: 36}}>
        <Pie
          animate={false}
          color={!isSelected && '#BDE4FF'}
          inner={0.55}
          tooltip={false}
          margin={[0, 0, 0, 0]}
          percent={passing / (passing + failing + pending + 0.01) * 100 + 0.01}
          height={64}
        />
      </Col>
    </Row>
  );
};

export default DetailsTab;
