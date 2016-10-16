/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var skips = 0;
function viewConvo(data){
    
    var empId = data.getAttribute('data-id');
    $('#getOtherMessage').attr('data-id', empId);
    app.getConvo(empId);
    
}

function resetSkips(){
    $('div#message').remove();
    $('hr').remove();
    skips = 0;
}
var localServer = "http://localhost:8070/pmis/cordova/";
var upServer = "/ ** get the ip address of the machine ** /";
var app = {
    
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);   
        var session = $.jStorage.get('session', '');
        if(session == ""){
            window.location = 'index.html';
        }   
    },
    
    onDeviceReady: function() {
        $( "[data-role='header']" ).toolbar({ theme: "a" });
        app.getCoEmployeeData();

        $("#logout").click(function(){
            app.logout();
        });

        
        
        
    },

    logout: function(){
        $.jStorage.deleteKey('session');
        console.log($.jStorage.flush()); 
        window.location = 'index.html';
    },

    getConvo: function(datas){
        $.ajax({ 
            type: 'GET', 
            url: localServer+'_getConvo', 
            data: { id: $.jStorage.get('session', ''), empId: datas, skip: skips }, 
            dataType: 'json',
            success: function (data) {
                
                $('#getOtherMessage').after(data.message);
                //prepend a button that get the 5 other messages
            }
        });
        skips += 5;
    },

    getCoEmployeeData: function (){
        var path = '';
        $.ajax({ 
            type: 'GET', 
            url: localServer+'_getCoEmployeeData', 
            data: { id: $.jStorage.get('session', '') }, 
            dataType: 'json',
            success: function (data) { 
                var parsedJson = $.parseJSON(data);
                $(parsedJson).each(function(i,val){
                    path = localServer + '../dashboard/' + val.id + '.jpg';
                    try {
                        $.get(localServer + '../dashboard/' + val.id + '.jpg').done(function(){
                        
                        }).fail(function(){
                            
                        });
                    }
                    catch(err) {
                        path = localServer + '../img/blank-profile-photo.jpg';
                    }
                     console.log(val);
                     
                     $('#profile').append('<li style="list-style: none"> <a class="ui-btn ui-btn-a" href="#view-conversation" onclick="resetSkips();viewConvo(this);" data-id="' + val.id + '" ><img style="height: 50px; width: 50px;" src="' + path +'"/> ' + val.fullname + '</a> </li>');
                });
            }
        });
    }

    
    
};

app.initialize();
















