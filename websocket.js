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

        socket.on('toggleRadio', function () {
            if (client.status.state === "play") {
                debug("Toggle Radio -> Stop");
                client.stop();
            }
            else {
                debug("Toggle Radio -> Play");
                client.play();
            }
        });
    });

    client.on('ready', function () {
        debug('MPD initiated: %s', client.currentsong.Title);
    });

    client.on('songinfo', function (newSong) {
        debug('MPD new song: %s', newSong.Title);
        io.emit('newSong', newSong);
    });

    client.on('status', function (status) {
        debug('MPD status changed to: %s', status.state);
        io.emit('playerstatus', status.state);
    });
}

module.exports = exports = SocketIOServer;