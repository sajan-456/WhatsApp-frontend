import React, { useState } from "react";
import './Registration.css'
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaPhone, FaLock } from "react-icons/fa";
const API =import.meta.env.VITE_BACKEND_URL;
function Registration() {
    let navigate = useNavigate();
    const [formData, setFormData] = useState({
        fname: '',
        lname: '',
        email: '',
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

        try {
            await fetch(`${API}/add-user`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            setFormData({
                fname: '',
                lname: '',
                email: '',
                mobileNumber: '',
                password: '',
            });

            navigate('/login');
        } catch (err) {
            console.error("server error:", err.message);
        }
    }

    return (
        <>
            <div className="secure-info">
                <div className="lock-icon">🔒</div>
                <p>Messages are <strong>end-to-end encrypted</strong></p>
                <p>We do not store your chat history.</p>
            </div>


            <div className="section">
                <div className="main">
                    <div className="title">
                        <h2>Welcome</h2>
                        <p>Simple, reliable, private messaging and group chats for free*, available all over the world.</p>
                    </div>

                    <form className="registrationForm" onSubmit={handelSubmit}>
                        <div className="input-group">
                            <FaUser className="icon" />
                            <input
                                type="text"
                                name="fname"
                                placeholder="First Name"
                                value={formData.fname}
                                onChange={handelChange}
                            />
                        </div>

                        <div className="input-group">
                            <FaUser className="icon" />
                            <input
                                type="text"
                                name="lname"
                                placeholder="Last Name"
                                value={formData.lname}
                                onChange={handelChange}
                            />
                        </div>

                        <div className="input-group">
                            <FaEnvelope className="icon" />
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={handelChange}
                            />
                        </div>

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

                        <button type="submit">Create Account</button>
                        <p>
                            I already have an account{" "}
                            <Link to={'/login'}>Login</Link>
                        </p>
                    </form>

                    <p id="term">Terms & Conditions</p>
                </div>
            </div>
        </>
    );
}

export default Registration;
