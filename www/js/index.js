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
var localServer = "http://localhost:8070/pmis/cordova/";
var upServer = "http://192.168.22.10:8070/pmis/cordova";
var app = {
    
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
        var session = $.jStorage.get('session', '');
        if(session != ""){
            window.location = 'dashboard.html';
        }   
    },
    
    onDeviceReady: function() {
        $( "[data-role='header']" ).toolbar({ theme: "a" }); 
        
        $(document).on('submit', '#form-login', function() {
            $.post(localServer+"_login", $(this).serialize()).done(function(data){
                app.doLogin(data);
            });
        });
        
    },
    
    doLogin: function(data){
        if(data.result == true){
            console.log(data.result);
            console.log(data.id['$id']);
            $.jStorage.set('session', data.id['$id'], {TTL: 28800000});
            var session = $.jStorage.get('session', '');
            console.log('Test: ' + session);
            window.location = 'dashboard.html';
        }else{
            console.log(data.result);
              
        }
    }

    
    
};

app.initialize();
















