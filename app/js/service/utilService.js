/*
 * Utility services for most common used operation
 *
 * @author : Sanny Mulyono <smulyono@me.com -- http://smulyono.github.io/>
 */
angservices.service('utilService', function($rootScope){
    /**
     * Taken from http://werxltd.com/wp/2010/05/13/javascript-implementation-of-javas-string-hashcode-method/
     */
    this.constructHashCode = function(originalStr){
        var hash = 0;
        if (originalStr.length == 0) return hash;
        for (i = 0; i < originalStr.length; i++) {
            char = originalStr.charCodeAt(i);
            hash = ((hash<<5)-hash)+char;
            hash = hash & hash; // Convert to 32bit integer
        }
        return hash;
    };

    // To show the Role in the format of Category - Role
    // Because Role can be duplicate, so in the display
    // we added 'Category -' to distinguish them
    this.constructRateCardDisplay = function(ratecardobj){
        if (ratecardobj != undefined &&
            ratecardobj['Category'] != undefined &&
            ratecardobj['Role'] != undefined) {
            return ratecardobj.Category + "-" + ratecardobj.Role;
        } else {
            return "-----";
        }
    };

    // Standard utility to do deep-clone object
    this.clone = function(sourceobject){
        var cloned = {};
        if (sourceobject instanceof Array){
            cloned = [];
        }
        for (i in sourceobject){
            if (sourceobject[i] &&
                typeof sourceobject[i] == "object"){
                cloned[i] = this.clone(sourceobject[i]);
            } else {
                cloned[i] = sourceobject[i];
            }
        }
        return cloned;
    };

    // Utility to show alert modal; used to give any confirmation
    // upon successfull operation
    this.showConfirmation = function (message){
        $rootScope.alertmessage = message;
        $("#alertModal").modal();
    };
});
