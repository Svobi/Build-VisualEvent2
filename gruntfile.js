module.exports = function(grunt) {
    var buildDir = 'build/';

    var tasks = grunt.option('tasks');
    if (tasks!=undefined&&(tasks.length>0)) {
        var config_webserver_url = 'www.yourserver.com';
        var config_webserver_subdir = '';
    }else{
        var config_webserver_url = grunt.option('webserverUrl');
        var config_webserver_subdir = grunt.option('webserverSubdir');
    }

    if (config_webserver_url==undefined) {
        var error = 'Pls, be sure to set the argument webserverUrl:'+"\n";
        error += 'grunt default --webserverUrl="www.yourwebserverurl.com"'+"\n";
        grunt.fail.warn(error);
    }

    if (config_webserver_subdir==undefined) {
        var subDir = '';
        buildDir = 'build/plain/';
    }else{
        var subDir = config_webserver_subdir;
        subDir = subDir + '/';
        buildDir = buildDir + subDir;
    }

    console.log(config_webserver_url);
    console.log(buildDir);

    grunt.initConfig({
        jsdoc : {
            build : {
                src: ['VisualEvent/js/VisualEvent.js', 'VisualEvent/js/VisualEvent_Loader.js'],
                options: {
                    destination: buildDir+'/doc'
                }
            }
        },
        uglify: {
            buildjs1: {
                src: buildDir+'VisualEvent_Loader.js',
                dest: buildDir+'VisualEvent_Loader.js'
            },
            buildjs2: {
                src: buildDir+'js/VisualEvent-jQuery.js',
                dest: buildDir+'js/VisualEvent-jQuery.min.js'
            },
            buildjs3: {
                src: buildDir+'js/VisualEvent.js',
                dest: buildDir+'js/VisualEvent.min.js'
            }
        },
        concat: {
            options: {
                separator: ';',
            },
            buildjs1: {
                src: ['VisualEvent/js/VisualEvent_Loader.js'],
                dest: buildDir+'VisualEvent_Loader.js'
            },
            buildjs2:{
                src: [
                    'VisualEvent/js/jquery.js',
                    'VisualEvent/js/shCore.js',
                    'VisualEvent/js/VisualEvent.js',
                    'VisualEvent/js/parsers/*.js',
                ],
                dest: buildDir+'js/VisualEvent-jQuery.js'
            },
            buildjs3:{
                src: [
                    'VisualEvent/js/shCore.js',
                    'VisualEvent/js/VisualEvent.js',
                    'VisualEvent/js/parsers/*.js',
                ],
                dest: buildDir+'js/VisualEvent.js'
            },
            buildcss: {
                src:[
                    'VisualEvent/css/VisualEvent.css',
                    'VisualEvent/css/shCore.css',
                ],
                dest: buildDir+'css/VisualEvent.css',
            },
            buildbookmarker: {
                src: ['VisualEvent/bookmarklet.html'],
                dest: buildDir+'bookmarklet.html'
            },
            buildjquery: {
                src: ['VisualEvent/js/jquery.js'],
                dest: buildDir+'js/jquery.js'
            },
        },
        "regex-replace": {
            buildjs: {
                src: [buildDir+'VisualEvent_Loader.js'],
                actions: [
                    {
                        name: '__BUILD_URL__',
                        search: '__BUILD_URL__',
                        replace: subDir,
                        flags: 'g'
                    }
                ]
            },
            buildbookmarker: {
                src: [buildDir+'bookmarklet.html'],
                actions: [
                    {
                        name: 'Website Change',
                        search: '//www.sprymedia.co.uk/VisualEvent/VisualEvent_Loader.js',
                        replace: '//' +config_webserver_url + '/' + subDir + 'VisualEvent_Loader.js',
                        flags: 'g'

                    }
                ]
            }
        },
        clean: {
            build: {
                src: [
                    buildDir
                ]
            }
        }
    });

    grunt.loadNpmTasks('grunt-jsdoc');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-regex-replace');
    grunt.loadNpmTasks('grunt-contrib-clean');

    grunt.registerTask('default', [
        'clean:build',
        'concat:buildjs1',
        'regex-replace:buildjs',
        'concat:buildjs2',
        'concat:buildjs3',
        'concat:buildcss',
        'uglify:buildjs1',
        'uglify:buildjs2',
        'uglify:buildjs3',
        'concat:buildbookmarker',
        'regex-replace:buildbookmarker',
        'jsdoc:build',
        'concat:buildjquery',
    ]);

};
