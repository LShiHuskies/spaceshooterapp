# SpaceShip-Shooter App

<img width="500" alt="screen shot 2018-11-07 at 5 27 11 pm" src="https://user-images.githubusercontent.com/34640293/48165168-be538200-e2b2-11e8-9ab1-699d71ac9a0b.png">

A single player SpaceShip Traveler that shoots down planets for active gamer enthusiasts inspired by Asteroids.

The objective of this game is stay alive as long as you can and get the highest score you can get. Each time you shoot a large planet, you score 200 points and the planet shrinks in size and if you shoot it again, it will disappear and you score an additional 100 points.

As the game goes on and your score increases, the difficulty goes up as the planet gets faster and faster.
The controls of the game are ASWD as A is to go left, S is to go down, D is to go right and W is to go up. The arrow keys determine the direction you are looking at which determines which direction you are going to fire which is the enter key.

A user can create a new account and log in. If a user does not create an account and sign in, he or she can elect to simply click submit and the game will simply start, however his or her high scores will not be registered.

<img width="500" alt="screen shot 2018-11-07 at 5 32 06 pm" src="https://user-images.githubusercontent.com/34640293/48165313-2efa9e80-e2b3-11e8-9298-8e8b07e9433f.png">


# Direction on how to run and start the program

1. Fork and clone this repository to your local environment.
2. Navigate to the GitHub for the [SpaceShip Shooter Api](https://github.com/LShiHuskies/space-shooter-api).
3. Fork and clone the back-end api repository.
4. Navigate to the file directory from your terminal for the back-end.
5. Make sure to run bundle install, rake db:drop, rake db:migrate, rake db:reset, and rake db:seed.
6. Run rails start and you should be prompted to http://localhost:3000/. (Make sure the back-end api is running on http://localhost:3000/)
7. Navigate to the file directory for the front-end, and run PORT=4000 npm start and you should be prompted to http://localhost:4000/.
8. To start with a Demo account play, just click on Demo and you can simply start.
9. For a quick tutorial of the App: [SpaceShip Shooter App](https://www.youtube.com/watch?v=uyQVa7hhAwQ).
10. To play live on Heroku on the Web, simply navigate to [SpaceShip Shooter Heroku](https://blooming-garden-39476.herokuapp.com/).

# ScreenShots of Game In Action
<div display="inline">
<img width="425" alt="screen shot 2018-08-13 at 6 10 25 pm" src="https://user-images.githubusercontent.com/34640293/44060951-66024cde-9f24-11e8-8ff2-e7b2f2abfbd4.png">

<img width="425" alt="screen shot 2018-08-13 at 6 07 58 pm" src="https://user-images.githubusercontent.com/34640293/44060982-877e669a-9f24-11e8-8053-4bc2bf23739a.png">
</div>

<img width="425" alt="screen shot 2018-11-10 at 10 10 34 pm" src="https://user-images.githubusercontent.com/34640293/48308591-a7bd5d00-e536-11e8-9bc9-9f369434c65e.png">

# Heroku App Deployment
Please be advised that the Heroku branch is on the branch called Heroku where if you want to only fork and clone the front end, you can simply switch over to the heroku branch.
Since the backend api is hosted on the web on 'https://space-shooter-api.herokuapp.com',
there is no need to fork and clone the backend api.

# Credits

This project was inspired by Asteroids
