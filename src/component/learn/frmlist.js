import React, { useState, useRef, useEffect } from 'react';
import { Form, Row, Col, Button, Container } from 'react-bootstrap';
import { Table } from 'antd';

import gbstyle from '../../assets/gbstyle'

export default function FrmList() {
    const [data, setData] = useState([]);

    const columns = [
        {
            title: 'Comapny',
            dataIndex: 'company',
            key: 'company',
        },
        {
            title: 'Contact Person',
            dataIndex: 'contactperson',
            key: 'contactperson',
        },
        {
            title: 'Contact Number',
            dataIndex: 'cotactnumber',
            key: 'cotactnumber',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Documents',
            dataIndex: 'documents',
            key: 'documents',
            render: documents => (
                <>
                    {documents.map(document => {
                        return (
                            <div className="btn btn-primary btn-sm" style={{ ...gbstyle.formround, ...gbstyle.formbuttonoutline, ...gbstyle.formcontrol, ...gbstyle.formtablebutton }}>
                                {document}
                            </div>
                        );
                    })}
                </>
            ),
        }
    ];

    useEffect(() => {
        let initdata = [];
        for (let i = 1; i <= 50; i++) {
            initdata.push(
                {
                    company: 'Company A',
                    contactperson: 'เอกกวิน อินทน',
                    cotactnumber: '02-223-2345 ต่อ ' + i,
                    email: 'test_12345@testmail.com',
                    documents: ["บัตรประชาชน", "หนังสือรับรองบริษัท"],
                });
        }
        setData(initdata);
    }, []);

    return (
        <div>
            <Form>
                <Form.Group >
                    <Row >
                        <Col style={gbstyle.formtoppic}>
                            CUSTOMER LIST
                        </Col>
                    </Row>
                    <hr className="formhr" />
                    <Row>
                        <Col >
                            <Table
                                className="formtable"
                                size="small"
                                pagination={{ position: ["bottomLeft"], pageSize: 14 }}
                                columns={columns} dataSource={data}
                            />
                        </Col>
                    </Row>
                </Form.Group>
            </Form>
        </div>
    )
}


