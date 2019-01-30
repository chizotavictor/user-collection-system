function addSubscriberWindow() {
    var win = Ext.create('widget.window', {
        title: 'Add Subcriber',
        header: {
            titlePosition: 2,
            titleAlign: 'center'
        },
        closable: true,
        closeAction: 'show',
        resizable: true,
        maximizable: true,
        width: window.innerWidth - 500,
        minWidth: 500,
        height: window.innerHeight - 100,
        // tools: [{type: 'pin'}],
        layout: {
            type: 'border',
            padding: 5
        },
        items: [{
            region: 'west',
            title: 'Subcriber List',
            width: 500,
            split: true,
            collapsible: true,
            floatable: false,
            tbar: [
                {
                    xtype: 'textfield',
                    emptyText: 'Enter subscriber code'
                }
            ],
            items:  Ext.create('Ext.grid.Panel', {
                // store: store,
                columns: [
                    {text: "Subcriber Code", flex: 1, dataIndex: 'Author'}
                ]
            })
        }, {
            region: 'center',
            xtype: 'tabpanel',
            items: [{
                // LTR even when example is RTL so that the code can be read
                rtl: false,
                title: 'Subscriber Information',
                // padding: 10,
                autoScroll: true,
                items: [Ext.widget({
                    xtype: 'form',
                    // id: 'sub_info',
                    // height: 500,
                    padding: 10,
                    fieldDefaults: {
                        msgTarget: 'side',
                        labelWidth: 150,
                        width: 500
                    },
                    plugins: {
                        ptype: 'datatip'
                    },
                    defaultType: 'textfield',
                    items: [{
                        xtype: 'image',
                        name: 'photo',
                        fieldLabel: 'Subcriber Image',
                        src: 'data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDU4IDU4IiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1OCA1ODsiIHhtbDpzcGFjZT0icHJlc2VydmUiIHdpZHRoPSI1MTJweCIgaGVpZ2h0PSI1MTJweCI+CjxwYXRoIHN0eWxlPSJmaWxsOiM3MzgzQkY7IiBkPSJNNTMuNTY2LDQ1LjI4M2wtOS41NTItNC43NzZDNDIuNzgsMzkuODksNDIsMzguNjI4LDQyLDM3LjI0OFYzMy41ICBjMC4yNjgtMC4zMDUsMC41NzYtMC42OTgsMC45MDQtMS4xNjJjMS4zMDItMS44MzgsMi4yODYtMy44NjEsMi45NjktNS45ODRDNDcuMDk4LDI1Ljk3Nyw0OCwyNC44NDUsNDgsMjMuNXYtNCAgYzAtMC44OC0wLjM5MS0xLjY2Ny0xLTIuMjE3VjExLjVjMCwwLDEuMTg3LTktMTEtOWMtMTIuMTg4LDAtMTEsOS0xMSw5djUuNzgzYy0wLjYwOSwwLjU1LTEsMS4zMzctMSwyLjIxN3Y0ICBjMCwxLjA1NCwwLjU1NCwxLjk4MSwxLjM4MywyLjUxN0MyNi4zODIsMzAuMzY5LDI5LDMzLjUsMjksMzMuNXYzLjY1NWMwLDEuMzMzLTAuNzI4LDIuNTYtMS44OTksMy4xOThMMTguMTgsNDUuMjIgIEMxNS42MDMsNDYuNjI1LDE0LDQ5LjMyNiwxNCw1Mi4yNjFWNTUuNWg0NHYtMy4wNDNDNTgsNDkuNDE5LDU2LjI4Myw0Ni42NDIsNTMuNTY2LDQ1LjI4M3oiLz4KPHBhdGggc3R5bGU9ImZpbGw6IzU1NjA4MDsiIGQ9Ik0xOC4xOCw0NS4yMmw1Ljk0Ni0zLjI0M2MtMC4wMzQtMC4wMzMtMC4wMDUtMC4wNDMsMC4wNjUtMC4wMzZsMi45MS0xLjU4NyAgQzI4LjI3MiwzOS43MTUsMjksMzguNDg5LDI5LDM3LjE1NVYzMy41YzAsMC0xLjA2Mi0xLjI3NS0yLjA5Mi0zLjMyM2gwYzAtMC4wMDEtMC4wMDEtMC4wMDItMC4wMDEtMC4wMDMgIGMtMC4xMzUtMC4yNjgtMC4yNjgtMC41NTEtMC4zOTktMC44NDRjLTAuMDE4LTAuMDQxLTAuMDM2LTAuMDgtMC4wNTQtMC4xMjFjLTAuMTMzLTAuMzAzLTAuMjYzLTAuNjE2LTAuMzg2LTAuOTQ0ICBjLTAuMDA4LTAuMDIxLTAuMDE1LTAuMDQ0LTAuMDIzLTAuMDY1Yy0wLjEwOC0wLjI5LTAuMjA5LTAuNTg5LTAuMzA2LTAuODk2Yy0wLjAyNi0wLjA4NC0wLjA1Mi0wLjE2Ny0wLjA3Ny0wLjI1MSAgYy0wLjEwMS0wLjMzOC0wLjE5Ni0wLjY4Mi0wLjI3OC0xLjAzOEMyNC41NTQsMjUuNDgxLDI0LDI0LjU1NCwyNCwyMy41di00YzAtMC44OCwwLjM5MS0xLjY2NywxLTIuMjE3di01LjY0OCAgQzIzLjU4NywxMC41MzksMjEuMzk3LDkuNSwxOCw5LjVjLTkuNTYzLDAtMTAsOC0xMCw4djQuOTk1Yy0wLjUyNiwwLjQ3NS0xLDEuMTU0LTEsMS45MTR2My40NTVjMCwwLjkxMSwwLjQ3OSwxLjcxMSwxLjE5NCwyLjE3NCAgYzAuODYzLDMuNzU4LDMuNzYsNi40NjMsMy43Niw2LjQ2M3YzLjE1N2MwLDEuMTUxLTAuNjI5LDIuMjExLTEuNjQsMi43NjJMMy42MSw0Ni42MjJDMS4zODUsNDcuODM2LDAsNTAuMTY4LDAsNTIuNzAzVjU1LjVoMTQgIHYtMy4yMzlDMTQsNDkuMzI2LDE1LjYwMyw0Ni42MjUsMTguMTgsNDUuMjJ6Ii8+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+Cjwvc3ZnPgo=',
                        width: 100,
                        height: 100
                    },{
                        fieldLabel: 'Subcriber Code',
                        afterLabelTextTpl: required,
                        name: 'sub_code',
                        allowBlank: true,
                        disabled: true
                        // tooltip: 'Enter your last name'
                    },{
                        xtype: 'fileuploadfield',
                        // id: 'filedata',
                        emptyText: 'Select image ....',
                        fieldLabel: 'Subscriber Image',
                        buttonText: 'Browse',
                        allowBlank: false
                    },{
                        fieldLabel: 'First Name',
                        afterLabelTextTpl: required,
                        name: 'first_name',
                        allowBlank: false,
                        tooltip: 'Enter your first name'
                    },{
                        fieldLabel: 'Middle Name',
                        // afterLabelTextTpl: required,
                        name: 'middle_name',
                        allowBlank: false,
                        tooltip: 'Enter your middle name'
                    },{
                        fieldLabel: 'Last Name',
                        afterLabelTextTpl: required,
                        name: 'last_name',
                        allowBlank: false,
                        tooltip: 'Enter your last name'
                    },{
                        fieldLabel: 'Email address',
                        // afterLabelTextTpl: required,
                        name: 'email_address',
                        allowBlank: true,
                        vtype: 'email',
                        tooltip: 'Enter your email address'
                    },{
                        fieldLabel: 'Phone number',
                        afterLabelTextTpl: required,
                        name: 'phone_number',
                        allowBlank: false,
                        tooltip: 'Enter your phone number'
                    },{
                        fieldLabel: 'Date of Birth',
                        afterLabelTextTpl: required,
                        name: 'date_of_birth',
                        allowBlank: false,
                        xtype: 'datefield',
                        tooltip: 'Enter your date of birth'
                    },{
                        fieldLabel: 'Gender',
                        afterLabelTextTpl: required,
                        name: 'gender',
                        allowBlank: false,
                        xtype: 'combo',
                        tooltip: 'Selet your gender'
                    },{
                        fieldLabel: 'Marital Status',
                        afterLabelTextTpl: required,
                        name: 'martial_status',
                        allowBlank: false,
                        xtype: 'combo',
                        tooltip: 'Selet your martial status'
                    },{
                        fieldLabel: 'Disabled',
                        afterLabelTextTpl: required,
                        name: 'disabled',
                        allowBlank: false,
                        xtype: 'combo',
                        tooltip: 'Select if disabled'
                    },{
                        fieldLabel: 'Disability',
                        // afterLabelTextTpl: required,
                        name: 'disabled',
                        allowBlank: true,
                        xtype: 'textfield',
                        tooltip: 'State if disabled'
                    },{
                        fieldLabel: 'Residential Address',
                        afterLabelTextTpl: required,
                        name: 'disabled',
                        allowBlank: true,
                        xtype: 'textareafield',
                        tooltip: 'Enter your residence location'
                    },{
                        fieldLabel: 'Hometown',
                        afterLabelTextTpl: required,
                        name: 'hometown',
                        allowBlank: true,
                        xtype: 'textfield',
                        tooltip: 'enter your hometown'
                    },{
                        fieldLabel: 'State/Region',
                        afterLabelTextTpl: required,
                        name: 'region',
                        allowBlank: true,
                        xtype: 'combo',
                        tooltip: 'Select your region'
                    },{
                        fieldLabel: 'Nationality',
                        afterLabelTextTpl: required,
                        name: 'country',
                        allowBlank: true,
                        xtype: 'combo',
                        tooltip: 'Select your country'
                    }],
                    buttons: [{
                        text: 'Save',
                        handler: function() {
                            this.up('form').getForm().isValid();
                        }
                    },{
                        text: 'New',
                        handler: function() {
                            this.up('form').getForm().reset();
                        }
                    }]
                })],
            }, {
                title: 'Identity Document',
                // padding: 5,
                layout: 'border',
                // border: true,
                items: [ Ext.create('Ext.grid.Panel', {
                    region: 'north',
                    // height: 700,
                    height: window.innerHeight ,
                    columns: [
                        {text: "Document name", flex: 1, dataIndex: 'document_name'},
                        {text: "Preview"}
                    ]
                }),{
                    region: 'south',
                    title: 'Upload Subscriber Document',
                    autoScroll: true,
                    // height: 400,
                    collapsible: true,
                    items: Ext.widget({
                        xtype: 'form',
                        // padding: 10,
                        fieldDefaults: {
                            msgTarget: 'side',
                            labelWidth: 150,
                            width: 500
                        },
                        plugins: {
                            ptype: 'datatip'
                        },
                        defaultType: 'textfield',
                        items: [{
                            padding: 5,
                            fieldLabel: 'Document Name',
                            afterLabelTextTpl: required,
                            name: 'sub_code',
                            allowBlank: true,
                            tooltip: 'Enter document name'
                        },{
                            padding: 5,
                            fieldLabel: 'Document Image',
                            afterLabelTextTpl: required,
                            name: 'document_image',
                            allowBlank: true,
                            xtype: 'filefield',
                            tooltip: 'Select document image'
                        }],
                        buttons: [{
                            text: 'Upload',
                            handler: function() {
                                this.up('form').getForm().isValid();
                            }
                        },{
                            text: 'New',
                            handler: function() {
                                this.up('form').getForm().reset();
                            }
                        }]
                    })
                }]
            }, {
                title: 'Family Relationship',
                layout: 'border',
                // border: true,
                items: [ Ext.create('Ext.grid.Panel', {
                    region: 'north',
                    // height: 700,
                    height: window.innerHeight ,
                    columns: [
                        {text: "Actor", flex: 1, dataIndex: 'actor', width: 500},
                        {text: "Relationship", width: 300},
                        {text: "Receiver", width: 400}
                    ]
                }),{
                    region: 'south',
                    title: 'Setup Subcriber Family Relation',
                    autoScroll: true,
                    // height: 400,
                    collapsible: true,
                    items: Ext.widget({
                        xtype: 'form',
                        // padding: 10,
                        fieldDefaults: {
                            msgTarget: 'side',
                            labelWidth: 150,
                            width: 500
                        },
                        plugins: {
                            ptype: 'datatip'
                        },
                        defaultType: 'textfield',
                        items: [{
                            padding: 5,
                            fieldLabel: 'Actor Code',
                            afterLabelTextTpl: required,
                            name: 'sub_code',
                            allowBlank: true,
                            // tooltip: 'Enter document name'
                        },{
                            padding: 5,
                            fieldLabel: 'Family Relationship',
                            afterLabelTextTpl: required,
                            xtype: 'combo',
                            allowBlank: true,
                            // tooltip: 'Enter document name'
                        },{
                            padding: 5,
                            fieldLabel: 'Receiver Code',
                            afterLabelTextTpl: required,
                            name: 'sub_code',
                            allowBlank: true,
                            // tooltip: 'Enter document name'
                        }],
                        buttons: [{
                            text: 'Upload',
                            handler: function() {
                                this.up('form').getForm().isValid();
                            }
                        },{
                            text: 'New',
                            handler: function() {
                                this.up('form').getForm().reset();
                            }
                        }]
                    })
                }]
            }]
        }]
    });

    win.show();
}