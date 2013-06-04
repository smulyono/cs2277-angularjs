/*
 * Service to handle all Resource data model and View
 *
 * @author : Sanny Mulyono <smulyono@me.com -- http://smulyono.github.io/>
 */
angservices.service('resourceService',
    function($rootScope, $http, timelineService, utilService){
        this.resource = [];

        // mass update of resource hours
        this.massUpdateResourceHour = function(obj, newvalue){
            for (var i=0;i<obj.length; i++){
                obj[i].hours = newvalue;
            }
        };

        // create empty / new resource based on selected role
        this.getEmptyResource = function(roleindex){
            var tempdata = [];
            var timelines = timelineService.getTimelines();
            for (var i=0;i<timelines.length;i++){
                // Standard value for empty resource
                tempdata.push({
                    role_idx : roleindex,
                    timeline_idx : i,
                    timeline_str : timelineService.getTimelinesPresentationByIndex(i),
                    hours : 40
                });
            }
            return utilService.clone(tempdata);
        };

        // Revalidate the resources, to remove or update resources
        // based on any data changes which occur in timeline
        this.refreshResource = function(roleindex){
            var tobj = this.resource[roleindex];
            // update all timeline information
            for (var i=0;i<timelineService.getTimelinesCount();i++){
                // do update
                if (i < tobj.length){
                    // everything can be safely copied
                    tobj[i].timeline_str = timelineService.getTimelinesPresentationByIndex(i);
                } else {
                    // do insert of new timeline
                    tobj.push({
                        role_idx : roleindex,
                        timeline_idx : i,
                        timeline_str : timelineService.getTimelinesPresentationByIndex(i),
                        hours : 0
                    });
                }
            }
            // If timeline is shorter means there are some old data needs to be removed
            if (tobj.length > timelineService.getTimelinesCount()){
                tobj = tobj.splice(0,timelineService.getTimelinesCount() - 1);
            }
        }

        // retrieve resources based on index of the role
        this.getResource = function(roleindex){
            var tempdata = [];
            if (this.resource[roleindex] != undefined){
                this.refreshResource(roleindex);
                return utilService.clone(this.resource[roleindex]);
            }
            return this.getEmptyResource(roleindex);
        };

        // return all resources
        this.getResources = function(){
            return utilService.clone(this.resource);
        };

        // set / add new resource record
        this.setResource = function(key, newresource){
            // must do update / insert, to ensure no duplicate
            // by removing the old
            this.resource["" + key] = [];
            this.resource["" + key] = utilService.clone(newresource);
            $rootScope.$broadcast("data changed");
        };
    }
);
