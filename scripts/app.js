(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService);

function NarrowItDownController() {
    var controller = this;
}

function MenuSearchService() {
    var service = this;

    service.getMatchedMenuItems = function (searchTerm) {
        return $http({
                   method: "GET",
                   url: "https://coursera-jhu-default-rtdb.firebaseio.com/menu_items.json"
               }).then(function (result) {
                   var foundItems = [];
                   for (let category in result.data) {
                       for (let item in category.menu_items) {
                           if (item.description.toLowerCase().indexOf(searchTerm) !== -1) {
                               foundItems.push(item);
                           }
                       }

                   return foundItems;
               }
        });
    }
}

})();