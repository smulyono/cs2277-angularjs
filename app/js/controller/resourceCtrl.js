/*
 * Controller for resources View
 *
 * @author : Sanny Mulyono <smulyono@me.com -- http://smulyono.github.io/>
 */
angcontroller.controller('resourceCtrl',
    function($scope, $routeParams, $location,  ratecardService, resourceService, utilService){
        // scope variable to control whether the resource is in edit (not showing the combobox)
        // or standard (with combobox shown)
        $scope.showoptions = true;

        // inject the style based on their visibility.
        $scope.visibleoptions = function(){
            if ($scope.showoptions){
                return {"display" : "block"};
            } else {
                return {"display" : "none"};
            }
        };

        // inject the style based on their visibility
        $scope.visibletextoptions = function(){
            if ($scope.showoptions == false){
                return {"display" : "block"};
            } else {
                return {"display" : "none"};
            }
        };

        // standard redirect action; redirect user
        // to standard resource page
        $scope.standardeditpage = function(){
            $location.path('/resource');
        };

        // receiving any data changes notification from outside
        $scope.$on('data changed', function(){
            $scope.init();
        });

        // Update all Resource hours based on newvalue parameters
        $scope.updateHours = function(newvalue){
            resourceService.massUpdateResourceHour($scope.resources, newvalue);
        };

        // reload resource from services
        $scope.refreshResource = function(){
            if ($scope.selectedresource != undefined){
                // There is no Key specified in the requirement, so combination of
                // category and role is used
                var keyToFind = $scope.selectedresource.ratecard_index;
                $scope.resources = resourceService.getResource(keyToFind);
            }
        };

        // save any updates / changes to the resources
        $scope.saveResource = function(){
            var keyToFind = $scope.selectedresource.ratecard_index;
            if (keyToFind != undefined){
                resourceService.setResource(keyToFind, $scope.resources);
                utilService.showConfirmation("Resource Saved!");
            } else {
                // give error notifications when trying to save resources with empty role
                utilService.showConfirmation("Unable to save / update Resource ; please choose one of the Role!");
            }
        };

        // initialization method
        $scope.init = function(){
            // identify whether $routeParams / parameter is used
            $scope.params = $routeParams;
            if ($scope.params.resourceid != undefined){
                $scope.selectedresource = ratecardService.getRateCardByIndex($scope.params.resourceid);
                $scope.showoptions = false;
            } else {
                $scope.selectedresource =0;
                $scope.showoptions = true;
            }

            $scope.ratecard = ratecardService.getRateCard();
            $scope.refreshResource();
        };

        var initialize = function(){
            // init
            $scope.init();
        }();
    }
);
