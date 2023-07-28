# Twitter Clone Project

The Twitter Clone Project is a simple web application built using Flask, a popular Python web framework. The project's goal is to recreate some of the key features of Twitter. This includes enabling users to write tweets and browse through a timeline of tweets..

## Features

- **User Registration**: New users can sign up for an account by providing a unique username and password.

- **User Login**: Registered users can log in to their accounts using their username and password.

- **Tweeting**: Logged-in users can post tweets, which are short messages limited to a certain number of characters.

- **Timeline**: The application displays a timeline that shows a list of tweets from the users that the logged-in user follows, in reverse chronological order (newest tweets first).

## How to Run the Project

1. Clone the repository to your local machine.

2. Install the required dependencies by running the following command:
   ```
   pip install -r requirements.txt
   ```

3. Create two JSON files named `users.json` and `tweets.json`. These files will serve as the "database" to store user data and tweets.

4. Start the Flask application by running the following command:
   ```
   python app.py
   ```

5. Open your web browser and navigate to `http://localhost:5000` to access the application.

## Project Structure

- `app.py`: The main Python file that contains the Flask application and all the routes.

- `users.json`: A JSON file that stores user data, including their username and password (hashed for security).

- `tweets.json`: A JSON file that acts as a "database" to store tweet data, including the author, message, tweet ID, and timestamp.

## Technologies Used

- **Python**: The programming language used for the backend logic and Flask framework.

- **Flask**: A lightweight web framework used to create the web application.

- **JSON**: The data format used to store user data and tweets in JSON files.

- **passlib**: A Python library used for basic password hashing to enhance security.

## License

The Twitter Clone Project is licensed under the [MIT License](LICENSE). You are free to use, modify, and distribute the code according to the terms of the license.

## Acknowledgments

This project is made by Miro Laukka as a school project to demonstrate my skills and knowledge in web development and software engineering.

---
