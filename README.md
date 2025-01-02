# PistonPad

### Live Demo

Explore PistonPad live:  
🔗 [PistonPad Live Demo](https://piston-pad.vercel.app/)

---

## Table of Contents

- [PistonPad](#pistonpad)
    - [Live Demo](#live-demo)
  - [Table of Contents](#table-of-contents)
  - [Overview](#overview)
  - [Features](#features)
  - [Tech Stack](#tech-stack)
    - [Frontend:](#frontend)
    - [Backend:](#backend)
  - [Installation](#installation)
    - [Clone the Repository](#clone-the-repository)
    - [Install Dependencies](#install-dependencies)
    - [Configure Environment Variables](#configure-environment-variables)
    - [Run the Application](#run-the-application)
  - [Environment Variables](#environment-variables)
  - [Contact](#contact)

---

## Overview

**PistonPad** is an online code editor and code runner that enables users to write, edit, and execute code directly from their browser. Powered by the Piston API for code execution, PistonPad provides a seamless experience for coding in multiple languages.

---

## Features

- **Monaco Code Editor**: A powerful and intuitive editor with syntax highlighting, autocomplete, and IntelliSense.
- **Code Execution**: Run your code seamlessly using the Piston API with support for multiple programming languages.
- **Real-Time Collaboration**: (Planned) Work collaboratively with other developers in real time.
- **Downloadable Code**: Save your code as zip files using the JSZip library.
- **Lucide Icons**: Clean and modern icons for better UI aesthetics.

---

## Tech Stack

### Frontend:

- **React.js**: For building an interactive user interface.
- **Tailwind CSS**: For efficient and customizable styling.
- **Monaco Editor**: A powerful code editor for an IDE-like experience.
- **Lucide-React**: For lightweight and scalable icons.

### Backend:

- **Piston API**: Executes code written in multiple languages.
- **Appwrite**: Used for storing code files.

---

## Installation

### Clone the Repository

```bash
git clone https://github.com/PrathamPatel25/PistonPad.git
cd PistonPad
```

### Install Dependencies

```bash
npm install
```

### Configure Environment Variables

Create a `.env` file in the root directory and add the necessary environment variables. Refer to the [Environment Variables](#environment-variables) section for details.

### Run the Application

Start the development server:

```bash
npm run dev
```

Access the app at `http://localhost:5173`.

---

## Environment Variables

In the root directory, create a `.env` file and configure the following variables:

```plaintext
VITE_APPWRITE_URL=<your_appwrite_url>
VITE_APPWRITE_PROJECT_ID=<your_appwrite_project_id>
VITE_APPWRITE_DATABASE_ID=<your_appwrite_database_id>
VITE_APPWRITE_COLLECTION_ID=<your_appwrite_collection_id>
```

---

## Contact

For any queries or feedback, feel free to reach out:

- **LinkedIn**: [Profile](https://www.linkedin.com/in/pratham-patel-0920-/)
