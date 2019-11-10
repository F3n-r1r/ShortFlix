# ShortFlix


## Getting Started
If you wish to run the project on your local machine, follow the steps below.
```
1. Clone or download the repository.
2. In the command line navigate to the *server* directory and run *npm install*
3. In the command line navigate to the *client* directory and run *npm install*
4. In the root of the *server* directory add a .env file.
3. In the .env file you need to add four variables (Note: the capitalization is important):
    3.1. *PORT* (Set it to -> 8000)
    3.2. *SALT_ROUNDS* (Set it to -> 12)
    3.3. *JWT_KEY* (Set it a long random string e.g 'MIIBOQIBAAJAY13o3CALt6gvv4usoip+Q/aL8cEepJ/b9wNASmW4zWTXBxFlXjlt')
    3.4. *DATABASE_CONNECTION* (Your mongodb connection string)
4. Open a new command line and navigate to the *server* folder and run *npm run serve*
5. Open a new command line and navigate to the *client* folder and run *npm run serve*
6. Open your localhost at the port specified in the command line (usually: http://localhost:8080/)
7. The app is now running on your local machine
```

