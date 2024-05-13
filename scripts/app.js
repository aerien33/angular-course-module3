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
}

})();