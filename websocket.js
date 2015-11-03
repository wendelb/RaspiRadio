"use strict";

var socket = require('socket.io'),
    debug = require('debug')('mpc:websocket'),
    MPDAdapter = require('mpdadapter');

function SocketIOServer(http) {
    var io = socket(http),
        client = new MPDAdapter('192.168.2.100');

    io.on('connection', function (socket) {
        debug('A client connected');

        // Init für diesen Client durchführen
        socket.emit('playerstatus', client.status.state);
        socket.emit('newSong', client.currentsong);
    });

    client.on('ready', function () {
        debug('MPD initiated: %s', client.currentsong.Title);
    });

    client.on('songinfo', function (newSong) {
        debug('MPD new song: %s', newSong.Title);
        io.emit('newSong', newSong);
    });
}

module.exports = exports = SocketIOServer;