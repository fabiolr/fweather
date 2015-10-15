
var oMessages;
var result;

 jQuery.getJSON("data/funny.json", function(data) {
	oMessages = data;
});

 // get_my_obj = getById(1, oMessages);



  function getById(id, myArray) {
    return myArray.filter(function(obj) {
      if(obj.caseID == id) {
        return obj 
      }
    })
  }

