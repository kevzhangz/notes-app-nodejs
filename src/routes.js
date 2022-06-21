/* eslint-disable no-unused-vars */
/* eslint-disable arrow-body-style */
/* eslint-disable no-unused-expressions */

const {
    addNoteHandler,
    showAllNoteHandler,
    showNoteByIdHandler,
    updateNoteHandler,
    deleteNoteHandler,
} = require('./handler');

const routes = [
    {
        method: 'POST',
        path: '/notes',
        handler: addNoteHandler,
    },
    {
        method: 'GET',
        path: '/notes',
        handler: showAllNoteHandler,
    },
    {
        method: 'GET',
        path: '/notes/{id}',
        handler: showNoteByIdHandler,
    },
    {
        method: 'PUT',
        path: '/notes/{id}',
        handler: updateNoteHandler,
    },
    {
        method: 'DELETE',
        path: '/notes/{id}',
        handler: deleteNoteHandler,
    },
];

module.exports = routes;
