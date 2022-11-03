# RentACar

This is a code base that I put together in a night to try out Ruby on Rails linked to React (TypeScript).

This application allows a user to register and then list a car for hire. They can see a list of cars after that.

## Future Work

If I were to continue with this I would do the following;

- ~~Add Docker container to wrap the code~~
- Allow the user to delete a listing
- Allow a user to hire the car

## Notes

The code doesn't take security into account as I put the full stack together in a few hours.

## How to run

To run this code, you can run it in docker.

1. Ensure docker is installed
2. Open a terminal in the directory
3. Run `docker-compose build` and then `docker-compose up -d`
4. Connect to your local React page (`http://localhost:3000/`)

Note, the Ruby is quite primitive as I have not used it in a long time and have been trying to get back in context in this time.
