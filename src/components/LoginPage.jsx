import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { decryptText, verifyUserPassword } from "../utils";

function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async () => {
        if (username.trim() && password.trim()) {
            localStorage.setItem("currentUser", username);

            let res = await fetch(
                "http://localhost:5500/user_auth/" + username
            );
            let userAuthObj = await res.json(); //This has a object of enc string and string or empty obj for non-existent user

            if (
                Object.keys(userAuthObj).length === 0 &&
                userAuthObj.constructor === Object
            ) {
                alert("User does not exist");
            } else {
                userAuthObj = userAuthObj["user_auth_data"];
                let string = userAuthObj["randomString"];
                let encString = userAuthObj["encString"];

                //Testing
                // let dec = await decryptText(encString, password);
                // console.log(
                //     "enc:" +
                //         encString +
                //         "  str:" +
                //         string +
                //         " pw:" +
                //         password +
                //         " dec: " +
                //         dec
                // );

                if (await verifyUserPassword(encString, string, password)) {
                    console.log("user verified");
                    let res = await fetch(
                        "http://localhost:5500/user_data/" + username
                    );
                    res = await res.json();
                    let encNotes = res["user_data"]; //This is an object with note IDs as keys, and each ID has a title and content

                    let IDs = Object.keys(encNotes);
                    let decNotes = {};

                    await Promise.all(
                        IDs.map(async (id) => {
                            let title = encNotes[id]["title"];
                            title = await decryptText(title, password);
                            let content = encNotes[id]["content"];
                            content = await decryptText(content, password);
                            decNotes[id] = {
                                title,
                                content,
                            };
                        })
                    );
                    console.log(decNotes);
                    console.log("Going to dashboard ");

                    navigate("/dashboard", {
                        state: {
                            notes: decNotes,
                        },
                    });
                } else {
                    alert("wrong pw");
                }
            }
        } else {
            alert("Please enter both username and password.");
        }
    };

    const pageStyle = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        minHeight: "100vh",
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#0a2b4c", // Dark blue background
        color: "#ffffff", // White text to contrast the dark blue background
        padding: "20px",
    };

    const descriptionStyle = {
        textAlign: "center",
        maxWidth: "800px",
        padding: "20px",
        marginBottom: "30px",
    };

    const headingStyle = {
        fontSize: "2.5em",
        color: "#fff", // White for better visibility
        fontWeight: "700",
        marginBottom: "20px",
        textTransform: "uppercase",
        letterSpacing: "1px",
    };

    const textStyle = {
        fontSize: "1.1em",
        lineHeight: "1.8",
        color: "#e0e0e0", // Light gray for readability
        marginBottom: "15px",
        fontWeight: "400",
    };

    const loginBoxStyle = {
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        padding: "40px",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        width: "100%",
        maxWidth: "400px",
        textAlign: "center",
    };

    const loginTitleStyle = {
        fontSize: "2.2em",
        fontWeight: "700",
        color: "#3b3b3b",
        marginBottom: "30px",
    };

    const inputStyle = {
        width: "100%",
        padding: "12px",
        margin: "12px 0",
        border: "1px solid #ccc",
        borderRadius: "5px",
        fontSize: "1em",
        boxSizing: "border-box",
        outline: "none",
    };

    const inputFocusStyle = {
        borderColor: "#4a90e2",
        boxShadow: "0 0 5px rgba(74, 144, 226, 0.5)",
    };

    const buttonStyle = {
        width: "100%",
        padding: "14px",
        backgroundColor: "#4a90e2",
        color: "#fff",
        border: "none",
        borderRadius: "5px",
        fontSize: "1.1em",
        cursor: "pointer",
        transition: "all 0.3s",
    };

    const buttonHoverStyle = {
        backgroundColor: "#3578e5",
    };

    const buttonActiveStyle = {
        backgroundColor: "#1f65d8",
    };

    return (
        <div style={pageStyle}>
            <div style={descriptionStyle}>
                <h1 style={headingStyle}>
                    Welcome to SecureNotes - Your Trusted Digital Vault
                </h1>
                <p style={textStyle}>
                    At SecureNotes, we understand the importance of safeguarding
                    your personal information. Our platform is designed to
                    provide a safe, secure, and organized space to store your
                    most critical data. Whether it's passwords, important notes,
                    or any other sensitive information, SecureNotes ensures that
                    your data remains under your control, available only to you.
                </p>
                <p style={textStyle}>
                    With SecureNotes, you can categorize and securely store your
                    notes across different fields - be it for work, personal
                    use, or sensitive financial details. Our intuitive platform
                    allows you to easily manage and access your notes whenever
                    you need them, helping you stay organized and in control of
                    your information.
                </p>
                <p style={textStyle}>
                    In addition to storage, SecureNotes offers enhanced security
                    by enabling you to share your notes with trusted
                    individuals. We use a Diffie-Hellman-based approach for
                    secure note sharing, ensuring that only the intended
                    recipients can access your data. This adds an extra layer of
                    protection when you need to collaborate or share vital
                    information.
                </p>
                <p style={textStyle}>
                    Security is our top priority. That's why we use AES-based
                    encryption to safeguard your passwords and sensitive data.
                    With this robust encryption technology, we ensure that no
                    one - except you - can access your private notes.
                </p>
                <p style={textStyle}>
                    With SecureNotes, you can trust that your most important
                    information is protected with the highest standards of
                    security, giving you peace of mind.
                </p>
            </div>

            <div style={loginBoxStyle}>
                <h2 style={loginTitleStyle}>Sign In</h2>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    style={inputStyle}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={inputStyle}
                />
                <button
                    onClick={handleLogin}
                    style={{
                        ...buttonStyle,
                        ":hover": buttonHoverStyle,
                        ":active": buttonActiveStyle,
                    }}
                >
                    Login
                </button>
            </div>
        </div>
    );
}

export default LoginPage;
