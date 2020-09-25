# Jayway's Robot Assignment solution

Jayway's Programming assignment solution: Robot programming

## Installation

### Requirements

- In order to run the project you do not need any extra configuration or package manager, just your browser.

- In order to run the project tests you should have installed 'npm' or yarn' as a package manager.

### Usage

To run the app, just open the "index.html" file located inside the project's root folder.

### Test execution

To run the tests, execute the following commands in the project's root folder.

- First, install all dependencies.

```bash
npm install
```

- Finally, to run the tests.

```bash
npm test
```

## Programming language used

### Javascript

It was easy to pick a language to develop this assignment. I chose Javascript because, in my opinion, it is the simplest language to solve the assignment and the fastest to setup.

My approach is to keep it as simple as possible with the minimum code and avoiding boilerplate. JS does not require any type of configuration, you can start programming right away with no boilerplate at all. Finally since it is web based it was an obvious solution as well.

### HTML & CSS

I used HTML and CSS to create the skeleton of the page and to apply styles.

## Frameworks used

I did not use any framework for the solution. I though about using React but there aren't many DOM manipulations and all them are simple ones so I decided not to use it. Adding React or any other framework would just add more complexity to the project and, in my opinion, it does not provided much advantages so I decided that it was not worth it.

### Jest

In order to test I decided to use a testing framework. It definitely adds complexity and requires you to use a package manager (which I wanted to avoid) but it is way more convenient and makes really easy the testing task. Also it is widely used and it barely needs configuration. Many advantages so I decided it is worth to use.

## Decisions made during the implementation

### Project structure

The project structure is simple:<br/>
We have the main HTML file "index.html", the "robot.css" file where the styles are defined and the "robot.js" file where all the logic is. Finally we have the "robot.test.js" file where all tests are.

### HTML decisions

In here I decided to have a simple structure with a descriptive title at the top.<br/>
Then comes the input section where the user can insert the 3 peaces of information that the app needs. In that section I decided to use an HTML form to take advantage of the "required" attribute of the inputs, but since there is no backend the form does not perform any actions just executes the main JS function, when it is submitted, that handles all the logic.<br/> Finally there is the results section where the final report is shown to the user as well as a small robot animation to make it a bit more funny and visual.

### CSS decisions

In terms of styles, all of them are created from scratch and the main purpose was to make it look a bit retro with the black,grey and the green colors.

Not complex styles here, mainly padding and margin for good spacing. I used flexbox to align easily some elements. I added a transition that scales the button to a bigger size when hovered to add more visual interaction.

I created the class ".rowBreak" to add an empty element that takes all the horizontal space in one row to force the next one to be in the following row. I used it to push the submit button of the form to the next row because I consider that it looks better.

The ".progress" class draws a progress bar from where the robot image will advance. After that we have the ".robot-image" class that using a relative position brings the robot to the start of the progress bar and assigns the animation attributes.

Regarding the classes ".robot-image-start-animation" and ".robot-end-line" those are basically created to make easier the manipulation of the animation from JS. The first one can be merged with ".robot-image" and the second one can be deleted if we just want to execute it once. However, adding and removing this classes to the element we can re run the animation every time we execute the robot commands.

### Javascript decisions

Here is where the party starts.

I decided to use the functional paradigm because it is very readable and simple structured. I did not find good advantages of using object oriented programming in this case.

So, first of all, we have four objects (one for each orientation) where we store what we need to do in order to go forward in the room. If we imagine a chess table and we are north headed we just need to go one row backwards to advance, one row forward if we are in the south orientation. And the same with the columns and the west and east orientation.<br/>
We also store the orientation initial capital letter in the object, exactly as the user provides, to be able to match each orientation with the correct object.

Then, we save this objects in an array starting with north and following a clockwise order (imagine a compass). That way we can change the orientation of the robot very intuitively. If the robot turns right we change the current orientation for the one that is on it's right side in the array and the opposite procedure is applied if the robot turns left.

