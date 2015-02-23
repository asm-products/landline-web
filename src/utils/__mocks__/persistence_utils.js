'use strict';

const PersistenceUtils = jest.genMockFromModule('../persistence_utils');
const mockRef = function() {
  return {
    orderByChild: function() {
      return {
        startAt: function() {
          return {
            on: function() {

            }
          }
        }
      }
    }
  }
};

PersistenceUtils.prototype.query.mockImplementation(mockRef);

module.exports = PersistenceUtils;
