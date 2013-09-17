window.App = Ember.Application.create();


/** 
    Projects - /
    Projects New - /new
    
    Project - /id/details
    Project Details - /id/details
    Project New Details - /id/details/new
    Project Edit Details - /id/details/id/edit

*/



App.Router.map(function(){

    this.resource( 'projects', { path: '/' }, function() {
        this.route('new');
    });

    this.route( 'project', { path: ':project_id' } );


});

App.ProjectsIndexRoute = Ember.Route.extend({
    model: function() {
        return this.store.find('project');
    }
});

App.ProjectsNewRoute = Ember.Route.extend({
    // If route is dactivated
    deactivate: function() {
        this.doRollback();
    },
    // Perform rollback on project creation
    // if we haven't actually created a project.
    doRollback: function() {
        var project = this.get('currentModel');
        
        if( project && project.get('isDirty') ) {
            project.rollback();
        }

    },
    model: function() {
        return this.store.createRecord('project');
    }
});


App.ProjectRoute = Ember.Route.extend({
   
    model: function(params) {
        
        return this.store.find( 'project', params.project_id );

    }

});

App.ProjectsNewController = Ember.ObjectController.extend({

    actions: {
        addProject: function() {
            
            var project = this.get('model'),
                title = project.get('title'),
                self = this
            ;
            
            if( !title || !title.trim() ) return;

            project.save().then(function( project ){
                self.transitionToRoute('project', project );
            });

        }
    }
});

App.ProjectsController = Ember.ArrayController.extend({
    itemController: 'project'
});

App.ProjectController = Ember.ObjectController.extend({
    
    descriptionEditable: false,
    
    titleEditable: false,
    
    detailEditable: false,

    currentDetail: null,

    updateProperty: function( type ) {

            var project = this.get('model');
            
            if( project.get('isDirty') ) {
                project.save();
            }
            
            this.set( type, false);
    
            return project;
    },

    editDetail: function( detail ) {
        this.set('detailEditable', true)
            .set('currentDetail', detail);
    },
    
    resetDetailEdit: function() {
        this.set('currentDetail', null)
            .set('detailEditable', false );
    },

    hasDetails: function() {
        var details = this.get('model').get('details');

        return details ? details.get('length') > 0 : false;
    
    }.property('model.details.length'),


    projectHours: function() {

        return this.get('details').getEach('detailHours').reduce(function(accum, hour) {

            return accum + hour;

        }, 0);


    }.property('details.@each.detailHours'),

    actions: {
        

        editTitle: function() {
            this.set( 'titleEditable', true );
        },

        saveTitle: function() {
            return this.updateProperty( 'titleEditable' );
        },

        editDescription: function() {
            this.set( 'descriptionEditable', true );
        },

        saveDescription: function() {

            return this.updateProperty( 'descriptionEditable' );

        },

        addDetail: function() {

            var title = this.get('detailTitle'),
                project = this.get('model'),
                detail
            ;


            if( !title || !title.trim() ) return;

            this.set('detailTitle', '' );

            detail = this.store.createRecord('detail', { 'title': title, 'project': project } );

            detail.save().then(function(detail) {
                project.get('details').pushObject( detail );
                project.save();
            });

            
        }

    }
});

App.DetailEditController = Ember.ObjectController.extend({
    
    needs: ['project'],

    content: function() {
        
        return this.get('controllers.project').get('currentDetail');

    }.property('controllers.project.currentDetail'),

    actions: {

        updateDetail : function() {

            var detail = this.get('model'),
                title = detail.get( 'title' ),
                self = this,
                _items = [],
                detailItems
            ;

            function detailUpdated() {
                self.get('controllers.project').resetDetailEdit();
            }

            detail.get('detailItems').forEach(function(item){
                if( item.get('isDirty') ) {
                    _items.push(item.set('detail', detail));
                }
            });

            _items.invoke('save');

            if( detail.get('isDirty' ) ) {
                
                if( !title || !title.trim() ) return;

                detail.save().then(detailUpdated);

                return;
            }


            detailUpdated();
        },

        deleteDetail: function() {

            var detail = this.get('model'),
                project = detail.get('project'),
                projectController = this.get('controllers.project')
            ;
            
            detail.deleteRecord();

            detail.save().then(function(){
                projectController.resetDetailEdit();    
            });
            
            
            
        },

        addSubItem: function() {
            
            var detail = this.get('model'),
                title = this.get('subTitle'),
                self = this,
                subItem
            ;
            
            if( !title || !title.trim() ) return;

            subItem = this.store.createRecord( 'detailItem', { 'title': title, 'detail': detail } );

            this.set('subTitle','');

            subItem.save().then(function(detailItem) {
                detail.get('detailItems').pushObject(detailItem);
                detail.save();
            });

        }
    }

});


App.DetailController = Ember.ObjectController.extend({

    needs: ['project'],

    actions: {

        editDetail: function() {
            
            var pCont = this.get('controllers.project'),
                currDetail = pCont.get('currentDetail')
            ;

            if( currDetail && currDetail.get('isDirty') ) { 
                
                if( confirm( 'You made some changes to this detail, are you sure you want to edit another one?' ) ) {
                    
                    currDetail.rollback();
                
                } else {
                
                    return;
                
                }
                
            }
               
            this.get('controllers.project').editDetail(this.get('model'));
            

        }

    }
});


App.DetailItemController = Ember.ObjectController.extend({



});

