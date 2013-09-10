App.DetailItem = DS.Model.extend({
    title: DS.attr( 'string' ),
    notes: DS.attr( 'string' ),
    hours: DS.attr( 'number', { defaultValue: 0 }),
    detail: DS.belongsTo('detail')
});

