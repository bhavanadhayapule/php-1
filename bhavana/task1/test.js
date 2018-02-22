
var employee =JSON.parse(localStorage.getItem('employee'));
var empid= employee!==null && employee.length >0 ? employee[0]['empid']: '';

function formValidation()
{
	var fname = document.registration.fname;
	var lname = document.registration.lname;
	var email = document.registration.email;
	var mob = document.registration.mob;
	var doj = document.registration.doj;
	var dept = document.registration.dept;
	var mname = document.registration.mname;
	var mgender= document.registration.radioname;
	//var fgender= document.registration.fsex;
	var altEmail = document.registration.altemail;
	var genderValue = mgender[0].checked ? mgender[0].value: mgender[1].value;
	var job = document.registration.job;
	var errors =
	{     //object
		fname: document.getElementById('fname_error'),
		lname: document.getElementById('lname_error'),
		mob:document.getElementById('mob_error'),
		email:document.getElementById('email_error'),
		doj:document.getElementById('doj_error'),
	}
var dateString ='fname='+fname.value+'&lname='+lname.value+'&mname'+mname.value+'&email='+email.value+'&mob='+mob.value+'&job='+job.value+
'&doj='+doj.value +'&dept='+dept.value+'&gender='+genderValue+'&altEmail='+altEmail.value;
if(empid!== '')
{
	dateString = dateString + '&empid='+empid
}
if(allLetter(fname,'First Name',errors.fname))
{
	if(allLetter(lname,'Last Name',errors.lname))
	{
		if(emails())
		{
			if(validmob(mob,errors.mob))
			{
				if(validateDoj(doj,errors.doj))
				{
					AddEmployee(dateString);
				}
			} 
		}
	}
}
return false;

}
 function userid_validation(uid,mx,my)
{
	var uid_len = uid.value.length;
	if (uid_len == 0 || uid_len >= my || uid_len < mx)
	{
	alert("User Id should not be empty / length be between "+mx+" to "+my);
	uid.focus();
	return false;
	}
	return true;
	}
function passid_validation(passid,mx,my)
	{
	var passid_len = passid.value.length;
	if (passid_len == 0 ||passid_len >= my || passid_len < mx)
	{
	alert("Password should not be empty / length be between "+mx+" to "+my);
	passid.focus();
	return false;
	}
	return true;
	}
function validateDoj(doj,doj_error){
	doj_error.textContent = '';
	if(doj.value.length === 0){
		doj_error.textContent = "date of joining is Required"
		doj.focus();
		return false;
	}
	else{
		return true;
	}

}
function validmob(mob,mob_error){
	mob_error.textContent = '';
	var pattern = /^[0-9]{10}$/;
	if(mob.value.match(pattern))
{
return true;
}
else
{
	if(mob.value.length === 0){
	mob_error.textContent = "mobile number is required"	
	}
	else{	
mob_error.textContent = "mobile number must have 10 digits only"
}
mob.focus();
return false;
}
}
function allLetter(uname,name,name_error)
{ 
	name_error.textContent = '';
	var letters = /^[A-Za-z]+$/;
	if(uname.value.match(letters))
	{
	return true;
	}
else
{
	if(uname.value.length === 0){
		name_error.textContent = name+" is required"
	}
	else
		{
			name_error.textContent = name+" must have alphabet characters only"	
		}
		uname.focus();
	return false;
	}
}
function alphanumeric(uadd)
	{ 
	var letters = /^[0-9a-zA-Z]+$/;
	if(uadd.value.match(letters))
	{
	return true;
	}
	else
	{
	alert('User address must have alphanumeric characters only');
	uadd.focus();
	return false;
	}
	}
function countryselect(ucountry)
{
if(ucountry.value == "Default")
{
alert('Select your country from the list');
ucountry.focus();
return false;
}
else
{
return true;
}
}
function allnumeric(uzip)
{ 
var numbers = /^[0-9]+$/;
if(uzip.value.match(numbers))
{
return true;
}
else
{
alert('ZIP code must have numeric characters only');
uzip.focus();
return false;
}
}
function ValidateEmail(uemail,email_error)
{
	email_error.textContent = ''
var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
if(uemail.value.match(mailformat))
{
return true;
}
else
{
if(uemail.value.length === 0){
email_error.textContent = 'Email is Required'
}
else{
email_error.textContent = 'You have entered an invalid email address!'
}
uemail.focus();
return false;
}
}
function validsex(umsex,ufsex)
{
x=0;

if(umsex.checked) 
{
x++;
} if(ufsex.checked)
{
x++; 
}
if(x==0)
{
alert('Select Male/Female');
umsex.focus();
return false;
}
else
{
alert('Form Succesfully Submitted');
window.location.reload()
return true;
}
}

function AddEmployee(str) {
	localStorage.setItem("employee",null)
        if (window.XMLHttpRequest) {
            // code for IE7+, Firefox, Chrome, Opera, Safari
            xmlhttp = new XMLHttpRequest();
        } 
        else {
            // code for IE6, IE5
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xmlhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                window.location="getEmployees.php"


            }
        };
        xmlhttp.open("POST","addemployee.php",true);
        xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xmlhttp.send(str);
    }

    function loadEmployee(){
        //alert(document.forms['registration'].elements)
        //alert(document.registration.value)
    	if(localStorage.getItem("employee") !== null){
    		var employee =JSON.parse(localStorage.getItem('employee'));
    		var obj = employee!== null ? employee[0]: '';
    		if(obj !== ''){
    	 document.registration.fname.value = obj['firstname'];
    		document.registration.lname.value= obj['lastname'];
			 document.registration.email.value = obj['email'];
			 document.registration.mob.value = obj['mobno'];
			 document.registration.doj.value = obj['doj'];
			 document.registration.dept.value = obj['department'];
			 document.registration.mname.value=obj['middlename'];
 if(document.registration.gender)
 {
 	document.registration.gender.value=obj['gender'];

 }
 else
 {
 	if(obj['gender']==='Male')
 	{
 		document.registration.radioname[0].value=obj['gender'];
 		document.registration.radioname[0].checked=true;
 	}
 	else
 	{
 		document.registration.radioname[1].value=obj['gender'];
 		document.registration.radioname[1].checked=true;
 	}
 }
            document.registration.altemail.value = obj['alternateEmail'];
            document.registration.job.value = obj['job'];
            localStorage.setItem("employee",null)
        }
    }
    else{
        document.getElementById('actionTitle').textContent = 'Edit Employee'
    }
}


function cancelForm(){
    document.getElementById('cancelBtn').style.display = "none";
    localStorage.setItem("employee",null)
    window.location="getEmployees.php"
}

function checkemail(){
    var email = document.registration.email;
    var email_error = document.getElementById('email_error');
    //var altemail = document.getElementById('altemail');
    if(ValidateEmail(email,email_error)){
        $.ajax({
            type: "POST",
            url: "checkEmail.php",
            data: {"user_email":email.value},
            success: function(response){
                if(response ==="OK") {
                    return true;
                }
                else{
                    email_error.textContent = response;
                    return false;
                }
            }
        });
    }
}

function emails(){
    var bol;
    checkemail().done(function(response){
        if(response === 'OK'){
            bol = true;
        }
        else{
            bol=false;
        }
    })
    return bol;
}
