import { useState } from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import "./App.css";

const buttonStyle = {
    width: "300px",
    textTransform: "none",
    borderWidth: "3px", // Make the border thicker
    borderColor: "primary.main", // Optional: force color
    borderStyle: "solid", // Ensures it doesn't default to something weird
};
function App() {
    return (
        <>
            <div id="main">
                <Typography variant="h2" color="initial">
                    Secure Notes
                </Typography>

                <Button
                    variant="outlined"
                    color="primary"
                    sx={{ textTransform: "none", fontSize: 24 }}
                >
                    Register
                </Button>
                <Button
                    variant="outlined"
                    color="primary"
                    sx={{ textTransform: "none", fontSize: 24 }}
                >
                    Login
                </Button>
            </div>
        </>
    );
}

export default App;
