# Project01

                                        Find The Number
                                Fun game to test your memory

    The is the solo project one of EvolveU FSD cohort6 program as part of the learning process.

In this phase, project has 2 elements

    1- Back End Game

Copy the url of this repo.
Run git clone with the copied address in your CLI in your desired folder.

        git clone //(copied url)//

cd into the directory of the "Back end Game" and run
npm i

    //Dependencies you need to install by the above command before running the app.
        - express
        -mongoose
    *** Dev dependencies
        -dotenv
        -nodemon

Create a .env file and pass DATABASE_URL value to connect Mongoose and MongoDB.

        nodemon app.js

To have a better experience playing the game, install Postman to send and recieve data.

Go to http://localhost:3000 and follow the instructions.
To sign up POST your name and password in a JSON body.
To play the game POST your name, password, digits you want to guess to sign in and start playing.
You can not play until you sign in.

Have fun!

    2- User login and register

For the version 2.0 of the game, the GUI is not done but the initial code is here for your preference.
To run this app you need to run

            npm i

after cd into the related cloned folder.
for better experience you can install the following modules separately.

    //Dependencies you need to install by the above command before running the app.
            - bcrypt
            - ejs
            - express
            - express-flash
            - express-session
            - mongoose
            - passport
            - passport-local
    *** Dev dependencies
            -dotenv
             -nodemon

Create a .env file and pass SESSION_SECRET value to use it as part of express session required fields and DATABASE_URL value to connect Mongoose and MongoDB. then

            nodemon server.js

and enter main page on your browser.

You can register and sign in at the moment to enter the game but this is as far as I coded up to now.
Your password will be encrypted and will pass as hashed to the MongoDB database.
