import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import {
  createUserWithEmailAndPassword,
  getAuth,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import app from "../firebase/firebase.init";
import { Link } from "react-router-dom";

const auth = getAuth(app);

const RegisterReactBootstrap = () => {
  const [passwordError, setPasswordError] = useState("");
  const [userCreated, setUserCreated] = useState(false);

  const handleRegister = (event) => {
    event.preventDefault();
    setUserCreated(false);
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    console.log(email, password);
    // Checking if there are any uppercase letters or not.
    if (!/(?=.*[A-Z].*[A-Z])/.test(password)) {
      setPasswordError("You must use at least two uppercase characters!");
      return;
    }
    // Checking password length
    if (password.length < 8) {
      setPasswordError("Your password must be atleast 8 characters!");
      return;
    }
    // Checking special characters
    if (!/(?=.*[!@#$&*])/.test(password)) {
      setPasswordError("You must use at least one special character!");
      return;
    }
    setPasswordError("");

    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        setUserCreated(true);
        form.reset();
        verifyEmail();
        updateUserName(name);
      })
      .catch((error) => {
        console.error(error);
        setPasswordError(error.message);
      });
  };

  const verifyEmail = () => {
    sendEmailVerification(auth.currentUser).then(() => {
      alert("Check you email for the verification link!");
    });
  };

  const updateUserName = (name) => {
    updateProfile(auth.currentUser, {
      displayName: name,
    })
      .then(() => {
        console.log("Display");
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="w-75 mx-auto mt-5">
      <h3 className="text-center text-primary">Create your account</h3>
      <Form onSubmit={handleRegister}>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Full Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter fullname"
            name="name"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            name="email"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            required
          />
        </Form.Group>
        <p className="text-danger">{passwordError}</p>
        {userCreated && (
          <p className="text-success">User Account Created successfully!</p>
        )}
        <Button variant="primary" type="submit">
          Register
        </Button>
      </Form>
      <p>
        <small>
          Already have an account? <Link to="/login">Login</Link>
        </small>
      </p>
    </div>
  );
};

export default RegisterReactBootstrap;
