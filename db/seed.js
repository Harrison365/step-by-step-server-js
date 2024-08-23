const db = require("./connection");
const format = require("pg-format");

const seed = ({ movies, users, reviews }) => {
  return db.query(`DROP TABLE IF EXISTS movie_reviews;`).then(() => {
    return db
      .query(`DROP TABLE IF EXISTS movies;`)
      .then(() => {
        return db.query(`DROP TABLE IF EXISTS users;`);
      })
      .then(() => {
        return db.query(
          `CREATE TABLE users (user_id SERIAL PRIMARY KEY, username VARCHAR(255) UNIQUE, display_name VARCHAR(100) NOT NULL, profile_pic VARCHAR DEFAULT 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png', bio VARCHAR(400) NOT NULL, joined TIMESTAMP DEFAULT CURRENT_TIMESTAMP);`
        );
      })
      .then(() => {
        db.query(
          `CREATE TABLE movies (movie_id SERIAL PRIMARY KEY, movie_name VARCHAR(200) NOT NULL, director VARCHAR(150) NOT NULL, release_year INT NOT NULL, duration INT NOT NULL, image_url VARCHAR DEFAULT 'https://d3aa3603f5de3f81cb9fdaa5c591a84d5723e3cb.hosting4cdn.com/wp-content/uploads/2020/11/404-poster-not-found-CG17701-1.png', votes INT NOT NULL, score INT NOT NULL)`
        );
      })
      .then(() => {
        return db.query(
          `CREATE TABLE movie_reviews (review_id SERIAL PRIMARY KEY, movie_id INT REFERENCES movies(movie_id) NOT NULL, username VARCHAR(255) REFERENCES users(username) NOT NULL, score INT NOT NULL, body VARCHAR(600) NOT NULL, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)`
        );
      })
      .then(() => {
        const moviesArrayOfArrays = movies.map(
          ({
            movie_name,
            director,
            release_year,
            duration,
            image_url,
            votes,
            score,
          }) => {
            return [
              movie_name,
              director,
              release_year,
              duration,
              image_url,
              votes,
              score,
            ];
          }
        );
        const movieSqlStr = format(
          `INSERT INTO movies (movie_name,
          director,
          release_year,
          duration,
          image_url,
          votes,
          score) VALUES %L RETURNING *`,
          moviesArrayOfArrays
        );
        return db.query(movieSqlStr);
      })
      .then(() => {
        const usersArrayOfArrays = users.map(
          ({ username, display_name, profile_pic, bio }) => {
            return [username, display_name, profile_pic, bio];
          }
        );
        const usersSqlStr = format(
          `INSERT INTO users (username, display_name, profile_pic, bio) VALUES %L RETURNING *`,
          usersArrayOfArrays
        );
        return db.query(usersSqlStr);
      })
      .then(() => {
        const movie_reviewsArrayOfArrays = reviews.map(
          ({ movie_id, username, score, body }) => {
            return [movie_id, username, score, body];
          }
        );
        const movie_reviewsSqlStr = format(
          `INSERT INTO movie_reviews (movie_id, username, score, body) VALUES %L RETURNING *`,
          movie_reviewsArrayOfArrays
        );
        return db.query(movie_reviewsSqlStr);
      });
  });
};

module.exports = seed;
