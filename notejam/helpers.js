module.exports = {
  formatFormErrors: function(errors) {
    formatted = {};
    if (Array.isArray(errors)) {
      errors.forEach(function(e) {
        formatted[e.param] = e.msg;
      });
    } else {
      console.error("Expected errors to be an array, but got:", errors);
    }
    return formatted;
  },

  formatModelErrors: function(errors) {
    formatted = {};
    if (Array.isArray(errors)) {
      errors.forEach(function(e) {
        formatted[e.property] = e.msg;
      });
    } else {
      console.error("Expected errors to be an array, but got:", errors);
    }
    return formatted;
  },

  loginRequired: function (req, res, next) {
    if (req.isAuthenticated()) { return next(); }
    res.redirect('/signin');
  }
}
