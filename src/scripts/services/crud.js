'use strict';

module.exports =
angular.module('quill-grammar.services.crud', [
  'firebase',
  'underscore',
])

.factory('CrudService', function(firebaseUrl, $firebase, $q, _) {
  function crud(entity, properties) {
    if (!properties) {
      properties = [];
    }
    if (firebaseUrl[firebaseUrl.length - 1] !== '/') {
      firebaseUrl = firebaseUrl + '/';
    }
    if (!entity || entity === '') {
      throw new Error('Firebase Entity MUST be defined');
    }
    var baseRef = $firebase(new Firebase(firebaseUrl + entity));
    var baseCollection = baseRef.$asObject();

    function sanitize(item) {
      if (properties) {
        return _.pick(item, function(value, key) {
          return key[0] === '$' || _.contains(properties, key);
        });
      }
      return item;
    }

    function save(item) {
      var d = $q.defer();
      var entityItem = sanitize(item);
      baseRef.$push(entityItem).then(function(ref) {
        d.resolve(ref.key());
      }, function(error){
        d.reject(error);
      });
      return d.promise;
    }

    function del(item) {
      var entityItem = sanitize(item);
      var d = $q.defer();
      baseCollection.$loaded().then(function() {
        baseCollection.$remove(entityItem).then(function(ref) {
          d.resolve(ref.key());
        }, function(error){
          d.reject(error);
        });
      });
      return d.promise;
    }

    function all() {
      var d = $q.defer();
      baseCollection.$loaded().then(function() {
        d.resolve(baseCollection);
      }, function(error) {
        d.reject(error);
      });
      return d.promise;
    }

    function get(entityId) {
      var d = $q.defer();
      baseCollection.$loaded().then(function() {
        var record = baseCollection[entityId];
        if (record) {
          d.resolve(record);
        } else {
          console.log(new Error('Record with ' + entityId + ' not found.'));
          d.resolve();
        }
      });
      return d.promise;
    }

    function update(item) {
      var d = $q.defer();
      baseCollection.$loaded().then(function() {
        var index = item.$id;
        baseCollection[index] = sanitize(item);
        baseCollection.$save(index).then(function(ref) {
          console.log(ref.key());
          d.resolve(ref.key());
        }, function(error){
          console.log(error);
          d.reject(error);
        });
      });
      return d.promise;
    }

    return {
      save: save,
      del: del,
      all: all,
      get: get,
      update: update,
    };
  }

  return crud;
});
