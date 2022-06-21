/* eslint-disable no-unused-vars */
const { nanoid } = require('nanoid');
const notes = require('./notes');

const findNoteIndex = (request) => {
    const { id } = request.params;
    const note = notes.findIndex((item) => item.id === id);

    return note;
};

const addNoteHandler = (request, h) => {
    const { title, tags, body } = request.payload;

    const id = `notes-${nanoid(8)}`;
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    notes.push({
        id, title, tags, body, createdAt, updatedAt,
    });

    const isSuccess = notes.filter((note) => note.id === id).length > 0;

    if (isSuccess) {
        const msg = {
            status: 'Success',
            message: 'Catatan berhasil ditambahkan',
            data: {
                noteId: id,
            },
        };
        return h.response(msg).code(201);
    }

    const msg = {
        status: 'Error',
        message: 'Catatan gagal untuk ditambahkan',
    };

    return h.response(msg).code(500);
};

const showAllNoteHandler = (request, h) => {
    const data = {
        status: 'Success',
        data: {
            notes,
        },
    };

    return data;
};

const showNoteByIdHandler = (request, h) => {
    const { id } = request.params;
    const result = notes.find((item) => item.id === id);

    if (result === undefined) {
        const msg = {
            status: 'Fail',
            message: 'Catatan tidak ditemukan',
        };
        return h.response(msg).code(404);
    }

    const msg = {
        status: 'Success',
        data: {
            note: result,
        },
    };
    return h.response(msg).code(200);
};

const updateNoteHandler = (request, h) => {
    const note = findNoteIndex(request);

    if (note === -1) {
        return h.response({
            status: 'fail',
            message: 'Gagal memperbarui catatan. Id catatan tidak ditemukan',
        }).code(404);
    }

    const { title, tags, body } = request.payload;
    notes[note].title = title;
    notes[note].tags = tags;
    notes[note].body = body;
    notes[note].updatedAt = new Date().toISOString();

    return h.response({
        status: 'success',
        message: 'Catatan berhasil diperbaharui',
    }).code(200);
};

const deleteNoteHandler = (request, h) => {
    const note = findNoteIndex(request);

    if (note === -1) {
        return h.response({
            status: 'fail',
            message: 'Gagal memperbarui catatan. Id catatan tidak ditemukan',
        }).code(404);
    }

    notes.splice(note, 1);

    return h.response({
        status: 'Success',
        message: 'Catatan berhasil dihapus',
    }).code(200);
};

module.exports = {
    addNoteHandler,
    showAllNoteHandler,
    showNoteByIdHandler,
    updateNoteHandler,
    deleteNoteHandler,
};
