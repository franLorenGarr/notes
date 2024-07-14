const notesRouter = require("express").Router();

const { trusted } = require("mongoose");
const Note = require("../models/note.js");

notesRouter.get("/", (request, response, next) => {
  Note.find({}).then((notes) => {
    response.json(notes);
  });
});

notesRouter.get("/:id", (request, response, next) => {
  Note.findById(request.params.id)
    .then((note) => {
      if (note) {
        response.json(note);
      } else {
        response.status(404).endf();
      }
    })
    .catch((error) => next(error));
});

notesRouter.post("/", (request, response, next) => {
  const body = request.body;
  const date = new Date().toDateString();
  const note = new Note({
    content: body.content,
    important: body.immportant || false,
    date: date,
  });
  note
    .save()
    .then((savedNote) => {
      response.json(savedNote);
    })
    .catch((error) => next(error));
});
notesRouter.delete("/:id", (request, response, next) => {
  Note.findByIdAndDelete(request.params.id)
    .then(() => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});

notesRouter.put("/:id", (request, response, next) => {
  const body = request.body;
  const note = {
    content: body.conent,
    important: body.important,
  };
  Note.findByIdAndUpdate(request.params.id, note, { new: trusted })
    .then((updatedNote) => {
      response.json(updatedNote);
    })
    .catch((error) => next(error));
});

module.exports = notesRouter;
