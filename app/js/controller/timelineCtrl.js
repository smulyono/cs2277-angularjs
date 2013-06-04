/*
 * Controller for timeline view
 *
 * @author : Sanny Mulyono <smulyono@me.com -- http://smulyono.github.io/>
 */
angcontroller.controller('timelineCtrl',
    function($scope, timelineService, utilService) {
        /*
         * Adding row
         *   populating all default text on Phase and Name
         */
        $scope.addRow = function(){
            var index = $scope.timelines.length;
            var defaultphase = "Phase";
            // Find the previous timelines (if any)
            if (index > 0){
                defaultphase = $scope.timelines[index-1].phase;
            }
            $scope.timelines.push({
                week : "",
                phase: defaultphase ,
                name : "Week - " + (index + 1)
            });
        };

        /*
         * Delete single row
         * @param index, array index to delete
         */
        $scope.deleteRow = function(indextodelete){
            $scope.timelines.splice(indextodelete , 1);
        };

        /*
         * Persist the updated timeline
         */
        $scope.saveTimeLines = function(){
            // before it is being saved to the main / root scope
            // populate the week
            for (var i=0;i<$scope.timelines.length;i++){
                $scope.timelines[i].week = i + 1;
            }
            // make a copy so this view won't loss the data
            var objectcopy = utilService.clone($scope.timelines);
            timelineService.setTimeLines(objectcopy);
            utilService.showConfirmation("New Timelines Added");
        };

        $scope.refreshTimelines = function(){
            $scope.timelines = timelineService.getTimelines();
        };

        // initialization portion
        var initialization = function(){
            $scope.refreshTimelines();
        }();
    }
);
