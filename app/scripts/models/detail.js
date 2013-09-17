App.Detail = DS.Model.extend({
    title: DS.attr( 'string' ),
    description: DS.attr( 'string' ),
    project: DS.belongsTo('project'),
    detailItems: DS.hasMany('detailItem', { 
        async: true
    }),
    
    detailHours: function(){
        
        return this.get('detailItems').getEach('hours').reduce(function(accum,hour){
            return parseInt(accum, 10) + parseInt(hour, 10);
        }, 0 );

    }.property('detailItems.@each.hours')

});

