# ClickNanny App
React native app where families can search, contact, and keep a diary of all nannies visits. Babysitters can also register, set up a profile and declare her schedule for the next days.   

## Development details
Server side was built with node and express, and the database is in postgresql. Knex was used to the queries. The server is running on heroku (It is not the same project from this repository. Front end was built expo react native, context API was used to state management when nedded.

## Installation
Download this repository, in mobile directory run `yarn install` to install all dependecies. And then run `yarn start`. You have to have installed expo cli locally.
The app is already communicating with the server in heroku.
To run the server locally, go to the server directory and run `npm install`. To create the database run the command `knex migrate:latest`. You have to have installed knex and postgres locally. Finally run `npm start`.

## Screens :heart_eyes: :heart_eyes:
Soon...

## Functionalities and screens

- Choice of profile - choose if you will enter like a family or a babysitter. Which one has its specifications.
- Sign in - create a user, **authentication** is through **jwt**.
- Log in - Log in to the app with existent user.
- Babysitter - Creation and visualization of profile and possibility to update it. Upload of image from her phone. Add future schedules.
- Family - Main page with **lottie animation**.
- Family - A **map** to look for babysitters close to user location. The app shows all babysitters in 5 kilometers radius from user location. It also inform the distance between the user and the babysitter. **Postgis** extension for postgres is used to achieve this functionality. When a babysitter is clicked the app navigate to her profile.
- Family - Favorites screen, where the user can see all his favorites babysitters. It is possible to delete a babysitter from the list. When a babysitter is clicked the app navigate to her profile.
- Family - **Search with filters** screen. The user can search for babysitters through filters such as name, city, price range or availability. Every filter is **optional**. When a babysitter is clicked the app navigate to her profile.
- Family - Jobs diary screen. Easily the user can see all his future scheduled jobs and his past jobs. To all the past jobs the user can leave a review once, with rating and comments about the job. The review is open to all the users.  When a babysitter is clicked the app navigate to her profile. **Layout animation** was used to enhance the user experience.
- Family - Babysitter profile screen. If the user click on a babysitter, he get on her profile. It has her description, spoken languages, price per hour, a photo and her availability for the next week. It is possible to make contact via whatsapp, call, or email. It is possible to schedule a job.
- Family - Review screen. If the user clicks on the star rating on a babysitter the app navigate to the review screen. It has a list of all reviews made by users to this babysitter.
- When something is updated in a screen, all the relevant screens are updated too. It is possible to see this through the like feature. The user can add babysitter to his favorites and it immediately update all the relevant screens.

## Whant to help? :sunglasses:
I always looking for interesting projects to roll into and learn and develop myself. Fell free to make contact!
