import React, { useState } from 'react';
import Navigation from './landingPage/navigation/Navigation';
import {Row, Col, Form, Button} from 'react-bootstrap';
import {Redirect} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';


// signin Email id and password and a button
//we capture userid and passwrd a user enters
//We retrive the json list of registration data
// user input we compare against registered list of data
// if


const SignIn = props => {
    const [ data, setData ] = useState({
        email: "",
        password: "",
        home: false,
        register: false,
    })

    const {email, password } = data;

    const onChangeHandler = e => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        });
    }

    // const auth = async (json) => {
    //     let arr = await json.data
    //     arr.map((each) => {
    //         if (email === each.Email && password === each.Password) {
    //             console.log('it worked')
    //             setData({
    //                 home: true
    //             });
    //         } else {
    //             console.log('it did not work')
    //             setData({
    //                 register: true
    //             });
    //         }
    //     })
    // }

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(
                "https://v1.nocodeapi.com/essteem/google_sheets/IgoNtzYsdlMmRjbd?tabId=registration",
            {
                method: "get",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const json = await response.json();
            const auth = json.data.some((each) => {
                return (email === each.Email && password === each.Password)})
            auth ? (setData({ home: true, register: false})) : (setData({register: true}))
            e.target.reset();
        } catch (error) {
            console.error("Error:", error);
        }

    }
    console.log('data', data)

    return (
        <>
            <Navigation />
            <Form className="registrationForm" onSubmit={onSubmitHandler}>
                <h5 className="cyan form-header text-white p-3 mb-3">Sign up</h5>
                <Form.Group className="form-group">
                    <Form.Control required type="email" placeholder="E-mail" name="email" onChange={onChangeHandler} />
                </Form.Group>
                <Form.Group className="form-group">
                    <Form.Control required type="password" minLength="6" maxLength="8" size="8" placeholder="Password" name="password" onChange={onChangeHandler} />
                </Form.Group>
                <Row>
                    <Col >
                        <Button href="" variant="warning" className="yellow text-dark signup-button" type="submit">SIGN IN</Button>
                    </Col>
                    {data.register ? (<Redirect to='/' />) : (<div />)}
                    {data.home ? (<Redirect to='/home' />) : (<div />)}
                </Row>
            </Form>
        </>
    )
}

export default SignIn;
