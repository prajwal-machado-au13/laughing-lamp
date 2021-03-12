const express = require('express')
const router = express.Router()
const cloudinary = require("../src/models/utils/cloudinary");
const upload = require("../src/models/utils/multer");
const Employee = require("../src/models/schema/employeeschema");
const employeeschema = require('../src/models/schema/employeeschema');


router.get('/', (req, res) => {
    res.render("add-edit-employee.hbs", {
        viewTitle: "Insert Employee"
    });
});


router.post("/", upload.single("image"),(req, res) => {
  try {
    // Upload image to cloudinary
    // console.log(res)
    // const result = await cloudinary.uploader.upload(req.file.path);
    // res.json(result)
    // console.log(req.body)
    let employee = new Employee({
      firstname: req.body.firstname || '',
      lastname: req.body.lastname || '',
      email: req.body.email || '',
      phone: req.body.phone || '',
      address: req.body.address || '',
      pancard: req.body.pancard || '',
      // cloudinary_id: result.secure_url,
      basicsalary: req.body.basicsalary || '',
      da: req.body.da,
      hra: req.body.hra || '',
      medical: req.body.medical || '',
      proftax: req.body.proftax || '',
      incometax: req.body.incometax || '',
      providentfund: req.body.providentfund || ''
    });

    // Save user
    employee.save((err,data)=>{
      if(!err){
        return res.redirect('employee/list')
      }
      else{
        if(err.name == 'ValidationError'){
          handleValidationError(err,req.body);
          console.log(err,req.body)
          return res.render("add-edit-employee.hbs", {
            viewTitle: "Insert Employee",
            employee: req.body
          });

        }
        else{
          console.log("Error during record insertion "+err)
        }
      }
    });
    // console.log('ans',ans)

  }
  catch (err) {
    console.log(err.message);
    return res.end()
  }
});

router.get('/list',(req,res)=>{
  // res.json('from list')
  employeeschema.find((err,data)=>{
    if(!err){
      res.render("list.hbs",{
        list:data
      })
    }
    else{
      console.log('Error in retrieving employee list:'+ err)
    }
  })
})


function handleValidationError(err,body){
  for(field in err.errors){
    switch(err.errors[field].path) {
      case 'firstname':
        body['firstNameError'] = err.errors[field].message;
        break
      case 'email':
        body['emailError'] = err.errors[field].message;
        break
      case 'phone':
        body['phoneError'] = err.errors[field].message
        break
      case 'pancard':
        body['pancardError'] = err.errors[field].message
        break
      case 'basicsalary':
        body['basicsalaryError'] = err.errors[field].message
        break
      case 'da':
        body['daError'] = err.errors[field].message
        break
      case 'hra':
        body['hraError'] = err.errors[field].message
        break
      case 'medical':
        body['medicalError'] = err.errors[field].message
        break
      case 'proftax':
        body['proftaxError'] = err.errors[field].message
        break
      case 'incometax':
        body['incometaxError'] = err.errors[field].message
        break
      case 'providentfund':
        body['providentfundError'] = err.errors[field].message
        break
      default:
        break
    }
  }
}
module.exports = router
