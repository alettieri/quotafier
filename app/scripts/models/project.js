App.Project = DS.Model.extend({
    title: DS.attr( 'string' ),
    description: DS.attr( 'string' ),
    details: DS.hasMany('detail', {async:true})
});

