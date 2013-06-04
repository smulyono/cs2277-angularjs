/*
 * Service to handle all Project resources and View
 *
 * @author : Sanny Mulyono <smulyono@me.com -- http://smulyono.github.io/>
 */
angservices.service('projectService', function(timelineService,resourceService,
                                                 ratecardService, utilService){
    this.matrix = [];

    // Prepare all required resources
    this.refreshProject = function(){
        // update the data sources
        this.maintimelines = timelineService.getTimelines();
        this.mainresource = resourceService.getResources();
        ratecardService.constructMap();
    };

    // Logic to prepare matrix record which will be used to display
    // project view
    this.constructMatrix = function(){
        this.matrix = [];
        // create header first
        for (var krole in this.mainresource){
            var datum = {};
            var tempratecard = ratecardService.getRateCardByIndex(krole);
            // prepare all object property which will be displayed
            datum.role = tempratecard.ratecard_display; // tempratecard.Role;
            datum.roleid = tempratecard.ratecard_index;
            datum.resources = [];
            datum.rate = tempratecard.Rate;
            datum.total_hours = 0;
            // Iterate on each resources - timeline
            for (var array_index in this.mainresource[krole]){
                // will give array index
                var record = this.mainresource[krole][array_index];
                datum.resources.push(record.hours);
                datum.total_hours += Math.round(record.hours);
            }
            if (datum.resources.length < timelineService.getTimelinesCount()){
                // to avoid any empty or mis-visualization on the table
                // must put some empty value for empty resources -- this is
                // usually happens for newly added timeline which have not been
                // assigned to resources
                for (var j=datum.resources.length;j<timelineService.getTimelinesCount();j++){
                    datum.resources.push(0);
                }
            }
            // Re calculate Price
            datum.price = datum.rate * datum.total_hours;

            this.matrix.push(utilService.clone(datum));
        }
        return utilService.clone(this.matrix);
    };

});
