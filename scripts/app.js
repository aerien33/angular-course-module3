(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.directive('foundItems', FoundItemsDirective);

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
    var controller = this;
    controller.searchTerm = "";
    controller.found = [];

    controller.getItems = function (searchTerm) {
        MenuSearchService.getMatchedMenuItems(searchTerm)
            .then(function (result) {
                controller.found = result;
            });
    }

    controller.removeItem = function (index) {
        controller.found.splice(index, 1);
    };
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

function FoundItemsDirective() {
    var ddo = {
        scope: {
            found: '<',
            onRemove: '&'
        },
        templateUrl: 'templates/foundItems.html',
        controller: FoundItemsDirectiveController,
        controllerAs: 'controller',
        bindToController: true,
    };

    return ddo;
}


function FoundItemsDirectiveController() {
    var controller = this;
}

})();