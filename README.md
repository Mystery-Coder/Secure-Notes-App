# Secure-Notes-App

A Secure Notes App with 100% trustless security protocols for dealing with passwords and notes encryption using AES.

# Concept

Use AES encryption for storing user passwords and encrypting their notes.
Passwords are not exactly stored instead a random string and it's cipher text with the
password as key is used for user authentication. This ensures there is zero trust requirement.
(or generation of private-public keys from the password can be done to prevent loss in case of forgotten password)

# Tech

React JS with Material UI components
Express.js Server

# Secure Notes App – Development Checklist

## 🔐 SECURITY ARCHITECTURE

### 1. Define Encryption Model

-   [ ] Choose AES encryption (e.g., AES-256-CBC or GCM)
-   [ ] Use password-derived key via PBKDF2, scrypt, or bcrypt for AES key generation
-   [ ] Generate random salt per user
-   [ ] Use IV (initialization vector) for encryption randomness

### 2. Authentication Model

-   [ ] On signup:
    -   [ ] Generate random secret string `R`
    -   [ ] Encrypt `R` using password-derived AES key
    -   [ ] Store encrypted `R` (ciphertext) and salt in DB
-   [ ] On login:
    -   [ ] Derive AES key from entered password
    -   [ ] Attempt to decrypt stored ciphertext
    -   [ ] If decrypted string matches original `R`, login success

### 3. Note Encryption

-   [ ] Use same derived AES key to encrypt/decrypt user's notes
-   [ ] Store encrypted notes in DB
-   [ ] Never store raw notes or raw password

---

## 🧠 FRONTEND (React + Material UI)

### 4. Routing

-   [] Decide the Routes
-   [] Add React Router and Create the Route specific components

### 5. UI Components

-   [ ] Signup/Login form (username, password)
-   [ ] Notes dashboard (list + create + edit)
-   [ ] Modal/dialog for new/edit note
-   [ ] Feedback for login/signup errors

### 6. State & Logic

-   [ ] Use React Context or Redux for auth state
-   [ ] Encrypt/decrypt notes in the browser before sending/after receiving
-   [ ] Use `crypto.subtle` or a JS crypto lib (like CryptoJS)

---

## ⚙️ BACKEND (Express.js)

### 7. Endpoints

-   [ ] `POST /signup` — Save encrypted `R`, salt
-   [ ] `POST /login` — Validate decrypted `R`
-   [ ] `POST /notes` — Save encrypted note
-   [ ] `GET /notes` — Return encrypted notes
-   [ ] `PUT /notes/:id` — Update note
-   [ ] `DELETE /notes/:id` — Delete note
