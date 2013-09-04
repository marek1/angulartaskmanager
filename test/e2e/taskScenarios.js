describe('my tasks app', function(){
	beforeEach(function(){
		
	});
	it('should clear the list', function(){
		browser().navigateTo('../../index.html'); 
		element('button[ng-click="clear()"]').click();
		expect(element('.modal').count()).toBe(0);
	});
	it('should open a dialog', function(){
		element('button[ng-click="add()"]').click(); 
		expect(element('.modal').count()).toBe(1);
	});
	it('should push into an array', function(){
		input('newTaskHeader').enter('TestTitle');
		input('newTaskDescription').enter('TestDescription');
		element('button[ng-click="submitNewTask(newTaskHeader,newTaskDescription)"]').click(); 
		expect(element('.modal').count()).toBe(0);
		expect(repeater('li').count()).toBeGreaterThan(0);
	});
	it('should filter the list', function(){
		input('searchText').enter('TestTitle');
		expect(repeater('li').count()).toBeGreaterThan(0);
	});
	it('should should open a dialog when edit is clicked', function(){
		element('span[ng-click="edit($index)"]').click();
		expect(element('.modal').count()).toBe(1);
	});
	it('should should edit the item', function(){
		input('newTaskHeader').enter('TestTitle1');
		input('newTaskDescription').enter('TestDescription1');
		element('button[ng-click="submitNewTask(itemNo,newTaskHeader,newTaskDescription,important)"]').click(); 
		expect(element('.modal').count()).toBe(0);
		expect(repeater('li').count()).toBeGreaterThan(0);
	});
	it('should filter the list using edited title', function(){
		input('searchText').enter('TestTitle1');
		expect(repeater('li').count()).toBeGreaterThan(0);
	});
	it('should should mark it as important', function(){
		element('span[ng-click="changeImportance($index)"]').click();
		expect(repeater('li').count()).toBeGreaterThan(0);
	});
	it('should should delete it from the list', function(){
		element('span[ng-click="delete($index)"]').click();
		expect(repeater('li').count()).toBe(0);
	});
});
