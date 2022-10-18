import {
  getAuth,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import app from "../../firebase/firebase.init";

const auth = getAuth(app);

const LoginBootstrap = () => {
  const [userEmail, setUserEmail] = useState("");

  const handleLogin = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const user = result.user;
        console.log(user);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const storeEmail = (event) => {
    const email = event.target.value;
    setUserEmail(email);
    console.log(email);
  };

  const handleForgertPassword = () => {
    if (!userEmail) {
      alert("Please Enter Your Email Address");
      return;
    }
    sendPasswordResetEmail(auth, userEmail)
      .then(() => {
        alert("Password Reset Email Sent! Please check your email!");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <div className="w-75 mx-auto mt-5">
        <h3 className="text-primary text-center">Login to you account!</h3>
        <Form onSubmit={handleLogin}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              onBlur={storeEmail}
              type="email"
              placeholder="Enter email"
              name="email"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              onBlur={storeEmail}
              type="password"
              placeholder="Password"
              name="password"
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Register
          </Button>
        </Form>
        <p>
          <small>
            Don't have an account? <Link to="/register">Register Now</Link>
          </small>
        </p>
        <p>
          <small>
            Forgot Password?{" "}
            <Link onClick={handleForgertPassword}>Reset Password</Link>
          </small>
        </p>
      </div>
    </div>
  );
};

export default LoginBootstrap;