To get the user data we just get the value of the input from the DOM.

Some of this data needs to be parsed because a hole string is received from each input so the data of the room size and initial position need to be parsed. The procedure is simple, we break the string by white spaces to get an array and be able to extract every piece of information separately. Since we still have a string we have to parse it again to an integer if needed.

Once we have all the data properly parsed we just need to execute the commands and here is when "executeNavigationCommands" function comes in action.

It takes 4 arguments room size , initial position, initial orientation capital letter and of course the navigation commands

So, first of all we need to know which orientation object we need to use because right now we only have the initial letter. It is a simple search in the array with all the orientations that returns the index of the matched object.It could have been done right in this function but to keep the "single purpose" of the function I have decided to extract it to another one. At this point we have all the needed information so we can start executing commands.

To start executing we spread the commands string to convert it to an array and iterate over it with the map function. <br/>
Inside the callback of the map function I have decided to use a switch statement for its readability and simplicity.
The switch statement can match all the available commands and if there is an invalid one I decided to just ignore it.

We have 3 possible options here. Turn left or right and go forward. Each of this options are encapsulated in its own function.<br/>
In the case of the robot turning left or right we just move to the left or right in the orientations array as explained previously, all checking if we exceed the end or the beginning. In that case if we reach the end we go to the first position and the other way around when the start is reached.<br/> When the robot goes forward we increment or decrement the rows and columns of the current position as explained before, all checking that we do not exceed the limits of the room. If so, an error is thrown and the execution finishes.

Finally the final position and orientation capital letter are returned.

To report back to the user, the appropriate info is shown in the HTML using the DOM.

To start and stop the robot animation we just add and remove CSS classes from the image using the DOM. The same is done to reset the state and be able to run more commands again.

To finish with the JS we have the "startJourney" function which is the main function that controls the execution flow.

It is call when the data in the HTML form is submitted and it calls the other functions to get the user data, parse it and execute the commands catching possible errors.<br/>
At the end, when all the work is done it starts the robot animation and sets a timeout,(to give time to the animation to finish) that reports the final data to the user when the time is due.

## Decisions made in testing implementation

Due to time restrictions I decided to just test the JS functions that are critical for the system and do not interact with the DOM or get input data. I would be nice to test them and ensure that the user has a correct interaction.<br/>
That means we assume that the input from the user is always correct.

I also avoided adding a compiler since the browser seems to deal just fine with module exportation/importation and it will imply more complexity.

Using the data of the examples and adding some more we are able to test the correct behavior of the important functions.

### Parser functions

First, we ensure the correct behavior of the parser functions as an incorrect parsing will break all the system. We test it ensuring that they return a correct object matching it with one that we know is correct. No special cases here.

### Find orientation index in array

Then we test the function to find the appropriate orientation object given the capital letter of the orientation. Since it is just a function from the JS library we can avoid testing it but it was easy and not time consuming so I decided to test it.

### goForward function

After that we test the function that performs the operation of going forward. This function just performs an addition and maybe it can be avoided as well but, again, it was easy and not time consuming so I decided to test it.

### Room limits

Next we check if the last function correctly throws an error when the robot exceeds the limits of the room. <br/>
To test it we set 2 positions, one on the top left corner of the room and the other on the bottom right corner. With the first position we can check the north and west orientations just going one command forward and the same for the east and south orientations with the second position. <br/>
If it does not throw an error the test fails.

### Turning functions

Now we check the turning functions to see if we turn correctly. The special cases here are when we are at the begging of the orientations array and we turn left and when we are at the end of the array and we turn right. This cases are specially included.

### Navigation commands execution

Almost at the end, we of course need to check the correct behavior of the "executeNavigationCommands" function, so we test it with the two examples of the assignment and one additional that I made up to check a different room size.

### Invalid commands

Finally we test that if we have invalid commands the robot does not move.
