(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.directive('foundItems', FoundItemsDirective);

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
    var controller = this;
    controller.input = "";
    controller.submit = false;
    controller.found = [];

    controller.getItems = function (input) {
        controller.submit = true;
        controller.searchTerm = controller.input;
        if (controller.searchTerm !== "") {
            MenuSearchService.getMatchedMenuItems(controller.searchTerm)
                .then(function (result) {
                    controller.found = result;
            });
        }
    }

    controller.displayItems = function () {
        return controller.searchTerm !== "" && controller.found.length > 0;
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
            submit: '<',
            found: '<',
            displayItems: '&display',
            onRemove: '&'
        },
        templateUrl: 'templates/foundItems.html',
        controller: NarrowItDownController,
        controllerAs: 'controller',
        bindToController: true
    };

    return ddo;
}

})();