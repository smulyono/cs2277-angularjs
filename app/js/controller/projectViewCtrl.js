/*
 * Controller for Project View
 *
 * @author : Sanny Mulyono <smulyono@me.com -- http://smulyono.github.io/>
 */
angcontroller.controller('projectViewCtrl',
    function($scope,projectService, utilService, timelineService, ratecardService, resourceService){
        // scope variable for Project Table View Title
        $scope.title = "Spring Schedules";

        // Receive notification for any data changes
        $scope.$on('data changed', function(){
            $scope.refreshView();
        });

        // Refresh the view; only occur during the initialization or
        // when the data changed from other view since this view is
        // strictly VIEW - NON EDIT
        $scope.refreshView = function(){
            projectService.refreshProject();
            $scope.projects = projectService.constructMatrix();

            $scope.maintimelines = timelineService.getTimelines();
            $scope.mainratecard = ratecardService.getRateCard();
        };

        // initialization portion
        var initialization = function(){
            $scope.refreshView();
        }();
    }
);
