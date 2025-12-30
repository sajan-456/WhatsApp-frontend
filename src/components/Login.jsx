import React, { useState } from "react";
import './Registration.css';
import { Link, useNavigate } from "react-router-dom";
import { FaPhone, FaLock } from "react-icons/fa";
const API = import.meta.env.VITE_BACKEND_URL;
function Login() {
    let navigate = useNavigate();

    const [formData, setFormData] = useState({
        mobileNumber: '',
        password: '',
    });

    function handelChange(e) {
        let { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    }

    async function handelSubmit(e) {
        e.preventDefault();
        console.log(formData);
        typeof formData
        if (!formData.mobileNumber || !formData.password) {
            alert('please enter mobile number and password')
            return;
        }

        try {
            let res = await fetch(`https://whatsapp-backend-y5rr.onrender.com/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const data = await res.json();
            if (!res.ok) {
                // backend ka message use karo
                alert(data.message || "Login failed");

                if (res.status === 401) {
                    setFormData({ mobileNumber: formData.mobileNumber, password: '' });
                } else {
                    setFormData({ mobileNumber: '', password: '' })
                }

                return;
            }

            const { jwtToken, user } = data;

            if (jwtToken) {
                sessionStorage.setItem('token', JSON.stringify(jwtToken));
            }

            if (user) {
                sessionStorage.setItem('user', JSON.stringify(user));
            }

            navigate('/dashbord');

            setFormData({ mobileNumber: '', password: '' });
        } catch (err) {
            console.log(err.message);
        }
    }

    return (
        <>
            {/* Secure messaging info */}
            <div className="secure-info">
                <div className="lock-icon">🔒</div>
                <p>Messages are <strong>end-to-end encrypted</strong></p>
                <p>We do not store your chat history.</p>
            </div>

            <div className="section">
                <div className="main">
                    <div className="title">
                        <h2>Welcome Back</h2>
                        <p>Login to access your private chats and group conversations.</p>
                    </div>

                    <form className="registrationForm" onSubmit={handelSubmit}>
                        <div className="input-group">
                            <FaPhone className="icon" />
                            <input
                                type="number"
                                name="mobileNumber"
                                placeholder="Mobile Number"
                                value={formData.mobileNumber}
                                onChange={handelChange}
                            />
                        </div>

                        <div className="input-group">
                            <FaLock className="icon" />
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handelChange}
                            />
                        </div>

                        <button type="submit">Login</button>
                        <p>
                            Create a new account{" "}
                            <Link to={'/registration'}>Create account</Link>
                        </p>
                    </form>

                    <p id="term">Terms & Conditions</p>
                </div>
            </div>
        </>
    );
}

export default Login;
