// //////////////////////////////////////////////////////////////
//  SERVER/CONFIG/ROUTES.JS FILE
// //////////////////////////////////////////////////////////////
// NOTE: "app" express application is passed to the current file
// from the server.js file when the node server starts.

// Require controller.js file and set it to a variable:
// ( Change the "controller" variable name and the controller file name
// within the 'controllers' directory. )
const users = require('../controllers/users.js');
const tiles = require('../controllers/tiles.js');

// Export all routes to server.js:
module.exports = function (app) {
  // Root route - renders index.ejs view (for socket.io example):
  app.get('/', (request, response) => {
    response.render('index', { message: request.flash('error') });
  });

  app.get ('/forgetpw',(request, response) =>{
    response.render('forgetpw', { message: request.flash('error') });
  })

  app.get('/admin/dashboard', (request, response) => {
    if (request.session.user) {
      users.dashboard(request, response);
    } else {
      response.redirect('/index');
    }
  });
  // Admin route - renders admin.ejs:
  // app.get('/index', (request, response) => {
  //   response.render('index', { message: request.flash('error') });
  // });

  app.get('/logout', (request, response) => {
    request.session.destroy();
    response.redirect('/index');
  });

  // enter an individual learnup room
  app.get('/room/:id', (request, response) => {
    users.enterRoom(request, response);
  });

  app.get('/tiles', (request, response) => {
    tiles.getTiles(request, response);
  });

    // Class has ended, render page with message
    app.get('/end', (request, response) => {
      response.render('endOfClass');
    });  

  app.post('/login', (request, response) => {
    users.login(request, response);
  });

  // New user post route
  app.post('/new', (request, response) => {
    users.newUser(request, response);
  });

  app.post('/edit', (request, response) => {
    users.editUser(request, response);
  });

  app.post('/promote/:id', (request, response) => {
    users.promote(request, response, 1);
  });

  app.post('/demote/:id', (request, response) => {
    users.promote(request, response, -1);
  });

  app.post('/delete/:id', (request, response) => {
    users.delete(request, response);
  });

  app.post('/forgetpassword', (request, response) => {
    users.forgetpassword(request, response)
  });

  app.get('/reset/:token', (request, response) => {
    users.getUserinforgetpw(request, response)
  });

  app.post('/resetpw',(request, response) => {
    users.resetpassword(request, response)
  })
};
