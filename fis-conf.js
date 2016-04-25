fis.set('project.files', '/index.html'); // 按需编译。

// 采用 commonjs 模块化方案。
fis.hook('commonjs', {
	baseUrl: './components',
	extList: ['.js', '.jsx']
});

fis.match('{/{components,demo}/**.js,*.jsx}', {
	// parser: fis.plugin('typescript'),
	parser: fis.plugin('babel-5.x', {
	    sourceMaps: false,
	    optional: ["es7.decorators", "es7.classProperties"]
	}),
	rExt: '.js'
});

// 改用 npm 方案，而不是用 fis-components
fis.unhook('components');
fis.hook('node_modules');

// 设置成是模块化 js
fis.match('/{node_modules,components,demo}/**.{js,jsx}', {
	isMod: true
});

// 编译less
fis.match('*.less', {
  	parser: fis.plugin('less'),
  	rExt: '.css'
});

// js jsx import css  img
fis.match('/{components,demo}/**.{js,jsx}', {
	preprocessor: [
     	fis.plugin('js-require-file'),
     	fis.plugin('js-require-css')
    ]
})
// 合并css
fis.match('*.{less,css}', {
  packTo: '/pkg/baseUI.css'
});

fis.media('qa').match('::package', {
    packager: fis.plugin('map', {
        'pkg/vendor.js': [
            'node_modules/react/react.js',
            'node_modules/react-dom/index.js',
            'node_modules/classnames/index.js'
        ],
        'pkg/baseUI.js': [
            'components/**/*.jsx'
        ]
    })
});

fis.match('::package', {
	// 本项目为纯前段项目，所以用 loader 编译器加载，
	// 如果用后端运行时框架，请不要使用。
	postpackager: fis.plugin('loader', {
		useInlineMap: false
	})
});


// 对 js 做 uglify 压缩。
fis.media('prod').match('*.{js,jsx}', {
	optimizer: fis.plugin('uglify-js')
})
// 压缩css
fis.media('prod').match('*.{css,less}', {
  optimizer: fis.plugin('clean-css')
});

fis.media('prod').match('::package', {
	// 更多用法请参考： https://github.com/fex-team/fis3-packager-deps-pack
	packager: fis.plugin('deps-pack', {
		'pkg/index.js': [
			'/index.jsx',
			'/index.jsx:deps' // 以及其所有依赖
		],
		'pkg/vendor.js': [
            'node_modules/react/react.js',
            'node_modules/react-dom/index.js',
            'node_modules/classnames/index.js'
        ],
        'pkg/baseUI.js': [
            'components/**/*.jsx'
        ]
	})
})
