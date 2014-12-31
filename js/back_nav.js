$(function (){
	var NavList = Backbone.Model.extend({
		defaults: {
			title: 'no title'
		}
	});
	var NavLists = Backbone.Collection.extend({
		model: NavList
	});

	var NavListView = Backbone.View.extend({
		tagName: 'div',
		className: 'nav-list',
		template: _.template( $('#nav-template').html() ),
		render: function() {
			var template = this.template(this.model.toJSON());
			this.$el.html(template);
			return this;
		}
	});
	var NavListsView = Backbone.View.extend({
		tagName: 'nav',
		render: function() {
			this.collection.each(function(list) {
				var navListView = new NavListView({model: list});
				this.$el.append(navListView.render().el);
			}, this);
			return this;
		}
	});

	var navLists = new NavLists([
		{
			title: 'Objective',
			link: '#objective'
		},
		{
			title: 'Activity',
			link: '#activity'
		},
		{
			title: 'Groups',
			link: '#groups'
		},
		{
			title: 'About',
			link: '#about'
		}
	]);

	var navListsView = new NavListsView({collection: navLists});

	$('header').after(navListsView.render().el);

	function p(v) {
		console.log(v);
	}

	var Router = Backbone.Router.extend({
		routes: {
			'objective': 'showObjective',//route: method
			'activity': 'showActivity',
			'groups': 'showGroups',
			'about': 'showAbout'
		},
		showObjective: function() {
			$('article').html('objective');
		},
		showActivity: function() {
			$('article').html('activity');
		},
		showGroups: function() {
			$('article').html('groups');
		},
		showAbout: function() {
			$('article').html('about');
		}
	});
	var router = new Router();
	Backbone.history.start();
	//Backbone.history.start({pushState: true});
});
