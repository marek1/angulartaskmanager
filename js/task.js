	angular
	.module('taskManager',['ui.bootstrap'])
	.controller('taskCtrl', ['$scope','$location','$dialog', function($scope,$location,$dialog){
		var taskArray=[];
		$scope.tasks = [];
		$scope.clear = function(){
			for (var i = taskArray.length - 1; i >= 0; i--) {
                    taskArray.splice(i, 1);
            }
            $scope.refreshView();
		}
		
    	$scope.refreshView = function(){
    		//console.log('refresh with taskArray : ',taskArray);
    		localStorage.setItem("taskList", JSON.stringify(taskArray));
    		//console.log('taskArray : ',taskArray, 'taskArray.length', taskArray.length);
    		$scope.tasks = [];
			for (var i=0; i<taskArray.length; i++){
				////console.log(i, 'taskArray[i] : ',taskArray[i], ' typeof taskArray[i]', taskArray[i], ' isObject ? ', typeof taskArray[i] === "object", ' undefined ? ', typeof taskArray[i] === "undefined");
				if (typeof taskArray[i] === 'object') {
					$scope.tasks.push({'id' : i, 'header' : taskArray[i].header , 'description' : taskArray[i].description, 'important' : taskArray[i].important});
				}
			}
			
    	};
    	$scope.init = function(){
    		//console.log('init'); 
    		var retrievedLocalStorage = localStorage.getItem("taskList");
    		//console.log('retrievedLocalStorage : ',retrievedLocalStorage);
    		$scope.clear();
    		if (retrievedLocalStorage!="" && retrievedLocalStorage!="[{}]"){
    			taskString=JSON.parse(retrievedLocalStorage);
    			//console.log('taskString : ',taskString, ' typeof taskString : ',typeof taskString, ' length :',taskString.length);
    			for (var i=0; i<taskString.length; i++){
    				//console.log('taskString['+i+']', taskString[i],' typeof taskString[i] : ',typeof taskString[i],' taskString[i].description : ',taskString[i].description);
    				if (taskString[i]!=null){ 
    					taskArray.push({'id' : i, 'header' : taskString[i].header, 'description' : taskString[i].description, 'important' : taskString[i].important}); 
					}	
    			}
    		}
    		$scope.refreshView();
		};
    	$scope.init();	
		$scope.add = function(){
			var d = $dialog.dialog();
 	 		d.open('templates/task/add.html','addTaskDialogController').then(function(result){
				$scope.addTask(result);
			});
	    };
	  	$scope.addTask = function(taskObject){
	  		console.log('adding taskObject : ',taskObject);
			taskArray.push(taskObject);
			$scope.refreshView();
		};
		$scope.edit = function ( item ) {
			console.log('editing item ',item);
			var d = $dialog.dialog({ 
				resolve: {
		    		item: function(){ 
		    			return angular.copy({'arrayNo' : item, 'array' : taskArray[item]});
		    		}
		    	}
			});
			d.open('templates/task/edit.html','editTaskDialogController').then(function(result){
				$scope.editTask(result);
			});
		};
		$scope.editTask = function(taskObject){
			console.log('taskObject : ',taskObject, 'taskObject.itemNo : ',taskObject.itemNo, 'taskObject.header', taskObject.header, 'taskObject.description', taskObject.description, 'taskObject.important', taskObject.important);
			taskArray[taskObject.itemNo]={'header' : taskObject.header, 'description' : taskObject.description, 'important' : taskObject.important };
			$scope.refreshView();
		};
		$scope.delete = function ( id ) {
			//console.log(id);
			//console.log('taskArray : ',taskArray);
			taskArray.splice(id, 1);
			//console.log('taskArray : ',taskArray);
            $scope.refreshView();
		};
		$scope.changeImportance = function ( id ) {
			console.log('changing importance of ',id, ' and object ',taskArray[id]);
			console.log('taskArray[id].importance : ',taskArray[id].important);
			if (taskArray[id].important===false) {
				taskArray[id].important=true;
			}else{
				taskArray[id].important=false;
			}
			$scope.refreshView();
		};
	}]);
	
	// the dialog is injected in the specified controller
	function addTaskDialogController($scope, dialog){
		$scope.submitNewTask = function(newTaskHeader,newTaskDescription){
			////console.log('newTaskHeader : ',newTaskHeader, ' - newTaskDescription : ',newTaskDescription);
	     	dialog.close({'header': newTaskHeader, 'description':newTaskDescription, 'important' : false});
		};	
	}
	function editTaskDialogController($scope, dialog,item){
		$scope.itemNo=item.arrayNo;
		$scope.newTaskHeader=item.array.header;
		$scope.newTaskDescription=item.array.description;
		$scope.important=item.array.important;
		console.log('$scope.itemNo ',$scope.itemNo, '$scope.newTaskHeader : ',$scope.newTaskHeader, '$scope.newTaskDescription : ',$scope.newTaskDescription, '$scope.important : ',$scope.important);
		$scope.submitNewTask = function(itemNo, newTaskHeader, newTaskDescription, important){
			////console.log('newTaskHeader : ',newTaskHeader, ' - newTaskDescription : ',newTaskDescription);
	     	dialog.close({'itemNo' : itemNo, 'header' : newTaskHeader, 'description' : newTaskDescription, 'important' : important});
		};	
	}
