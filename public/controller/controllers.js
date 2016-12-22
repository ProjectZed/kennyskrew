app.controller('ResPageCtrl', function($scope, $http, $routeParams){
  hideBanner();

  $http.get('/response/id/' + $routeParams.id ).success(function(data) {
    if(data.length != 0){
      $scope.id = data[0].id;
      $scope.initiator = data[0].receiver;
      $scope.type = data[0].type;
      $scope.permission = data[0].permission;
      $scope.time = data[0].time;
      $scope.macro = data[0].macro;
      $scope.params = data[0].params;
      $scope.comment = data[0].comment;

      document.getElementById("proveBtn").style.display = "none";
      document.getElementById("declineBtn").style.display = "none";

      $http.put('/response/' + $routeParams.id ).success(function(data) {
        if(data == "Marked read true successfully"){
          $http.get('/response/username/' + username).success(function(data) {
          var msgs = [];
          var size = 0;
          for(var i = 0; i< data.length; i++){
            if(!data[i].read){
              msgs.push({
                id: data[i].id,
                initiator: (size+1) + ". Response : " + data[i].type
              });
              size++;
            }
          }
          $scope.$root.msgs = msgs;
          if(size == 0){
            document.getElementById("Res-badge").style.display = "none";
          }else{
            document.getElementById("Res-badge").innerHTML = size;
          }
        });
        }
      });
    }
  });

});

app.controller('ResCtrl', function($scope, $http, $routeParams){
  $http.get('/response/username/' + username).success(function(data) {
    var msgs = [];
    var size = 0;
    for(var i = 0; i< data.length; i++){
      if(!data[i].read){
        msgs.push({
          id: data[i].id,
          initiator: (size+1) + ". Response : " + data[i].type
        });
        size++;
      }
    }
    $scope.$root.msgs = msgs;
    if(size == 0){
      document.getElementById("Res-badge").style.display = "none";
    }else{
      document.getElementById("Res-badge").innerHTML = size;
    }
  });
});

app.controller('PRPageCtrl', function($scope, $http, $routeParams){
  hideBanner();
  document.getElementById("comment").style.display = "none";
  $scope.isCheck = 0;

  if(permission == "administrator"){
    $http.get('/pending/' + $routeParams.id ).success(function(data) {
      if(data.length != 0){
        $scope.id = data[0].id;
        $scope.initiator = data[0].initiator;
        $scope.type = data[0].type;
        $scope.permission = data[0].permission;
        $scope.time = data[0].time;
        $scope.macro = data[0].macro;
        $scope.params = data[0].params;
      }
    });
  }

  $scope.prove = function () {
    if(!$scope.isCheck){
    if(confirm("Are you sure want to prove?")){
    $scope.isCheck = 1;
    var params = JSON.parse($scope.params);
    var input = {
      id: $scope.id,
      macro: $scope.macro,
      params: params
    }
    $http.post('/run', input).success(function(data) {
      if(data == "Run successfully!"){
        $http.get('/pending').success(function(data) {
          var prs = [];
          for(var i = 0; i< data.length; i++){
            prs.push({
              id: data[i].id,
              initiator: (i+1) + ". " + data[i].initiator + " : " + data[i].type
            });
          }
          $scope.$root.prs = prs;
          if(data.length == 0){
            document.getElementById("badge").style.display = "none";
          }else{
            document.getElementById("badge").innerHTML = data.length;
          }
        });
      }
      $scope.banner = data;
      showBanner();
    });
  }
}
}

  $scope.decline = function () {
    if(!$scope.isCheck){
    var comment = prompt("Please enter your comment", "");
    if(comment != null){
      $scope.isCheck = 1;
      var input = {
        receiver : $scope.initiator,
        time : new Date().toString(),
        type : $scope.type,
        permission : $scope.permission,
        macro: $scope.macro,
        params: $scope.params,
        comment: comment,
        read: 0
      }
      $http.post('/response', input).success(function(data) {
        $scope.banner = "Sent Response...";
        showBanner();
        $http.post('/delete/pending', {id: $scope.id}).success(function(data) {
          if(data == "delete pending successfully"){
            $http.get('/pending').success(function(data) {
              var prs = [];
              for(var i = 0; i< data.length; i++){
                prs.push({
                  id: data[i].id,
                  initiator: (i+1) + ". " + data[i].initiator + " : " + data[i].type
                });
              }
              $scope.$root.prs = prs;
              if(data.length == 0){
                document.getElementById("badge").style.display = "none";
              }else{
                document.getElementById("badge").innerHTML = data.length;
              }
              $http.get('/response/username/' + username).success(function(data) {
                var msgs = [];
                var size = 0;
                for(var i = 0; i< data.length; i++){
                  if(!data[i].read){
                    msgs.push({
                      id: data[i].id,
                      initiator: (size+1) + ". Response : " + data[i].type
                    });
                    size++;
                  }
                }
                $scope.$root.msgs = msgs;
                if(size == 0){
                  document.getElementById("Res-badge").style.display = "none";
                }else{
                  document.getElementById("Res-badge").style.display = "inline-block";
                  document.getElementById("Res-badge").innerHTML = size;
                }
              });

            });
          }
        });
      });
    }
  }
}

});

