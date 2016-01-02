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
var app = {
	db: {},
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {

		        document.addEventListener('deviceready', this.onDeviceReady, false);

    },

    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        //app.receivedEvent('deviceready');
	//alert(window.sqlitePlugin);
	//alert(JSON.stringify(window.plugins));


      var db = window.sqlitePlugin.openDatabase({name: "my.db"});

      var calls = 0;

	function insert(){
		if (calls == 0){alert('start!');}

		calls++;
	        document.getElementById('outp').innerHTML = calls;

		if (calls < 10000){
		      db.transaction(function(tx) {
			//tx.executeSql('DROP TABLE IF EXISTS test_table');
		        tx.executeSql('CREATE TABLE IF NOT EXISTS test_table (id integer primary key, data text, data_num integer)');
		        tx.executeSql("INSERT INTO test_table (id, data, data_num) VALUES (?,?,?)", [calls, Math.random() + "111111111111111111111111111111111111222222222222222222222222222225", 100]);
		      }, function(e){alert('err'); alert(e.message); alert(JSON.stringify(e));}, insert);
		}
	}


	insert();



    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};
