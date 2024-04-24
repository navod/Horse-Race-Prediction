# Turbo Hose Race Insigts (Machine Learning)

This project provides insights into Turbo Hose racing data using machine learning techniques. It's comprised of a backend API built with Flask and Python, and a React frontend for user interaction.

## Project Structure

The project is organized into two main directories:

- `backend`: Contains the Flask API and Python code
- `frontend`: Houses the React frontend application

## Prerequisites

To run this project, you'll need the following:

- Python 3.x (https://www.python.org/downloads/)
- Git (https://git-scm.com/downloads)
- Node.js and npm (https://nodejs.org/en)
- React (https://react.dev/)

## Setting Up the Backend

1. **Clone the repository:**

   ```bash
   git clone <link>
   ```

2. **Next, create a virtual environment using Python's built-in venv module:**
   ```bash
    py -3 -m venv .venv
   ```
3. **Activate the virtual environment:**

   ````bash
   #for windows
    .venv\Scripts\activate
       ```bash

   #for ubuntu
    source .venv/bin/activate
   ````

4. **Install the required Python packages using pip:**

   ```bash
   pip install -r requirements.txt
   ```

5. **Install the required Python packages using pip:**

   ```bash
   # For Windows
    set FLASK_APP=app.py

   # For Ubuntu
    export FLASK_APP=app.py
   ```

6. **Now, you can start the Flask server:**

   ```bash
   flask run
   ```

## Setting Up the Frontend

1. **To set up the frontend, navigate to the frontend directory:**

   ```bash
   cd frontend
   ```

2. **Install the required npm packages:**

   ```bash
    npm install
   ```

## Technology Stack

### Frontend

The frontend is built using the following technologies:

- **React**: A popular JavaScript library for building user interfaces.
- **Tailwind CSS**: A utility-first CSS framework for rapidly building custom designs.
- **Redux**: A predictable state container for JavaScript apps.
- **FlowBite**: (Please provide a brief description of FlowBite)

### Backend

The backend utilizes the following technologies:

- **Flask**: A lightweight WSGI web application framework in Python.
- **Python**: A high-level programming language known for its simplicity and readability.
- **MySQL**: An open-source relational database management system.

## Testing

Unit testing is performed using **pytest**, a popular testing framework for Python applications. Pytest provides simple and scalable testing solutions, making it ideal for ensuring the reliability of our backend code.

Additionally, test automation is implemented using **Cypress**, a modern testing tool built for the web. Cypress enables end-to-end testing of web applications, allowing us to simulate user interactions and ensure the smooth functioning of our frontend components.

## Servers

The application is hosted on the following servers:

- **Backend**: Google Cloud Platform / Render
- **Frontend**: Netlify
- **MySQL**: [FreeSQLDatabase](https://www.freesqldatabase.com)
