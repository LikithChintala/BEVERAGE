import React, { Component } from 'react';
import { Container, Row, Col, Modal, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Order } from '../actions/actions'
import { Link } from 'react-router-dom';

class Customer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            toggle: false,
            userName: '',
            userBeverageId: '',

            allOrders: [],

        }
        // this.selectMenu = this.selectMenu.bind(this)    
    }

    toggleMenu = () => {
        this.setState({ toggle: !this.state.toggle, userBeverageId: "0", userName: '' })
    }

    handleChange = (e) => {
        this.setState({ [e.target.id]: e.target.value })
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
        this.props.Order(temp_)
    }

    isReadyToCollectUpdate = (index) => {
        let temp_ = this.state.allOrders;
        temp_[index]['IsReadyToCollect'] = true;
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
                    <div key={index}>
                        <span>{ele.BeverageBarUserFirstName}</span>
                        <br />
                        <span>{ele.OrderedBeverage.Name}</span>
                        {Math.ceil((new Date().getTime() - new Date(ele.OrderCreatedTimeStamp).getTime()) / 1000)}
                        <br />
                        <br />
                    </div>
                )
                if (seconds < 60) {
                    inQuene.push(ele_dom);
                }
                else if (seconds > 60 || ele.IsBeingMixed) {
                    if(!ele.IsBeingMixed){
                        this.isBeingMixedUpdate(index);
                    }
                    inMix.push(ele_dom);
                }
                
                else if (seconds > 120 || ele.IsReadyToCollect) {
                    if(!ele.IsReadyToCollect){
                        this.isReadyToCollectUpdate(index)
                    }
                    inCollected.push(ele_dom);
                }
                else{

                }
            })
        }


        return (
            <React.Fragment>
                <Container>
                    <Row>
                        <Link to='/' >Back</Link>
                    </Row>
                    <Row>
                        <Col xs={{ span: 12, order: 2 }} md={{ span: 3, order: 1 }}>
                            <div>
                                <strong>Menu</strong>
                                <div>
                                    {beverageMenu.Beverages.map((ele, index) => (
                                        <div onClick={this.toggleMenu} key={index}>{ele.Name} </div>
                                    )
                                    )}
                                </div>
                            </div>
                        </Col>
                        <Col xs={{ span: 12, order: 1 }} md={{ span: 9, order: 2 }}>
                            <Row>
                                <Col xs={{ span: 12, order: 3 }} md={{ span: 4, order: 1 }}>
                                    <strong>In Queue</strong>
                                    {inQuene}
                                </Col>
                                <Col xs={{ span: 12, order: 2 }} md={{ span: 4, order: 2 }}>
                                    <strong>Process</strong>
                                    {inMix}
                                </Col>
                                <Col xs={{ span: 12, order: 1 }} md={{ span: 4, order: 3 }}>
                                    <strong>Delivered</strong>
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