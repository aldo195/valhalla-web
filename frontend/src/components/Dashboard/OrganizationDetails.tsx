import {Col, Row} from 'antd';
import React from 'react';
import {Pie} from '../Chart';
import './OrganizationDetails.css';

interface OrganizationDetailsProps {
  data: {
    x?: number;
    y?: number;
  };
}

const OrganizationDetails = (props: OrganizationDetailsProps) => {
  const {data} = props;

  const x = data.x || 0;
  const y = data.y || 0;

  return (
    <Row gutter={8} style={{width: 138, margin: '8px 0'}}>
      <Col span={12} style={{paddingTop: 36}}>
        <Pie
          animate={false}
          color={'#F0F2F5'}
          inner={0.55}
          tooltip={false}
          percent={x / (x + y + 0.01) * 100 + 0.01}
          height={64}
        />
      </Col>
    </Row>
  );
};

export default OrganizationDetails;
