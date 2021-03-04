# Objectives
This technical test is designed to show:
* Your skills with React and its ecosystem.
* Ability to write tests.
* Good eye for responsive design and good use of tools/frameworks available.
* Knowledge of REST API access for collecting data.
* Clean coding practices.
 
# Test starts here
Create a single page application for publishing an online “Memory” game. 

Memory is a card game in which all of the cards are laid face down on a surface and two cards are flipped face up over each turn. The object of the game is to turn over pairs of matching cards.

* Wikipedia: https://en.wikipedia.org/wiki/Concentration_(card_game)
* Video example: https://www.youtube.com/watch?v=8HjfrhV7xHA

Please, take this video as an example, scoring system and UX has been simplified in our test.

## Requirements: 
Use React + any other library or extension you might need.

Images for this memory game will be collected using GitHub API.

Page must be responsive as shown in the attached wireframe.

 
## Game initialization:
 
1. Connect to Github API and fetch top 25 contributors of React repository.

* React repository: https://github.com/facebook/react
* API endpoint: https://api.github.com/repos/facebook/react/contributors?

2. Pick randomly 6 contributors and use their avatars.
3. Avatars are duplicated and shuffled.
4. Display a button to start the game.
 
## Gameplay:
1. Show 12 boxes as explained on the wireframe. Avatars remain hidden. 
2. The player has 60 seconds to find all pairs by selecting (clicking) 2 cards. 
3. Time is counting down, in real time, while the user is playing.
4. The player gets 100 points every time they find a pair. 
 
## Game ends:
1. Game finishes when all pairs are found or time is over.
2. Display "New Game" button to play again and start with a clean state. (back to game initialization).

## Other considerations:
Please provide a short summary detailing anything you think is relevant, for example:
* Installation steps.
* How to run your code / tests.
* Where to find your code.
* Was it your first time writing a unit test, using a particular framework, etc?
* What would you have done differently if you had had more time.
* Etc.

## Code submission:

- In a **private repository in Github**. This is the preferred option.
- Others like GitLab or Bitbucket are also fine.

Please, contact us to know who to invite as collaborator to the repo.

Having full commit history is optional but would be considered as a plus.
