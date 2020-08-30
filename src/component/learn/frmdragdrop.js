import React, { useState, useRef, useEffect } from 'react';
import { useStyles } from 'react-styles-hook'
import { Form, Row, Col, Button, Container } from 'react-bootstrap';
import { PlusOutlined, CloseCircleOutlined, CloseCircleFilled, PlusCircleFilled, PlusCircleOutlined } from '@ant-design/icons';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import gbstyle from '../../assets/gbstyle'

export default function FrmDragDrop() {
    const [items, setItems] = useState([
        {
            Id: '1',
            Name: "Sea Freight (Import)",
            Documents: [
                { Id: '1', Name: "Invoice" },
                { Id: '2', Name: "Package List" },
                { Id: '3', Name: "B/L" },
                { Id: '4', Name: "Privillage Form" },
                { Id: '5', Name: "Invoice" },
                { Id: '6', Name: "Package List" },
                { Id: '7', Name: "B/L" },
                { Id: '8', Name: "Privillage Form" }
            ]
        },
        {
            Id: '2',
            Name: "Sea Freight (Export)",
            Documents: [
                { Id: '1', Name: "Invoice" },
                { Id: '2', Name: "Package List" },
                { Id: '3', Name: "B/L" },
                { Id: '4', Name: "Privillage Form" },
            ]
        },
        {
            Id: '3',
            Name: "Air Freight (Import)",
            Documents: [
                { Id: '1', Name: "Invoice" },
                { Id: '2', Name: "Package List" },
                { Id: '3', Name: "B/L" },
                { Id: '4', Name: "Privillage Form" },
            ]
        },
        {
            Id: '4',
            Name: "Air Freight (Export)",
            Documents: [
                { Id: '1', Name: "Invoice" },
                { Id: '2', Name: "Package List" },
                { Id: '3', Name: "B/L" },
                { Id: '4', Name: "Privillage Form" },
            ]
        },
        {
            Id: '5',
            Name: "Cross Border Truck (Import)",
            Documents: [
                { Id: '1', Name: "Invoice" },
                { Id: '2', Name: "Package List" },
                { Id: '3', Name: "B/L" },
                { Id: '4', Name: "Privillage Form" },
            ]
        },
        {
            Id: '6',
            Name: "Sea Freight (Export)",
            Documents: [
                { Id: '1', Name: "Invoice" },
                { Id: '2', Name: "Package List" },
                { Id: '3', Name: "B/L" },
                { Id: '4', Name: "Privillage Form" },
            ]
        },
        {
            Id: '7',
            Name: "Domestic Truck",
            Documents: [
                { Id: '1', Name: "Invoice" },
                { Id: '2', Name: "Package List" },
                { Id: '4', Name: "Privillage Form" },
            ]
        },
        {
            Id: '8',
            Name: "Warehouse",
            Documents: [
                { Id: '1', Name: "Invoice" },
                { Id: '3', Name: "B/L" },
                { Id: '4', Name: "Privillage Form" },
            ]
        }
    ]);

    useEffect(() => {
    }, []);

    useEffect(() => {
        console.log(items)
    }, [items]);

    const getItemStyle = (isDragging, draggableStyle, mystyle) => ({
        ...mystyle,
        ...draggableStyle
    });

    const getListStyle = isDraggingOver => ({
        background: isDraggingOver ? "lightblue" : "lightgrey"
    });

    const reorder = (list, startIndex, endIndex) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);

        return result;
    };

    function onDragEnd(result, id, documents) {
        //console.log('drag end')
        if (!result.destination) {
            return;
        }

        if (result.destination.index === result.source.index) {
            return;
        }

        const itemsorder = reorder(
            documents,
            result.source.index,
            result.destination.index
        )

        let newitems = [...items];
        let item = newitems.filter(data => data.Id == id)[0]
        if (item) {
            item.Documents = itemsorder;
            //console.log(newdatalist)
            setItems(newitems);
        }
    }

    const DivBody = (id, documents) => {
        return (
            <DragDropContext onDragEnd={(result) => onDragEnd(result, id, documents)}>
                <Droppable droppableId={id}>
                    {(provided, snapshot) => (
                        <div
                            id="divdragdropbody"
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            style={{ ...styles.divmainbody }}
                        >
                            {documents.map((item, index) => (
                                <Draggable key={item.Id} draggableId={item.Id} index={index}>
                                    {(provided, snapshot) => (
                                        <div
                                            className="btn btn-primary btn-sm"
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            style={getItemStyle(
                                                snapshot.isDragging,
                                                provided.draggableProps.style,
                                                { ...gbstyle.formround, ...gbstyle.formbutton, ...gbstyle.formcontrol, fontSize: 12, width: '95%', marginTop: 5, display: "flex", justifyContent: "space-between", alignItems: "center" }
                                            )}
                                        >
                                            {' ' + item.Name}
                                            <CloseCircleFilled style={{ fontSize: 15 }} className="nofixtop" />
                                        </div>
                                    )}
                                </Draggable>
                            ))}

                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>

            //         <div style={styles.divmainbody} id="divdragdropbody">

            //         </div>
        )
    }

    const DivMain = (item) => {
        //console.log(rowData)
        return (
            <div style={{ height: 300, marginTop: 15, borderRadius: 10, padding: 8, borderStyle: "solid", borderColor: '#CACACA', borderWidth: 1 }}>
                <div style={styles.divmainheader}>
                    {item.Name}
                </div>

                {DivBody(item.Id, item.Documents)}

                <div style={styles.divmainfooter}>
                    <Button size="sm" style={{ ...gbstyle.formround, ...gbstyle.formbuttonoutline, ...gbstyle.formcontrol, fontSize: 12, width: '95%' }} className="formbutton">
                        <PlusCircleFilled style={{ fontSize: 15, marginLeft: 0 }} />
                        {' '}Add New Document
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div>
            <Form>
                <Form.Group >
                    <Row >
                        <Col style={gbstyle.formtoppic}>
                            REQUIRED DOCUMENT
                        </Col>
                    </Row>
                    <hr className="formhr" />
                    <Row >
                        {items.map((item, index) => (
                            <Col key={index} md={3} style={gbstyle.formtoppic}>
                                {DivMain(item)}
                            </Col>
                        ))}
                    </Row>
                </Form.Group>
            </Form>
        </div>
    )
}

const styles = useStyles({
    divmainheader: {
        height: '8%',
        fontStyle: 'bold',
        fontSize: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#C0C0C0',
        borderBottomStyle: "solid",
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
        marginBottom: 5
    },
    divmainbody: {
        height: '78%',
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignContent: "center",
        overflowY: "auto"
    },
    divmainfooter: {
        height: '10%',
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
        marginTop: 5
    }
})




