"use strict";

const Hapi = require("@hapi/hapi");
const cors = require("cors");
require("./database/config");
const User = require("./database/user");
const Avatar = require("./database/avatars");
var users = [];
const Joi = require("joi");

// const init = async () => {
//   const server = Hapi.server({
//     port: 8000,
//     host: "localhost",
//     routes: {
//       cors: {
//         origin: ["*"], // an array of origins or 'ignore'
//         credentials: true, // boolean - 'Access-Control-Allow-Credentials'
//       },
//     },
//   });

const init = async () => {
  const server = Hapi.server({
    port: process.env.PORT || 3000,
    routes: {
      cors: {
        origin: ['https://sudoku2-0.vercel.app'],
        credentials: true,
      },
    },
  });

  

  server.route({
    method: "GET",
    path: "/",
    handler: (request, h) => {
      return "App is working";
    },
  });

  server.route({
    method: "POST",
    path: "/register",

    handler: async (request, h) => {
      try {
        console.log("got payload", request.payload);
        const { username, password, name, avatarUrl, score } = request.payload;
        let per = request.query;
        let res = await User.find(per).lean();
        users = res;
        const existingUser = users.find((user) => user.username === username);
        if (existingUser) {
          return h.response("Username already exists").code(409);
        }
        console.log("users", users);
        var person = new User(request.payload);
        var result = await person.save();
        return h.response(result);
      } catch (error) {
        console.log(error);
        return h.response(error).code(500);
      }
    },
  });

  server.route({
    method: "POST",
    path: "/auth",
    handler: async (request, h) => {
      const { username, password } = request.payload;
      let person = request.query;
      let result = await User.find(person).lean();
      console.log(result);
      const existingUser = result.find(
        (user) => user.username === username && user.password === password
      );
      if (existingUser) {
        console.log("login credentials", request.payload);

        return h.response(existingUser).code(200);
        console.log("Logged in successfully");
      }
      return h.response("Please enter correct credentials").code(409);
    },
  });

  server.route({
    method: "POST",
    path: "/signupAuth",
    handler: async (request, h) => {
      const { username } = request.payload;
      let person = request.query;
      let result = await User.find(person).lean();
      console.log(result);
      const existingUser = result.find(
        (user) => user.username === username
      );
      if (!existingUser) {
        return h.response("Username doesn't exist").code(200);
      }
      return h.response("Username already Exists").code(409);
    },
  });

  server.route({
    method: "POST",
    path: "/setAvatars",

    handler: async (request, h) => {
      try {
        var avatar = new Avatar(request.payload);
        var result = await avatar.save();
        return h.response(result);
      } catch (error) {
        return h.response(error).code(500);
      }
    },
  });

  server.route({
    method: "GET",
    path: "/getAvatars",
    handler: async (request, h) => {
      let avatar = request.query;
      let result = await Avatar.find(avatar).lean();
      return h.response(result);
    },
  });

  server.route({
    method: "GET",
    path: "/getUsers",
    handler: async (request, h) => {
      let person = request.query;
      let result = await User.find(person).lean();
      return h.response(result);
    },
  });
  
  server.route({
    method: 'POST',
    path: '/setScore/{username}',
    handler: async (request, h) => {
      const { username } = request.params;
      const { score } = request.payload;

      try {
        const user = await User.findOneAndUpdate(
          { username },
          { $push: { score } },
          { new: true }
        );

        if (!user) {
          return h.response({ error: 'User not found' }).code(404);
        }

        return user;
      } catch (error) {
        console.error(error);
        return h.response({ error: 'Failed to update user score' }).code(500);
      }
    },
  });

  server.route({
    method: "GET",
    path: "/topScores",
    handler: async (request, h) => {
      try {
        let person = request.query;
        let result = await User.find(person).lean();
        console.log("results are ==", result);
        const arrTop = result
          .flatMap((user) =>
            user.score.map((score) => ({
              score: parseInt(score),
              name: user.name,
              avatarUrl: user.avatarUrl
            }))
          )
          .sort((a, b) => b.score - a.score)
          .slice(0, 5);
        console.log("top rankers are ==", arrTop);
        return h.response(arrTop);
      } catch (err) {
        console.error(err);
        return h.response("Api is not working").code(500);
      }
    },
  });

  await server.start();
  console.log("Server running on %s", server.info.uri);
};

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

init();
