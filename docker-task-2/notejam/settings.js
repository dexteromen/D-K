var settings = {
  development: {
    db: {
      host: 'db', // Use the service name defined in docker-compose.yml
      port: 5432,
      user: 'postgres',
      password: 'password', // Ensure this matches the password in db/password.txt
      database: 'notejam'
    },
    dsn: "postgres://postgres:password@db:5432/notejam" // Update the host to 'db'
  }
};

var env = process.env.NODE_ENV;
if (!env) {
  env = 'development';
}
module.exports = settings[env];

