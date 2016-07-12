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
  className: 'container-fluid',
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







// var OneMediaForIndexView = Backbone.View.extend({
//   tagName: 'div',
//   className: 'mediaCard',
//   id: "media-n",//+this.model.id+"",
//   initialize: function() {
//       //connect to changes in the model to update the view
//        this.listenTo(this.model, "change", this.render);
//      },
//   events:{
//   //  "click span.words": "showOne",
//    //click media opens up show page
//  },
//
//  function showOne(){
//    //calls on router to move to one item.
//    //use navigate?
//  },
//
//   template: _.template($('#OneMediaForIndexView').html()),
//   render: function(){
//     var mediaShowTemplate = this.template(this.model.attributes);
//     this.$el.html(mediaShowTemplate);
//     return this;
//   }
//
// });
//
// /////////////////////////////////
// var MediaIndex = Backbone.View.extend({
//
//
// });
