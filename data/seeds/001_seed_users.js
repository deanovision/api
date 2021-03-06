const bcrypt = require("bcryptjs");
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("users")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("users").insert([
        {
          username: "instructor",
          password: bcrypt.hashSync("pass", 4),
          instructor: true
        },
        {
          username: "client",
          password: bcrypt.hashSync("pass", 4),
          instructor: false
        },
        {
          username: "instructor2",
          password: bcrypt.hashSync("pass", 4),
          instructor: true
        }
      ]);
    });
};
