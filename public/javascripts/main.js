'use strict';

angular.module('instantApp', [])
  .controller('InstantController', function($scope) {
        var socket = io.connect('http://localhost:3000');
        socket.on('connect', function(data) {
            socket.emit('join');
        });

    $(window).mousemove(function(e){
          socket.emit('mouseX', e.pageX);
          socket.emit('mouseY', e.pageY);

          socket.on('moveX', function(x) {
              $("#cuadro").css({'left':x});
          });
          socket.on('moveY', function(y) {
              $("#cuadro").css({'top':y});
          });
      });

  $scope.msg = "";

  $scope.$watch("msg", function(newValue, oldValue) {
    if ($scope.msg.length >= 0) {
      socket.emit("send", $scope.msg);
    }
  });
            socket.on('read', function(data) {
              $("body").html(data)
          });
  });