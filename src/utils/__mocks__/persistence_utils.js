'use strict';

const PersistenceUtils = jest.genMockFromModule('../persistence_utils');
const mockQuery = function() {
  return {
    once: function() {

    },

    orderByChild: function() {
      return {
        startAt: function() {
          return {
            on: function() {

            },
            once: function() {

            }
          }
        }
      }
    }
  }
};

const mockPush = function() {
  return {
    key: function() {

    }
  }
};

PersistenceUtils.prototype.query.mockImplementation(mockQuery);
PersistenceUtils.prototype.push.mockImplementation(mockPush);

module.exports = PersistenceUtils;
