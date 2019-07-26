import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Main extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return (
            <div>
                <Link to="/admin"  >Admin</Link>
                <Link to={{ pathname: '/customer' }} >Customer</Link>
            </div>
        )
    }


}