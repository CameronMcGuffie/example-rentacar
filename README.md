# RentACar

This is a code base that I put together in a night to try out Ruby on Rails linked to React (TypeScript).

This application allows a user to register and then list a car for hire. They can see a list of cars after that.

## Future Work

If I were to continue with this I would do the following;

- Add Docker container to wrap the code
- Allow the user to delete a listing
- Allow a user to hire the car

## Notes

The code doesn't take security into account as I put the full stack together in a few hours, this is also why it isn't wrapped in Docker.

## How to run

To run, you will need to do things manually for now.

1. cd to api
2. Run `rails s`
3. Open a new terminal and cd to web
4. `npm install`
5. `npm run start`
6. Connect to your local React page (`http://localhost:3001/`)

This will definitely be automated with Docker at some point.

Note, the Ruby is quite primitive as I have not used it in a long time and have been trying to get back in context in this time.
