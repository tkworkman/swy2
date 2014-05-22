
/*
 * GET users listing.
 */

exports.list = function(req, res){
  req.getConnection(function(err,connection){
        //var query = connection.query('SELECT * FROM student',function(err,rows)
        var query = connection.query("SELECT id, fname, lname, DATE_FORMAT(bday,'%Y-%m-%d') AS bday, gender, email, phone, classid FROM student",function(err,rows)
        {         
            if(err)
                console.log("Error Selecting : %s ",err );
            res.render('students',{page_title:"Students",data:rows});
         });      
         //console.log(query.sql);
    });
};

exports.add = function(req, res){
  res.render('add_students',{page_title:"Add Students"});
};

exports.edit = function(req, res){
    var id = req.params.id; 
    req.getConnection(function(err,connection){   
        //var query = connection.query('SELECT * FROM student WHERE id = ?',[id],function(err,rows)
        var query = connection.query("SELECT id, fname, lname, DATE_FORMAT(bday,'%Y-%m-%d') AS bday, gender, email, phone, classid FROM student WHERE id = ?",[id],function(err,rows)
        {       
            if(err)
                console.log("Error Selecting : %s ",err );
            res.render('edit_students',{page_title:"Edit Students",data:rows});
         });       
         //console.log(query.sql);
    }); 
};

/*Save the student*/
exports.save = function(req,res){
    
    var input = JSON.parse(JSON.stringify(req.body));
    req.getConnection(function (err, connection) {      
        var data = {        
            fname   : input.fname,
            lname   : input.lname,
            bday    : input.bday,
            gender  : input.gender,
            email   : input.email,
            phone   : input.phone    
        };
        
        var query = connection.query("INSERT INTO student set ? ",data, function(err, rows)
        {
          if (err)
              console.log("Error inserting : %s ",err );
          res.redirect('/students');
        });   
       // console.log(query.sql); get raw query
    });
};

exports.save_edit = function(req,res){
    
    var input = JSON.parse(JSON.stringify(req.body));
    var id = req.params.id;
    
    req.getConnection(function (err, connection) {
        var data = {      
            fname   : input.fname,
            lname   : input.lname,
            bday    : input.bday,
            gender  : input.gender,
            email   : input.email,
            phone   : input.phone 
        };
        
        connection.query("UPDATE student set ? WHERE id = ? ",[data,id], function(err, rows)
        {
          if (err)
              console.log("Error Updating : %s ",err );
          res.redirect('/students');
        });
    });
};


exports.delete_student = function(req,res){
          
     var id = req.params.id;
    
     req.getConnection(function (err, connection) {
        
        connection.query("DELETE FROM student WHERE id = ? ",[id], function(err, rows)
        {
            
             if(err)
                 console.log("Error deleting : %s ",err );
            
             res.redirect('/students');
             
        });
        
     });
};


