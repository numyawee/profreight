import React, { useState, useRef, useEffect } from 'react';
import { Form, Row, Col, Button, Container } from 'react-bootstrap';
import { PlusOutlined, CloseOutlined, PlusCircleFilled, PlusCircleOutlined } from '@ant-design/icons';

import { Select } from 'antd';
import { Tabs } from 'antd';

const { TabPane } = Tabs;
const { Option } = Select;

import gbstyle from '../../assets/gbstyle'

export default function FrmDragDrop() {
    const [error, seterror] = useState();

    useEffect(() => {
    }, []);

    return (
        <div>
            form drag drop
        </div>
    )
}


