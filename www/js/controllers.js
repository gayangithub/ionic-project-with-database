angular.module('starter.controllers', [])

.controller('MyCtrl', function ($scope, $ionicPlatform, $cordovaSQLite) {

   var db;
   var num = 1;

   $ionicPlatform.ready(function () {
      if (window.cordova) {
         //device
         db = $cordovaSQLite.openDB({
            name: "my.db"
         });
         //         db = $cordovaSQLite.openDB({
         //            name: "my.db",
         //            bgType: 1
         //         });
      } else {
         // browser
         db = window.openDatabase("my.db", '1', 'my', 1024 * 1024 * 100);
      }
      $cordovaSQLite.execute(db, 'DROP TABLE IF EXISTS DEMO');
      $cordovaSQLite.execute(db, 'CREATE TABLE IF NOT EXISTS DEMO (id unique, data)');
   });

   $scope.create = function () {
      var query = 'INSERT INTO DEMO (id, data) VALUES (?,?)';
      var queryParam = [num, num + " rom"];
      $cordovaSQLite.execute(db, query, queryParam).then(function (res) {
         alert("Insert ID : " + res.insertId + " | " + "Rows affected : " + res.rowsAffected);
         num++;
      }, function (err) {
         alert("Error on Create");
      });
   };

   $scope.read = function () {
      var query = 'SELECT * FROM DEMO';
      var queryParam = [];
      $cordovaSQLite.execute(db, query, queryParam).then(function (res) {
         alert("Returned rows : " + res.rows.length);
      }, function (err) {
         alert("Error on Read");
      });
   };

   //$scope.update = function () {};

   //$scope.delete = function () {};

});