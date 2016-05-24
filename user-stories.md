***BusMall***
---Backstory---
BusMall whose product is similar to the SkyMall
<!-- 4-5 user stories for each role.'user stories' commit that is in place before any code is written. -->
---User Stories---
==the marketing research team==
## I would like to have counter for number of "clicks" per each image.
## I would like to have counter for number of "shown" to user per each image.
## I would like to have counter for totalClicks.

==the developer==
## create constructor object for images with properties for the name of the image, its filepath, the number of times it has been shown, and the number of times it has been clicked.
## create an function to display 1 random image first, then call the function 3 times to generate 3 image
...(1) using Math.random() to generate a random number.
...(2) using the random number to access array.
...(3) assign path value to src
....... <a> if image is duplicated, repeat step (1) above, else generate the next image until 3 image displayed.
## add eventListener to object/container to receive the action = clicks
## add console.log() to debug the code
## create function to output images
## create counter for totalClicks (max = 25 clicks per each user)
## stop eventListener using container.removeEventListener()

==users==
the focus group participant who will be using the application.
## I would like to see 3 images displayed side-by-side-by-side in the browser window after each clicks
## After 25 clicks, I would like to see the data
## style up with CSS
