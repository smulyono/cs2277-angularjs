/*
 * Controller for Ratecard View. Showing all available ratecards and ability to
 *    update them
 *
 * @author : Sanny Mulyono <smulyono@me.com -- http://smulyono.github.io/>
 */
angcontroller.controller('ratecardCtrl',
    function($scope, ratecardService) {
        // receive notification of data changes
        $scope.$on('data changed', function(){
            $scope.refreshRateCard();
        });

        // upon changes, force the field to be re-calculated
        $scope.calculateField = function(index){
            ratecardService.calculateField($scope.ratecard,index);
        };

        // deleting ratecard record
        $scope.deleteRow = function(index){
            $scope.ratecard.splice(index, 1);
        };

        // Adding new ratecard record
        $scope.addRow = function(){
            var index = $scope.ratecard.length;
            var categoryvalue = "";
            if (index > 0){
                // using previous category as default value
                categoryvalue = $scope.ratecard[index-1].Category;
            }

            $scope.ratecard.push({
                Category : categoryvalue
            });
        };

        // save any changes of the ratecard
        $scope.saveRateCard = function(){
            ratecardService.setRateCard($scope.ratecard);
            utilService.showConfirmation("Rate Card Information Saved!");
        };

        // reload the ratecard by reloading them back from the services
        $scope.refreshRateCard = function(){
            // reload the ratecard
            $scope.ratecard = ratecardService.getRateCard();
        };

        var initialization = function(){
            $scope.refreshRateCard();
        }();
    }
);
