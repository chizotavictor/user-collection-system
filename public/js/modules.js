var required = '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>',

ImageModel = Ext.define('ImageModel', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'name'},
        {name: 'image'},
        {name: 'systemCode'},
        {name:'id'}
    ]
});

var system_mod_store = Ext.create('Ext.data.Store', {
    model: 'ImageModel',
    proxy: {
        type: 'ajax',
        url: '/auth/web/loadUserAssignedModules',
        reader: {
            type: 'json',
            root: 'menus'
        }
    }
});

var subModules =  [
  'DIRMGR-ADDSUB'
];



function checkforSubmodule(systemCode){
    var flag = false;
    for (let index = 0; index < subModules.length; index++) {
        if(systemCode == subModules[index]){
            flag = true;
        }
    }
    return flag;
}

function openMenu(e) {
    console.log(e);
}

function loadSub(systemCode, systemName){
    if (systemCode == "BACKWARD") {
        localStorage.setItem('selectedModule', "");
        system_mod_store.proxy.extraParams = { module: "" };
        system_mod_store.load();
    }else{

        if(checkforSubmodule(systemCode)){
            addTab(systemName, systemCode);
        }else{
            system_mod_store.proxy.extraParams = { module: systemCode + "" };
            system_mod_store.load();
        }
    }
}


var menuItemsTabs = Ext.widget('tabpanel', {
    resizeTabs: true,
    activeTab: 0,
    enableTabScroll: true,
    items:[{
        title: 'Management Console',
        iconCls: 'tabs',
        id: 'welcomeTab',
        //closable: true,
        items: Ext.create('Ext.view.View', {
            store: system_mod_store,
            autoScroll: true,
            scrollable: 'vertical',
            //renderTo: 'dataview-example',
            tpl: [
                '<tpl for=".">',
                    '<div class="thumb-wrap thumb" id="{name:stripTags}" style="margin-top:10px;margin-left:10px;width:200px; height:200px;float:left">',
                        '<center><img src="/images/{image}"  style="padding:20px;width:160px; height:160px" title="{name:htmlEncode}"></center>',
                        '<center><span class="x-editable" style="font-size:17px;font-style:normal;font-family:Tahoma, Verdana, Segoe, sans-serif; font-size:13px; text-align:center;">{name:htmlEncode}</span></center>',
                    '</div>',
                '</tpl>',
                '<div class="x-clear"></div>'
            ],
            // multiSelect: true,
            height: 500,
            // trackOver: true,
            viewConfig: {
                emptyText: 'No records to show'
            },
            overItemCls: 'x-item-over',
            itemSelector: 'div.thumb-wrap',
            emptyText:  "<p class='font-weight:bold'>Please try to contact our support team.</p>",

            listeners: {
                itemclick: function(e,f) {
                    loadSub(f.raw.systemCode, f.raw.name);
                },
                selectionchange: function(dv, nodes ){
                    var l = nodes.length,
                        s = l !== 1 ? 's' : '';
                    //this.up('panel').setTitle('Simple DataView (' + l + ' item' + s + ' selected)');
                    //addTab(true);
                }
            }
        })
    }],
    plugins: Ext.create('Ext.ux.TabCloseMenu', {})
});

var currentItem;


// tab generation code
var index = 0;

function doScroll(item) {
    var id = item.id.replace('_menu', ''),
        tab = menuItemsTabs.getComponent(id).tab;

    menuItemsTabs.getTabBar().layout.overflowHandler.scrollToItem(tab);
}

function addTab(name, systemCode) {

    if(subModules.includes(systemCode))
    {
        console.log(subModules[0], systemCode);
        // opening new window
        switch (systemCode) {
            case subModules[0]:
                // openWindow(subModules[0]);
                addSubscriberWindow();
            default:
                break;
        }
    }else{
        if(pullMenu(name, systemCode) == null)
        {
            alert('Menu not set' + systemCode);
        }else{
            menuItemsTabs.add(pullMenu(name, systemCode)).show();
        }
        //console.log(o);
    }
}


function HideAction(item) {
    var id = item.id.replace('_menu', '');

    if(id === "welcomeTab")
    {
        menuItemsTabs.setActiveTab('welcomeTab');
    }else{
        menuItemsTabs.child('#'+id).tab.hide();
        menuItemsTabs.setActiveTab('welcomeTab');
    }
}

function removeFromMenu(ct, tab) {
    var id = tab.id + '_menu';
    menu_hide.remove(id);
}

function addToMenu(ct, tab) {

    menu_hide.add({
        text: tab.title,
        id: tab.id + '_menu',
        handler: HideAction
    });
}

menuItemsTabs.on({
    add: addToMenu,
    remove: removeFromMenu
});

var menu = new Ext.menu.Menu();
    var menu_hide = new Ext.menu.Menu();
    menuItemsTabs.items.each(function(tab){
        addToMenu(menuItemsTabs, tab);
        //addMenu(tabs, tab);
    });

system_mod_store.load();
