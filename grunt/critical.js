module.exports = {
	dist: {
		options: {
			base: './',
			pathPrefix: ""
		},
		files: [
			{src: ['index.html'], dest: 'index-critical.html'}
		]
	}
};