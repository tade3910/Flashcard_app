# flashcards
Flashcards App

## Local enviroment set up

### Prereqs
* Yarn
* Docker

## Set up and seed Database and set up server 
### Open the terminal and run the following comands
* cd server
* yarn
* Start up docker daemon(Docker widget should say it's running) if not already started
* docker compose up
* Open a seperate terminal, navigate back to server dir
* yarn prisma migrate dev --name init
* yarn start

## Set up client
### Open the terminal and run the following comands
* cd Client
* yarn 
* yarn start


## Documentation

### Tech stack 

#### Frontend:

* Language: Javascript
* Frameworks: React
* Styling : Mantine


#### Backend:

* Language: Javascript
* Runtime Enviorment: Node 
* Frameworks: Express Js
* ORM: Prisma

#### Database: 

* Postgres

### Containers:

* Docker

## Difficulties

* I had a lot of trouble initially with using "react-query" to make my axios calls to the backend, I didn't really understand query keys and invalidating queries as I thought
* I had a lot of trouble at first with setting up my database as it was my first time doing so all by myself, but after reading some docker information I was able to make a docker.yml and create a database
* I also had some front end problems, I had never made a webpage with routes and also had trouble saving user information, but after extensive google searching and with the help of mantine form I was able to do so.

## Unimplemented features

* I implemented all the must-have's, the necessary should-have's and a nice-to-have (User may change colors of cards and text).
* I didn't include unit-tests and my methods are not robust and my backend is not equipped for error handling, however I designed my front end in such a way to not allow the user to send any bad data to my backend
* However there are some bugs in my code that I realized too late and did not have time to fix, namely :
  * Edit and add buttons sometimes take more than one click before they behave in the expected fashion, this doesn't happen all the time 
making it even more difficult to debug
  * If you change the details of a deck, but add a new card to the deck, the data of the deck will be reset, with more time I'll probably
have been able to fix them, but I discovered this bug minutes before submission on a final test
  * React is also showing some errors and warnings in the dev tools on Chrome, however I don't understand what's wrong, nor how to fix them

## Ideal updates to the code
- I would have created this as a typescript project
- I would have scaffolded my frontend client with Vite instead of create react app
- I would include unit tests in the backend with jest and on the front end with cirrus or maybe even react test scripts
- I would have built the client files and served them on an express server which would implement authentication and authorization logic


## How code works

* My application is a client-served based application. I split the app largely into seperate server and client files
  
* I am running a Postgress database image in Docker. I connected, created tables and query this database with a prisma ORM, my schema and migrations can be found in the prisma file in the server.

* I made my endpoint routes with express. I have two routes : 
  * Card: Contains routes to create a new card, delete an existing card and to edit an existing card.
  * Deck: Contains routes to create a new deck and its associated card, delete a deck and its associated card, get all decks in the database, get a specific deck in the databse and to edit an existing deck.


* I have four main routes(pages) in my frontend:
  * Home: A page that displays all of a users decks and allows them to access all other routes
  * AddDeck : A page that allows a user to add a deck with it's associated cards and properties
  * EditDeck : A page that allows a user to edit and delete a deck's associated cards and properties 
  * PracticeDeck: A page that allows a user to practice with the cards in a selected deck and edit and delete cards in the deck
  
* CSS styles and getting form inputs as well as validating inputs are provided my Mantine

* I created hooks with the react-query library to make my api calls from the front-end(client) side :
  * useMutationCard: Edits a selected card
  * useMutationCreateCard: Creates a new card
  * useMutationCreateDeck : Creates a new deck
  * useMutationDeck : Edits a decks metadeta
  * useMutationDeleteCard: Deletes a card
  * useMutationDeleteDeck: Deletes a deck
  * useQueryDeck: Gets specific deck
  * useQueryDecks: Gets all decks
