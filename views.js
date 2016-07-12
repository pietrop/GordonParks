var MediaShowView = Backbone.View.extend({
  tagName: 'div',
  className: 'container-fluid',

  initialize: function() {

       this.listenTo(this.model, "change", this.render);
  },

  template: _.template($("#mediaShow").html()),

  render: function(){
    var mediaShowTemplate = this.template(this.model.attributes);
    this.$el.html(mediaShowTemplate);
    return this;
  }
});

// //////////////////////////////
var TimelineView = Backbone.View.extend({
  tagName: 'div',
  // className: 'container-fluid',
  // events:{
    // "click .media": "showMedia"
  // },

  // showMedia : function (e){
    // console.log(e.currentTarget.id)
    // location.href = "#/the_route_you_want";
  // },

  initialize: function() {
       this.listenTo(this.model, "change", this.render);
  },
  template: _.template($("#timeline").html()),

  render: function(){
    var timelineTemplate = this.template(this.model.attributes);
    this.$el.html(timelineTemplate);
    return this;
  }

})
