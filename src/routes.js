const {
  addAksaraHandler,
  getAllAksaraHandler,
  getAksaraByIdHandler,
  editAksaraByIdHandler,
  deleteAksaraByIdHandler,
} = require("./handlerAksara");

const {
  addQuizHandler,
  getAllQuizHandler,
  getQuizByIdHandler,
  editQuizByIdHandler,
  deleteQuizByIdHandler,
  getTenRandomQuizsHandler,
} = require("./handlerQuiz");

const routes = [
  {
    method: "POST",
    path: "/aksara",
    handler: addAksaraHandler,
    options: {
      cors: true,
    },
  },
  {
    method: "GET",
    path: "/aksara",
    handler: getAllAksaraHandler,
  },
  {
    method: "GET",
    path: "/aksara/{aksaraId}",
    handler: getAksaraByIdHandler,
  },
  {
    method: "PUT",
    path: "/aksara/{aksaraId}",
    handler: editAksaraByIdHandler,
  },
  {
    method: "DELETE",
    path: "/aksara/{aksaraId}",
    handler: deleteAksaraByIdHandler,
  },

  {
    method: "POST",
    path: "/quiz",
    handler: addQuizHandler,
    options: {
      cors: true,
    },
  },
  {
    method: "GET",
    path: "/quiz",
    handler: getAllQuizHandler,
  },
  {
    method: "GET",
    path: "/quiz/{quizId}",
    handler: getQuizByIdHandler,
  },
  {
    method: "PUT",
    path: "/quiz/{quizId}",
    handler: editQuizByIdHandler,
  },
  {
    method: "DELETE",
    path: "/quiz/{quizId}",
    handler: deleteQuizByIdHandler,
  },
  {
    method: "GET",
    path: "/quiz/random",
    handler: getTenRandomQuizsHandler,
  },
];

module.exports = routes;
