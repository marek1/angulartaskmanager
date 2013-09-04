describe('Tasks Manager', function() {
	beforeEach(module('taskManager'));
	describe('taskCtrl', function() {
		var scope, ctrl;
		beforeEach(inject(function($rootScope, $controller) {
			scope = $rootScope.$new();
			ctrl = $controller("taskCtrl", {$scope: scope });
		}));
		it('tasks to be defined',function(){
			expect(scope.tasks).toBeDefined();
		});	
		it('function clear to be defined',function(){
			expect(scope.clear).toBeDefined();
		});	
		it('function refreshView to be defined',function(){
			expect(scope.refreshView).toBeDefined();
		});
		it('function init to be defined',function(){
			expect(scope.init).toBeDefined();
		});
		it('function add to be defined',function(){
			expect(scope.add).toBeDefined();
		});
		it('function addTask to be defined',function(){
			expect(scope.addTask).toBeDefined();
		});
		it('function edit to be defined',function(){
			expect(scope.edit).toBeDefined();
		});
		it('function changeImportance to be defined',function(){
			expect(scope.changeImportance).toBeDefined();
		});
		/*
		 * It deletes real data
		 * 
		it('should intitially have an empty tasks array',function(){
			scope.clear();
			expect(scope.tasks.length).toBe(0);
		});
		*/
		it('addTask to be called and the resulting array length to be greater than 0',function(){
			//scope.clear();
			scope.addTask({header:"Header", description:"Description", important: false});
			expect(scope.tasks.length).toBeGreaterThan(0);
		});
		it('init retrieves from localstorage',function(){
			scope.init();
			expect(scope.tasks.length).toBeGreaterThan(0);
		});
		it('retrieving empty object from localstorage',function(){
			console.log('scope.tasks.length : ',scope.tasks.length);
			scope.delete(scope.tasks.length-1);
		});
	});
});