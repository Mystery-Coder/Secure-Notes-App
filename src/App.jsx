import { useState } from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import "./App.css";

const buttonStyle = {
    width: "250px",
    textTransform: "none",
    borderWidth: "3px", // Make the border thicker
    // borderColor: "primary.main", // Optional: force color
    borderStyle: "solid", // Ensures it doesn't default to something weird,
    borderRadius: "20px",
    fontSize: 28,
};
function App() {
    return (
        <>
            <video autoPlay loop muted playsInline className="bg-video">
                <source src="../public/matrix-bg-1.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>

            <div id="main">
                <Typography
                    variant="h2"
                    color="initial"
                    sx={{
                        color: "white",
                        background: "black",
                        borderRadius: "20px",
                    }}
                >
                    Secure Notes
                </Typography>

                <Button variant="contained" color="primary" sx={buttonStyle}>
                    Register
                </Button>
                <Button variant="contained" color="success" sx={buttonStyle}>
                    Login
                </Button>
            </div>
        </>
    );
}

export default App;
