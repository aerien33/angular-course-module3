(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService);

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
    var controller = this;
}

MenuSearchService.$inject = ['$http'];
function MenuSearchService($http) {
    var service = this;

    service.getMatchedMenuItems = function (searchTerm) {
        return $http({
                   method: "GET",
                   url: "https://coursera-jhu-default-rtdb.firebaseio.com/menu_items.json"
               }).then(function (result) {
                   var foundItems = [];
                   for (let category in result.data) {
                       let menu_items = result.data[category].menu_items;
                       for (let item in menu_items) {
                           if (menu_items[item].description.toLowerCase().indexOf(searchTerm) !== -1) {
                               foundItems.push(menu_items[item]);
                           }
                       }
                   }

                   return foundItems;
               });
    }
}

})();