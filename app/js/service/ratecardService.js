/*
 * Service to handle all RateCard resources and View
 *
 * @author : Sanny Mulyono <smulyono@me.com -- http://smulyono.github.io/>
 */
angservices.service('ratecardService', function($rootScope, $http, $q, utilService){
    this.ratecard = [];
    // will be used during the project view mapping
    // need to make the searching / query faster than loop
    // only populated when constructMap() function is called
    this.map_ratecard = [];

    // Setter for ratecard resources
    this.setRateCard = function(newobj){
        if (newobj != "undefined"){
            this.ratecard = utilService.clone(newobj);
            $rootScope.$broadcast("data changed");
            utilService.showConfirmation('Rate Card Information Saved Successfully!');
        }
    };

    // will be used to initialize the data from ratecard.json
    this.resolveRateCard = function(deferq){
        // only do async if the ratecard is still empty
        if (this.ratecard.length == 0){
            var parentobj = this;
            $http.get('ratecard.json').success(function(data){
                parentobj.ratecard = data;
                for (var i=0;i<data.length;i++) {
                    parentobj.calculateField(data,i);
                }
                $rootScope.$broadcast("data changed");
                deferq.resolve();
            });
        } else {
            deferq.resolve();
        }
    };

    // Calculate all calculated field needed in ratecard resources
    this.calculateField = function(obj, index){
        if (obj[index] != "undefined") {
            var tdata = obj[index];
            tdata['ratecard_display'] = utilService.constructRateCardDisplay(tdata);
            // additional hash key to avoid any duplicate index
            tdata['ratecard_index'] = utilService.constructHashCode(index + tdata['Code']);
            tdata['rate_card_margin'] = Math.round(1 - (tdata['Resource Cost'] / tdata['Rate Card']));
            tdata['rate_margin'] = Math.round(1 - (tdata['Resource Cost'] / tdata.Rate));
            tdata['rate_check'] = (tdata.Rate - tdata.Floor);
            if (tdata['rate_check'] > 0) {
                tdata['rate_check_style'] = "success";
            } else if (tdata['rate_check'] == 0){
                tdata['rate_check_style'] = "warning";
            } else {
                tdata['rate_check_style'] = "error";
            }
        }
    };

    // Retrieve all available ratecard
    this.getRateCard = function(){
        return utilService.clone(this.ratecard);
    };

    // To handle faster query / retrieval, instead of iterating / looping through
    // the object; Map representation is used
    this.constructMap = function(){
        this.map_ratecard = {};
        for (var i=0;i<this.ratecard.length;i++){
            this.map_ratecard["" + this.ratecard[i].ratecard_index] = this.ratecard[i];
        }
    };

    // retrieve ratecard based on the indexkey, this is used
    // to retrieve individual ratecard
    this.getRateCardByIndex = function(indexkey){
        return utilService.clone(this.map_ratecard[indexkey]);
    };
});
