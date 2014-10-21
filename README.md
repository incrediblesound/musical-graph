musical-graph
=============

An experiment in animation and sound

Animate.js
----------
This is a big file with esoteric programmer stuff in it like init() animate() and render(). Basically it makes a canvas, creates a graph, and then starts moving the graph around on the canvas. It also forces the graph to sing, but more on that later.

Graph.js
--------
For now, this is just a really simple graph data-structure. Its got a funny method called copyNodeArray though, I'd watch out for that one, if I were you.

Zone.js
-------
This file contains a class called the "Zone" because naming things, yeah. This is basically an object that I attach onto a node in the graph, it has a render method that renders that graph node and its edges onto the canvas. It also gets an oscillator tacked onto it which is accessible via the sing method.


Oscillators.js
--------------
This file contains JavaScript "classes" for building oscillators and groups of oscillators with the webaudio api. It's pretty useful if you like building oscillators and your browser supports the webaudio api.

audioEngine.js
--------------
This contains a function that creates (functionally) an object on the window called the audioEngine. It has a property called input that takes audio sources, calms them down a little, and the connects them to the audio context destination. Pretty sweet.

cell.js
-------
This is a class that makes big clunky x,y coordinates into smaller, easier to use coordinates.
