const myApp = angular.module('myApp', []);

//controller AppCtrl
myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {
    
    console.log('Hello from controller');
//giving the endpoint

	const refresh = function() { //wrapping to refresh?
    $http.get('/contactlist').then(function(response) {
    	console.log('I got the data I requested.');
    	$scope.contactlist = response.data;
    	$scope.contact = null; //not sure why this has to be null it has to do with refreshing
    });
	};

	refresh(); //refresh now after the get request

    $scope.addContact = function() {
    	console.log($scope.contact)

    	$http.post('/contactlist', $scope.contact).then(function(response){
    		console.log(response);
    		refresh(); //refreshing after posting
    	});
    };

    $scope.remove = function(id) {
    	console.log("Deleting ID: " + id);

    	$http.delete('/contactlist/' + id).then(function(response){
    		refresh();
    	});
    };

   
	$scope.edit = function(id) {
		console.log(id);
		$http.get('/contactlist/' + id).then(function(response) {
			$scope.contact = response.data;
		})
	};

	$scope.update = function() {
		console.log($scope.contact._id);

		$http.put('/contactlist/' + $scope.contact._id, $scope.contact).then(function(response){
			refresh();
		});
	};

	$scope.deselect = function() {
		$scope.contact = null;
	}
    
// //placeholder data (now located in server.js)
//     let person1 = {
//     	name: 'Tim',
//     	email: 'tim@email1.com',
//     	number: '(111) 111-1111'
//     };

//     let person2 = {
//     	name: 'Emily',
//     	email: 'emily@email2.com',
//     	number: '(222) 222-2222'
//     }

//     let person3 = {
//     	name: 'John',
//     	email: 'john@email3.com',
//     	number: '(333) 333-3333'
//     }

//     const contactlist = [person1, person2, person3];
    
}]);