import React, { useState, useRef, useEffect } from 'react';
import { Form, Row, Col, Button, Container } from 'react-bootstrap';
import { PlusOutlined, CloseOutlined, PlusCircleFilled, PlusCircleOutlined } from '@ant-design/icons';

import { Select } from 'antd';
import { Tabs } from 'antd';

const { TabPane } = Tabs;
const { Option } = Select;

import gbstyle from '../../assets/gbstyle'

export default function FrmForm() {
    const [error, seterror] = useState();

    useEffect(() => {
    }, []);

    return (
        <div>
            <Form>
                <Form.Group >
                    <Row>
                        <Col>
                            <div class="hr-sect">Text Box</div>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Control size="sm" type="text" placeholder="Enter Text" style={gbstyle.formround} />
                        </Col>
                    </Row>
                </Form.Group>

                <Form.Group >
                    <Row>
                        <Col>
                            <div class="hr-sect">Text Area</div>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Control size="sm" as="textarea" rows="5" placeholder="Enter Text" style={gbstyle.formtextarearound} />
                        </Col>
                    </Row>
                </Form.Group>

                <Form.Group >
                    <Row>
                        <Col>
                            <div class="hr-sect">Button</div>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Button size="sm" style={{ ...gbstyle.formround, ...gbstyle.formbutton, ...gbstyle.formcontrol }}>Save</Button>
                            <Button size="sm" style={{ ...gbstyle.formround, ...gbstyle.formbuttonoutline, ...gbstyle.formcontrol }}>Reset Password</Button>
                            <Button size="sm" style={{ ...gbstyle.formround, ...gbstyle.formbutton, ...gbstyle.formcontrol }}><PlusOutlined /></Button>
                            <Button size="sm" style={{ ...gbstyle.formround, ...gbstyle.formbutton, ...gbstyle.formcontrol }}><CloseOutlined /></Button>
                            <Button size="sm" style={{ ...gbstyle.formround, ...gbstyle.formbuttonoutline, ...gbstyle.formcontrol }}><PlusCircleFilled /> {' '}Add</Button>
                            <Button size="sm" style={{ ...gbstyle.formround, ...gbstyle.formbutton, ...gbstyle.formcontrol }}><PlusCircleOutlined style={{ color: 'white' }} /> {' '}Create</Button>
                        </Col>
                    </Row>
                </Form.Group>

                <Form.Group >
                    <Row>
                        <Col>
                            <div class="hr-sect">Dropdown</div>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Select
                                showSearch
                                allowClear
                                optionFilterProp="children"
                                filterOption={(input, option) => (
                                    option.props.children.toLowerCase()
                                        .indexOf(input.toLowerCase()) >= 0
                                )}
                                style={{ ...gbstyle.formcontrol, width: '100%' }}>
                                <Option value="jack">Jack</Option>
                                <Option value="lucy">Lucy</Option>
                                <Option value="Yiminghe">yiminghe</Option>
                            </Select>
                        </Col>
                    </Row>
                </Form.Group>

                <Form.Group >
                    <Row>
                        <Col>
                            <div class="hr-sect">Dropdown Round</div>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Select
                                showSearch
                                allowClear
                                optionFilterProp="children"
                                filterOption={(input, option) => (
                                    option.props.children.toLowerCase()
                                        .indexOf(input.toLowerCase()) >= 0
                                )}
                                style={{ ...gbstyle.formcontrol, width: '100%' }} className="dropdownround">
                                <Option value="jack">Jack</Option>
                                <Option value="lucy">Lucy</Option>
                                <Option value="Yiminghe">yiminghe</Option>
                            </Select>
                        </Col>
                    </Row>
                </Form.Group>

                <Form.Group >
                    <Row>
                        <Col>
                            <div class="hr-sect">Tab</div>
                        </Col>
                    </Row>
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
                                    Content of Tab Pane 1
                            </TabPane>
                                <TabPane tab="In Proress" key="2">
                                    Content of Tab Pane 2
                            </TabPane>
                                <TabPane tab="Complete" key="3">
                                    Content of Tab Pane 3
                            </TabPane>
                                <TabPane tab="Cancel" key="4">
                                    Content of Tab Pane 4
                            </TabPane>
                                <TabPane tab="All" key="5">
                                    Content of Tab Pane 5
                            </TabPane>
                            </Tabs>
                        </Col>
                    </Row>
                </Form.Group>
            </Form>
        </div>
    )
}


