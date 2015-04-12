var jsonEditor = angular.module("jsonEditor",[]);

jsonEditor.service('RuleService', [ function() {

	var ruleSet = {};
	
	(function(){
		
		// FIXME
		// It will be replaced by remote storage
		var ruleScript = {
				"test.*" : "if(value===1){result=true;}else{result=false;}"
		};
		
		for(var i in ruleScript){
			ruleSet[i] = function(value){
				var result=undefined;
				eval(ruleScript[i]);
				return result;
			};
		}
		
	})();
	
	var findRule = function(keyChain){
		//FIXME
		//need search logic
		
		return ruleSet["test.*"];
	};

	var check = function(keyChain, value){
		return findRule(keyChain)(value);
	};
	
	return {check:check};

} ]);

jsonEditor.controller('RuleTest',['$scope', 'RuleService',function($scope,RuleService){

	$scope.success = RuleService.check("test",1);
	$scope.fail = RuleService.check("test",0);
	
	
}]);