
App.Detail = DS.Model.extend({
    title: DS.attr( 'string' ),
    description: DS.attr( 'string' ),
    project: DS.belongsTo('project'),
    detailItems: DS.hasMany('detailItem', { async: true })
});

