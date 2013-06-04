/*
 * Service to handle timeline object and View
 *
 * @author : Sanny Mulyono <smulyono@me.com -- http://smulyono.github.io/>
 */
angservices.service('timelineService', function($rootScope, utilService){
    this.timelines = [];

    // Setter method to populate timelines
    this.setTimeLines = function(newtimelines){
        if (typeof newtimelines != 'undefined'){
            this.timelines = utilService.clone(newtimelines);
            $rootScope.$broadcast('data changed');
        }
    };

    // Retrieve all available timelines data
    this.getTimelines = function(){
        // to avoid gives array reference, the array is passed
        // by value
        return utilService.clone(this.timelines);
    };

    // Retrieve individual timeline based on their index (array index)
    this.getTimelinesByIndex = function(index){
        return utilService.clone(this.timelines[index]);
    };

    // Return the Presentation View of a single timeline; this method
    // will NOT return an object instead will return a String
    this.getTimelinesPresentationByIndex = function(index){
        var tline =  utilService.clone(this.timelines[index]);
        return tline.phase + " / " + tline.name;
    };

    // Retrieve number of timelines available
    this.getTimelinesCount = function(){
        return this.timelines.length;
    };
});
