# App Title - Precious moments

## Application links
-- (link to repo)
- link to backend repo --> you're here
- link to frontend repo --> https://github.com/teppy90/precious-moments-frontend

-- (link to deployment)
- frontend deployed link ==> https://preciousmoment.herokuapp.com/

## Table of Contents
- [Introduction](#Introduction)
- [Project Approach](#project-approach)
- [Technology Used](#Technology-used)
- [Methodology Used](#Methodology)
- [Main Features](#Main-features)
- [User Journey Map](#User-Journey-Map)
- [Bonus](#Bonus)
- [Developer Journey](#Developer-Journey)
- [Future Development](#Future-Development)

# Project 4 collaborators - Danny, Jared, Shi Jie

## Introduction


## Project Approach


## Main Features
1. Registration and login
   - Includes authentication and encrypted password
2. <span id='2-create-new-post'>Create new post</span>
   - Required fields: Image link
   - Non-required fields: Caption
   - (Bonus): Hashtag function in caption similar to Instagram
3. Create new comment
   - User is able to add new comment in a particular post
4. <span id='4-edit-post'>Edit post</span>
   - Able to edit caption of a particular post user created
   - User will not be able to edit caption of other user's post
5. Edit comment
   - Able to edit comments made by user
   - User will not be able to edit comment made by other user
6. <span id='6-delete-post'>Delete post</span>
   - Able to delete a particular post that user created 
   - User will not be able to delete posts made by other users
7. Delete comment
   - Able to delete a particular comment that user commented
   - User will not be able to delete comments made by other users
8. Dashboard to show all the memes, gifs and puns created by all the users
   - This will show all the latest feed
   - User will be able to 'like' and 'comment' individual post
9. User dashboard to show all the latest feed posted by a particular user
   - User will be able to 'like' and 'comment' individual post
   - User will be able to [Create new post](#2-create-new-post), [Edit post](#4-edit-post) and [Delete post](#6-delete-post)
10. React routing for multi-page views
11. (Bonus): Able to search post
      - Search by keywords in post's caption
      - Search by hashtag
      - Search by theme
12. (Bonus): Able to search other users
      - After searching, user is able to follow the other user
13. (Bonus): Additional page to include third party API to get memes, gifs and puns

## User Journey Map

### 1. Landing Page
As a user, I want to know what this application is about when I first land onto this website.

### 2. Registration Page
As a user, I want to be able to register a new account.

### 3. Login Page
As a user, I want to be able to login to the application.

<img src ="wireframes\log-in wireframe .png" width= "80%">

### 4. Dashboard
As a user, I want to be able to see all the memes, gifs and puns in this application.
- Memes, gifs and puns that were created by users will be pushed to the Dashboard, as well as their [User Dashboard](#6-user-dashboard).

### 5. Create Memes/Gifs/Puns Page
As a user, I want to be able to create new memes, gifs and puns in this application.

### <span id='6-user-dashboard'>6. User Dashboard</span>
As a user, I want to be able to view all the memes, gifs and puns I have created in my own user dashboard.

### 7. Edit Memes/Gifs/Puns
As a user, I want to be able to edit the memes, gifs and puns that I have created.
- User is able to edit caption and comments made by them.

### 8. Delete Memes/Gifs/Puns
As a user, I want to be able to delete the memes, gifs and puns that I have created.

<img src ="wireframes\landing-page wireframe.png" width= "80%">


## Technology Used

1) MongoDb / Mongoose
2) React.js
3) Authentication services ( session / passport.js)
4) Express.js
5) Node.js
6) Multer (uploading img)
7) Heroku deployment ( for backend )
8) github pages ( for frontend )
9) Apis Used (IF NECESSARY AND FOR BONUS)
 - memes api (https://api.imgflip.com/)
 - gif api (https://tenor.com/gifapi/documentation#quickstart-search)
 - puns/jokes api (https://rapidapi.com/webknox/api/jokes?endpoint=55c2a0a7e4b011e6e59410ca)
10) AJAX
11) JQUERY
12) MDBREACT CSS
13) BOOTSTRAP 
14) External source
    - (if any, to be added)

## Methodology

### On CRUD
Creating content with different specifications. 
- Gif - Need to upload a image in .gif format in gif section
- puns - descriptive / strings
- memes - in https:// url string. 

Fetching data
- AJAX call to fetch in REACT component. 




## Bonus
(if have time)
Added features
- A quick button to generate random pickup lines / memes / puns / gif
- Update / Edit User profile
- User can follow and being followed by other users
- Send notification to user email whenever user is being followed and new content is created by their favourite users
- Search function to search content based on themes. (Using Ajax call query)
- Music tracks added for individual users


