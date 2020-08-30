import React, { useState, useRef, useEffect } from 'react';
import { Form, Row, Col, Button, Container } from 'react-bootstrap';
import { PlusOutlined, CloseOutlined, PlusCircleFilled, PlusCircleOutlined } from '@ant-design/icons';

import { Tabs } from 'antd';

const { TabPane } = Tabs;

import gbstyle from '../../assets/gbstyle'

export default function FrmList() {

    useEffect(() => {
    }, []);

    return (
        <div>
            <Form>
                <Form.Group >
                    <Row >
                        <Col style={gbstyle.formtoppic}>
                            List Screen On Development
                        </Col>
                    </Row>
                    <hr className="formhr" />
                    <Row>
                        <Col >
                            <Tabs
                                className="formtabnormal"
                                tabBarStyle={{
                                    borderBottomColor: '#9B9B9B',
                                    borderBottomWidth: 3,
                                    borderBottomStyle: "solid"
                                }}
                                defaultActiveKey="1">
                                <TabPane tab="New" key="1">
                                </TabPane>
                                <TabPane tab="In Proress" key="2">
                                </TabPane>
                                <TabPane tab="Complete" key="3">
                                </TabPane>
                                <TabPane tab="Cancel" key="4">
                                </TabPane>
                                <TabPane tab="All" key="5">
                                </TabPane>
                            </Tabs>
                        </Col>
                    </Row>
                </Form.Group>
            </Form>
        </div>
    )
}


