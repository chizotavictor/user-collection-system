<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        
        <meta name="csrf-token" content="{{ csrf_token() }}" />

        <title>ID Colllection System Console</title>
        
        <link rel="dns-prefetch" href="https://fonts.gstatic.com">
        <link href="https://fonts.googleapis.com/css?family=Nunito" rel="stylesheet" type="text/css">
        <link rel="stylesheet" type="text/css" href="/theme/examples/shared/example.css" />
        <link rel="stylesheet" type="text/css" href="/theme/examples/tabs/tabs-adv.css">
        <link rel="stylesheet" type="text/css" href="/theme/examples/menu/menus.css">
        <style>
            
            #images-view .x-panel-body{
                background: white;
                font: 11px Arial, Helvetica, sans-serif;
            }
            #images-view .thumb{
                background: #dddddd;
                padding: 3px;
                padding-bottom: 0;
            }

            .x-quirks #images-view .thumb {
                padding-bottom: 3px;
            }

            #images-view .thumb img{
                height: 60px;
                width: 80px;
            }
            #images-view .thumb-wrap{
                float: left;
                margin: 4px;
                margin-right: 0;
                padding: 5px;
            }
            #images-view .thumb-wrap span {
                
                display: block;
                overflow: hidden;
                text-align: center;
                width: 86px; /* for ie to ensure that the text is centered */
            }

            #images-view .x-item-over{
                border:1px solid #dddddd;
                background: #efefef url('/theme/examples/view/over.gif') repeat-x left top;
                padding: 4px;
            }

            #images-view .x-item-selected{
                background: #eff5fb url('/theme/examples/view/selected.gif') no-repeat right bottom;
                border:1px solid #99bbe8;
                padding: 4px;
            }
            #images-view .x-item-selected .thumb{
                background:transparent;
            }

            #images-view .loading-indicator {
                font-size:11px;
                background-image:url('/theme/examples/resources/themes/images/default/grid/loading.gif');
                background-repeat: no-repeat;
                background-position: left;
                padding-left:20px;
                margin:10px;
            }

            .thumb-wrap:hover{
                /*
                zoom:1;
                background-color:#c3daf9;
                border-color:#3399bb;
                */
                filter:alpha(opacity=50);
                border: 1px solid #AAA;
                background-color:#dddddd;
                cursor: pointer;
            }

            .x-view-selector {
                position:absolute;
                left:0;
                top:0;
                width:0;
                border:1px dotted;
                opacity: .5;
                -moz-opacity: .5;
                filter:alpha(opacity=50);
                zoom:1;
                background-color:#c3daf9;
                border-color:#3399bb;
            }
            .ext-strict .ext-ie .x-tree .x-panel-bwrap{
                position:relative;
                overflow:hidden;
            }
        </style>

        <!-- <script src="/theme/examples/view/data-view.js"></script> -->
        <script type="text/javascript" src="{{ asset('theme/examples/shared/include-ext.js') }}"></script>
        <script type="text/javascript" src="{{ asset('theme/examples/shared/options-toolbar.js') }}"></script>
        <script src="https://code.jquery.com/jquery-3.3.1.js" integrity="sha256-2Kok7MbOyxpgUVvAk/HJ2jigOSYS2auK4Pfzbm7uH60=" crossorigin="anonymous"></script>
    
        <script charset="utf-8">
            Ext.Loader.setConfig({enabled: true});

            Ext.Loader.setPath('Ext.ux', 'theme/examples/ux');

            Ext.require([
                '*',
                'Ext.tip.QuickTipManager',
                'Ext.container.Viewport',
                'Ext.layout.*',
                'Ext.form.Panel',
                'Ext.form.Label',
                'Ext.grid.*',
                'Ext.data.*',
                'Ext.tree.*',
                'Ext.selection.*',
                'Ext.tab.Panel',
                'Ext.ux.layout.Center',
                'Ext.util.*',
                'Ext.ux.DataView.DragSelector',
                'Ext.ux.DataView.LabelEditor',
                'Ext.ux.DataTip',
                'Ext.ux.grid.FiltersFeature',
                'Ext.toolbar.Paging',
                'Ext.ux.ajax.JsonSimlet',
                'Ext.ux.ajax.SimManager',
                'Ext.ux.ProgressBarPager',
                'Ext.selection.CellModel',
            ]);

            Ext.onReady(function(){

                Ext.tip.QuickTipManager.init();
                Ext.state.Manager.setProvider(Ext.create('Ext.state.CookieProvider'));

                // This is an inner body element within the Details panel created to provide a "slide in" effect
                // on the panel body without affecting the body's box itself.  This element is created on
                // initial use and cached in this var for subsequent access.
                var detailEl;

                // Gets all layouts examples
                var layoutExamples = [];


                // This is the main content center region that will contain each example layout panel.
                // It will be implemented as a CardLayout since it will contain multiple panels with
                // only one being visible at any given time.

                var contentPanel = {
                    id: 'content-panel',
                    region: 'center', // this is what makes this panel into a region within the containing layout
                    layout: 'card',
                    margins: '2 5 5 5',
                    activeItem: 0,
                    border: false,
                    items: menuItemsTabs,
                };

                //  Menu Api Call
                var store = Ext.create('Ext.data.TreeStore', {
                    root: {
                        expanded: true
                    },
                    proxy: {
                        type: 'ajax',
                        //url: '/fake-data/modules.json'
                        url: '/auth/web/loadUserAssignedModules'
                    }
                });

    

                // This is the Details panel that contains the description for each example layout.
                var detailsPanel = {
                    id: 'details-panel',
                    title: 'Module Information',
                    region: 'center',
                    bodyStyle: 'padding:10px;background:#eee;',
                    autoScroll: true,
                    html: '<p class="details-info">Selected menu description goes here.</p>'
                };


                function logoutAction(){
                    Ext.MessageBox.confirm('Logout', 'Do you want to logout?', function(btn){
                        if(btn === 'yes'){
                            
                        }
                        else{
                        //some code
                        }
                    });
                }


                // Finally, build the main layout once all the pieces are ready.  This is also a good
                // example of putting together a full-screen BorderLayout within a Viewport.
                Ext.create('Ext.Viewport', {
                    layout: 'border',
                    // title: 'Ext Layout Browser',
                    items: [
                        {
                        xtype: 'box',
                        id: 'header',
                        region: 'north',
                        html: "<h3 style='font-size:20px;margin-top:10px;margin-left:20px;color:white'>Health Direct Collection System - GHANA (GH)</h3>",
                        height: 40,
                        },
                        {
                            region: 'north',
                            xtype: 'toolbar',
                            height: 40,
                            defaults:{
                                margins:'0 5 0 0',
                                //pressed: false,
                                //toggleGroup:'btns',
                                //allowDepress: false
                            },
                            items: [{
                                xtype:'button',
                                text: 'User: ' + " {{Auth::user()->name}} ",
                                iconCls: 'users',
                                handler: function(){      
                                }
                            },'-',{
                                xtype:'button',
                                text: 'Sign out',
                                iconCls: 'logout',
                                handler: function(){
                                    logoutAction();
                                }
                            }]
                        },
                        contentPanel
                    ],
                    renderTo: Ext.getBody()
                });

            });

        </script>
        <script>var required = '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>';</script>
        <script src="{{ asset('js/modules.js') }}"></script>
        <script src="{{ asset('js/directory-manager.js') }}"></script>
    </head>

    <body>
    </body>
</html>