import React, { Component } from 'react';
import { Container, Row, Col, Modal, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Order } from '../actions/actions'
import { Link } from 'react-router-dom';
import styled from 'styled-components'


const OrderHead = styled.div`
    background:#f7a43c;
    color:#fff;
    font-weight:bold;
    text-align:center;
    padding:10px;
`
const OrderBody = styled.div`
background:#fff;
color:#272727;
font-weight:bold;
text-transform: capitalize;
padding:5px;
text-align:center;

`
const OrderContainer = styled.div`
margin: 10px;
cursor:pointer;
`
const Heading = styled.div`
    color:#fff;
    font-weight:bold;
    text-transform:uppercase;
    text-align:center;
`



class Customer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            allOrders: [],

        }
        // this.selectMenu = this.selectMenu.bind(this)    
    }


    placeOrder = () => {
        try {

            let orderDetails = {
                OrderCreatedTimeStamp: new Date().toISOString(),
                BeverageBarOrderId: this.props.globalStore.BeverageIds[this.state.userBeverageId],
                OrderedBeverage: this.props.globalStore.Beverages[this.state.userBeverageId],
                OrderQuantity: 1,
                IsBeingMixed: false,
                IsReadyToCollect: false,
                IsCollected: false,
                BeverageBarUserId: window.btoa(this.state.userName + ":" + String(new Date().toISOString())),
                BeverageBarUserFirstName: this.state.userName,
                OrderDeliveredTimeStamp: "",
            }

            console.log(this.state, orderDetails, this.props);
            let od = this.props.order;
            od.push(orderDetails)
            this.props.Order(od);
            this.setState({ allOrders: od })

        } catch (error) {
            console.log(error);
        }
    }

    componentDidMount = () => {
        this.setState({ allOrders: this.props.order })

        //To keep in Loop
        setInterval(() => {
            let temp = this.state.allOrders
            if (temp.length > 0) {
                this.setState({ allOrders: temp })
            }
        }, 1000)
    }

    isBeingMixedUpdate = (index) => {
        let temp_ = this.state.allOrders;
        temp_[index]['IsBeingMixed'] = true;
        this.setState({ allOrders: temp_ })

        this.props.Order(temp_)
    }

    isReadyToCollectUpdate = (index) => {
        let temp_ = this.state.allOrders;
        temp_[index]['IsReadyToCollect'] = true;
        this.setState({ allOrders: temp_ })

        this.props.Order(temp_)
    }

    render() {
        // console.log(this.props, this.state)
        const beverageMenu = this.props.globalStore;
        let inQuene = [];
        let inMix = [];
        let inCollected = [];

        {
            this.state.allOrders.forEach((ele, index) => {
                let seconds = Math.ceil((new Date().getTime() - new Date(ele.OrderCreatedTimeStamp).getTime()) / 1000)
                let ele_dom = (
                    <OrderContainer key={index}>
                        <OrderHead>{ele.OrderedBeverage.Name}</OrderHead>
                        <OrderBody>{ele.BeverageBarUserFirstName}</OrderBody>
                        {/* {Math.ceil((new Date().getTime() - new Date(ele.OrderCreatedTimeStamp).getTime()) / 1000)} */}
                    </OrderContainer>
                )
                if (seconds > 120 || ele.IsReadyToCollect) {
                    if (!ele.IsReadyToCollect) {
                        this.isReadyToCollectUpdate(index)
                    }
                    inCollected.push(<div>{ele_dom}</div>);
                } else {

                    if (seconds > 60 || ele.IsBeingMixed) {
                        if (!ele.IsBeingMixed) {
                            this.isBeingMixedUpdate(index);
                        }
                        inMix.push(<div onClick={() => { this.isReadyToCollectUpdate(index); }}>{ele_dom}</div>);
                    } else {

                        if (seconds < 60) {
                            inQuene.push(<div onClick={() => { this.isBeingMixedUpdate(index); }}>{ele_dom}</div>);
                        }

                    }
                }


            })
        }


        return (
            <React.Fragment>
                <Container>
                    <br />
                    <Row
                        style={{
                            'justify-content': 'flex-end', 'padding': '15px'

                        }}
                    >
                        <Link to='/customer' >
                            <Button variant="secondary">Switch to customer</Button>
                        </Link>
                    </Row>
                    <Row>
                        <Col xs={{ span: 12, order: 1 }} md={{ span: 12, order: 2 }}>
                            <Heading>BEVERAGE queue</Heading>

                            <Row style={{
                                'border': '2px solid #fff',
                                'height': '100%',
                                'min-height': '40vh',
                                'margin': 'auto',
                                'padding': '10px'
                            }}>
                                <Col xs={{ span: 12, order: 3 }} md={{ span: 4, order: 1 }}>
                                    <Heading>In the Queue</Heading>
                                    {inQuene}
                                </Col>
                                <Col xs={{ span: 12, order: 2 }} md={{ span: 4, order: 2 }}>
                                    <Heading>being mixed</Heading>
                                    {inMix}
                                </Col>
                                <Col xs={{ span: 12, order: 1 }} md={{ span: 4, order: 3 }}>
                                    <Heading>ready to collect</Heading>
                                    {inCollected}
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
                {
                    this.state.toggle ?
                        <Modal.Dialog backdrop={'true'}>
                            <Modal.Header>
                                <Modal.Title>Modal title</Modal.Title>
                            </Modal.Header>

                            <Modal.Body>
                                <p>Modal body text goes here.</p>
                                <input id="userName" onChange={this.handleChange} />
                                <select id="userBeverageId" onClick={this.handleChange} >
                                    {beverageMenu.Beverages.map((ele, index) => (
                                        <option value={index} key={index}>{ele.Name} </option>
                                    )
                                    )}
                                </select>
                            </Modal.Body>

                            <Modal.Footer>
                                <Button variant="secondary" onClick={this.toggleMenu}>Close</Button>
                                <Button variant="primary" onClick={this.placeOrder}>Order Now</Button>
                            </Modal.Footer>
                        </Modal.Dialog>
                        :
                        null
                }

            </React.Fragment>
        )
    }


}

const mapDispatchToProps = dispatch => {
    return {
        Order: order => dispatch(Order(order))
    }
}

const mapStateToProps = state => {
    return {
        order: state.order
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Customer)