app.controller('PRCtrl', function($scope, $http){
  if(permission == "administrator"){
  $http.get('/pending').success(function(data) {
    var prs = [];
    for(var i = 0; i< data.length; i++){
      prs.push({
        id: data[i].id,
        initiator: (i+1) + ". " + data[i].initiator + " : " + data[i].type
      });
    }
    $scope.$root.prs = prs;
    if(data.length == 0){
      document.getElementById("badge").style.display = "none";
    }else{
      document.getElementById("badge").innerHTML = data.length;
    }
  });
}
});

app.controller('environmentCtrl', function($scope) {
  $scope.environments = ["Development", "Test", "Quality Assurance", "Product"];
  $scope.selectedEnvironment = "Development";
});

app.controller('loginCtrl', function($scope, $http) {
  document.getElementById('username').style.borderColor = "#EBE9ED";
  document.getElementById('password').style.borderColor = "#EBE9ED";

  $scope.submitLogin = function () {
    //console.log($scope.form);
    document.getElementById('username').style.borderColor = "#EBE9ED";
    document.getElementById('password').style.borderColor = "#EBE9ED";
    //var env = $('#env').find(":selected").text();
    //console.log(env);
    if($scope.form.username === 'undefined' ||
        $scope.form.password === 'undefined' ||
        $scope.form.username.length == 0 ||
        !$scope.form.username.trim() ||
        $scope.form.password.length == 0 ||
        !$scope.form.password.trim()){

        if(($scope.form.username === 'undefined' ||
            $scope.form.username.length == 0 ||
            !$scope.form.username.trim())
            &&
          ($scope.form.password === 'undefined' ||
          $scope.form.password.length == 0 ||
          !$scope.form.password.trim())){
            redBorder('username');
            redBorder('password');
            errorOut('Empty Username and Password');
          }else if($scope.form.username === 'undefined' ||
              $scope.form.username.length == 0 ||
              !$scope.form.username.trim()){
              redBorder('username');
              errorOut('Empty Username');
          }else if($scope.form.password === 'undefined' ||
              $scope.form.password.length == 0 ||
              !$scope.form.password.trim()){
              redBorder('password');
              errorOut('Empty Password');
          }
        }else{
          $http.post('/login', $scope.form).success(function(data) {
              //go to homepage.html
              if(data === "Password Incorrect"){
                redBorder('password');
                errorOut("Username doesn't match password.");
                //console.log('password');
              }else if(data === "No Such User"){
                redBorder('username');
                errorOut("Username doesn't exist.");
                //console.log('username');
              }else if( data === "Both username and password are incorrect."){
                redBorder('username');
                redBorder('password');
                errorOut(error);
                //console.log('both username and password');
              }else{
                $scope.user = data;
                window.location.href="/";
              }
            });
          }
        };
      });

app.controller('navController', function($scope, $http) {
  if(permission != "administrator")
    document.getElementById('PR').style.display = "none";
    $scope.logout = function () {
      if(confirm("Are you sure want to exit?")){
        $http.get('/logout').
        success(function(data) {
          //console.log('logout success');
          window.location.reload();
        });;
      }
    };
});


/*
 * Controller for view log file
 */
 app.controller('ViewLog', function($scope, $http) {
   $http.get('/Logs').
   success(function(data) {
     $scope.banner = data
   });
 });
