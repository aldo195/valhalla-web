import {Col, Row} from 'antd';
import React from 'react';
import {Pie} from '../Chart';
import './DetailsTab.css';
import NumberInfo from './NumberInfo';

interface DetailsTabProps {
  data: {
    name: string;
    passing?: number;
    failing?: number;
    pending?: number;
  };
  isSelected: boolean;
}

const DetailsTab = (props: DetailsTabProps) => {
  const {data, isSelected} = props;

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
          color={isSelected ? '#F0F2F5' : '#BDE4FF'}
          inner={0.55}
          tooltip={false}
          percent={passing / (passing + failing + pending + 0.01) * 100 + 0.01}
          height={64}
        />
      </Col>
    </Row>
  );
};

export default DetailsTab;
