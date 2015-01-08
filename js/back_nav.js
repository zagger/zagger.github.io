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
			title: 'Sample1',
			link: '#sample1'
		},
		{
			title: 'Sample2',
			link: '#sample2'
		},
		{
			title: 'Sample3',
			link: '#sample3'
		},
		{
			title: 'Sample4',
			link: '#sample4'
		}
	]);

	var navListsView = new NavListsView({collection: navLists});

	$('header').after(navListsView.render().el);

	function p(v) {
		console.log(v);
	}

	var Router = Backbone.Router.extend({
		routes: {
			'main': 'showMain',
			'sample1': 'showSample1',//route: method
			'sample2': 'showSample2',
			'sample3': 'showSample3',
			'sample4': 'showSample4'
		},
		showMain: function() {
			$('article').html('main');
		},
		showSample1: function() {
			$('article').html('sample1');
		},
		showSample2: function() {
			$('article').html('sample2');
		},
		showSample3: function() {
			$('article').html('sample3');
		},
		showSample4: function() {
			$('article').html('sample4');
		}
	});
	var router = new Router();
	Backbone.history.start();
	//Backbone.history.start({pushState: true});
});
