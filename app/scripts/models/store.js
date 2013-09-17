App.FixSerializer = DS.JSONSerializer.extend({
    
    primaryKey: 'id',
    
    serializeHasMany: function(record, json, relationship) {
        
        var key = relationship.key;

        var relationshipType = DS.RelationshipChange.determineRelationshipType(record.constructor, relationship);
        
        if (relationshipType === 'manyToNone' || relationshipType === 'manyToMany' || relationshipType === 'manyToOne') {
          
          json[key] = record.get(key).mapBy('id');
          // TODO support for polymorphic manyToNone and manyToMany relationships
        }
    }
});


// App.ApplicationAdapter = DS.FixtureAdapter.extend({
//     defaultSerializer : 'App/Fix'
// });

App.ApplicationAdapter = DS.LSAdapter.extend({
    namespace: 'q',
    defaultSerializer: 'App/Fix'
});