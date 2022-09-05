# Side Stacker Project

Time taken to complete the project:
roughly 5 hours

To run this project, please run the following commands:

In the frontend folder:
 - `npm install`
 - `npm start`

In the backend folder:
 - `npm install`
 - `npm start:dev`
   - or `npm start` for production build.
     - Keep in mind databases will be different.

The project was built on Windows; 
This should not cause any problems, 
but it might have some conflict with unix systems.

If anything goes wrong during testing, 
please contact me at gabrielsmerlin@outlook.com, 
and I will medicate it as soon as possible.

### Notes and thoughts:
I've left "breadcrumbs" that should allow us to add a few features:
- Right now when you disconnect (such as refreshing the page by accident) you should be sent back to the same match. However, this can create a "deadlock" state -- If a player never plays, the game never ends!
  - We could/should add a timer that makes the current player "forfeit" automatically after X amount (120s?) of time passes
- We have a function for fetching and parsing player info, but nothing to do with it!
  - We could add a "profile page" to our frontend that fetches and displays that information
- We should be able to handle multiple connections and multiple people playing at the same time, but what if I want to play with someone specific?
  - We could add a new type of connection (private connections) and a button in the frontend to connect to a specific private connection.
    - If you attempt to connect to a private connection that doesn't exist, a new one with the ID you provided is created instead
    - Otherwise, you'll connect to that private connection!
      - This means we'd need to create a way to manage these private connections. Most likely, what we want to do is copy our 'ConnectionManager', renaming it to something like "PublicConnections" or "PublicConnectionManager" and create a new "PrivateConnectionManager" that handles private connections.
      - It would differ from the normal connection manager in that we'd expect all connections to contain a specific, unique identifier for that connection, which we would use to handle the connections themselves.
