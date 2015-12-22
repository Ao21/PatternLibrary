
module.exports = {
    dev: {
        // Files to be included in the `index.html`.
        includes: [
            'dist/lib/systemjs/dist/system.js',
            'dist/lib/rxjs/bundles/Rx.js',
            'dist/lib/angular2/bundles/angular2-polyfills.js',
            'dist/lib/angular2/bundles/angular2.dev.js',
            'dist/lib/angular2/bundles/router.dev.js',
            'dist/lib/angular2/bundles/http.dev.js',
            'dist/lib/angular2/bundles/testing.dev.js',

            'dist/lib/lodash/index.js',
            'dist/lib/postal/lib/postal.js',
            'dist/lib/interact.js/dist/interact.js',
            'dist/css/app.css',

        ],

        // Files to be processed by Gulp.
        libs: {
            bower: ['bower_components/baobab/build/baobab.js'],
            
            js: [

                'node_modules/systemjs/dist/system.js',
                'node_modules/systemjs-plugin-text/text.js',
                'node_modules/rxjs/bundles/Rx.js',
                'node_modules/angular2/bundles/angular2-polyfills.js',
                'node_modules/angular2/bundles/angular2.dev.js',
                'node_modules/angular2/bundles/router.dev.js',
                'node_modules/angular2/bundles/http.*',
                'node_modules/angular2/bundles/testing.*',

                'node_modules/lodash/**/*',
                'node_modules/postal/**',
                'node_modules/quill/**',
                'node_modules/interact.js/**',
                'node_modules/highlight.js/**',
            ],
            scss: [
                'src/app/**/*.scss'
            ]
        },
        dist: {
            root: 'dist',
            public: 'dist/public',
            test: 'dist/test'
        }
    },

    prod: {
        // Files to be included in the `index.html`.
        includes: [
            'build/lib/*',
            'build/css/*'
        ],

        // Files to be processed by Gulp.
        libs: {
            js: [
                'node_modules/systemjs/dist/system.js',
                'node_modules/rxjs/bundles/Rx.min.js',
                'node_modules/angular2/bundles/angular2-polyfills.min.js',
                'node_modules/angular2/bundles/angular2.min.js',
                'node_modules/angular2/bundles/router.min.js'
            ]
        }
    }
};