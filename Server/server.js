import express from "express";
import { readFileSync, writeFileSync } from "fs";
import cors from "cors";

/*
NotesDB.json holds user auth and user notes data

All encryption parts of user Login and Registeration are done on the Client-Side
Only the check of username existence, getting the auth and notes data is on Server-Side 


Note: The user1 has password as 'password1234', testing data


{
    "user_auth": {
        "user1": {
            "randomString": "7d89837d7c4ef5ddaf2974dd0100f97f",
            "encString": "b83a76d789b475216d34040752a7f73bd3d2a3a0c21da07266eef9093e27ee0803ff24d8190282c0d8f848a44b525d3b"
        }
    },
    "user_data": {
        "UUID" : {
        	"title" : "Encrypted Title",
        	"content" : "Encrypted Content"
        }
    } 
}

For every new user note, Generate a UUID (probably Client-Side), title it, take content input and send back the encrypted
contents.
Send all user data on successful login


*/

const app = express();
const PORT = 5500;
const DB_FILENAME = "NotesDB.json";
app.use(express.json());
app.use(cors());

app.get("/", function (req, res) {
    res.send({ status: "WORKING" });
});

app.get("/user_exists/:username", (req, res) => {
    //Route to call to check username existence
    const DB = JSON.parse(readFileSync(DB_FILENAME));
    const usernames = DB["user_auth"];

    // console.log(usernames);

    let username = req.params.username;

    // console.log(username);

    let exists = usernames[username] != undefined;

    res.send({
        exists,
    });
});

app.get("/user_auth/:username", (req, res) => {
    //Route to call to get randomString and password encrypted String

    const DB = JSON.parse(readFileSync(DB_FILENAME));
    const usernames = DB["user_auth"];

    // console.log(usernames);

    let username = req.params.username;

    // console.log(username);

    let user_auth_data = usernames[username];

    res.send({
        user_auth_data,
    });
});

app.get("/user_data/:username", (req, res) => {
    //Route to call to get all encrypted notes of that user

    const DB = JSON.parse(readFileSync(DB_FILENAME));
    const all_user_data = DB["user_data"];

    // console.log(usernames);

    let username = req.params.username;

    // console.log(username);

    let user_data = all_user_data[username];

    res.send({
        user_data,
    });
});

//POST Routes

app.post("/user_auth", (req, res) => {
    // Route to post the new user onto the DB

    const { username, randomString, encString } = req.body;

    const DB = JSON.parse(readFileSync(DB_FILENAME, "utf-8"));

    DB["user_auth"][username] = {
        randomString,
        encString,
    };
    writeFileSync(DB_FILENAME, JSON.stringify(DB, null, 4));
    res.status(200);
});

app.post("/user_notes_post", (req, res) => {
    // Route to post the note of a user
    /* 
	Data posted shld be like,
	{
		"uuid" : "------------------"
		"title" : "-----------------"
		"content" : "---------------"
	}
	
	
	*/

    const { username, uuid, title, content } = req.body;

    const DB = JSON.parse(readFileSync(DB_FILENAME, "utf-8"));
    const all_user_data = DB["user_data"];

    all_user_data[username][uuid] = {
        title,
        content,
    };

    writeFileSync(DB_FILENAME, JSON.stringify(DB, null, 4));

    res.status(200).send("Note saved successfully");
});

app.listen(process.env.PORT || PORT, () => {
    console.log(`Listening on port ${PORT}, `);
});
