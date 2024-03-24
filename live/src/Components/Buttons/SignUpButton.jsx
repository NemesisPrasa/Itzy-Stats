import React from 'react';

const SignUpButton = ({ onClick }) => {
    return (
        <button onClick={onClick} className="signup-button">
            Sign Up
        </button>
    );
};

export default SignUpButton;
