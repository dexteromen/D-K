var settings = {
  development: {
    db: {
      host: 'localhost',
      port: 5432,
      user: 'postgres',
      password: 'password',
      database: 'notejam'
    },
    dsn: "postgres://postgres:password@localhost:5432/notejam"
  },
  test: {
    db: {
      host: 'localhost',
      port: 5432,
      user: 'postgres',
      password: 'password',
      database: 'notejam_test'
    },
    dsn: "postgres://postgres:password@localhost:5432/notejam_test"
  }
};

var env = process.env.NODE_ENV;
if (!env) {
  env = 'development';
}
module.exports = settings[env];


// var settings = {
//   development: {
//     db: "notejam.db",
//     dsn: "sqlite://notejam.db"
//   },
//   test: {
//     db: "notejam_test.db",
//     dsn: "sqlite://notejam_test.db"
//   }
// };


// var env = process.env.NODE_ENV
// if (!env) {
//   env = 'development'
// };
// module.exports = settings[env];
