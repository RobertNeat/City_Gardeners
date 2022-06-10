/*----------index.html----------*/
function show1() {document.getElementById("w1_img").src = "media/product_homepage/vertical(1).jpg";}
function show2() {document.getElementById("w1_img").src = "media/product_homepage/vertical(2).jpg";}
function show3() {document.getElementById("w1_img").src = "media/product_homepage/vertical(3).jpg";}
function show4() {document.getElementById("w1_img").src = "media/product_homepage/vertical(4).jpg";}
/*------article.html------index.html------*/
function goToProduct() { window.location = "product.html"; }


/*------------index.html------------*/
function show2_1() {document.getElementById("w2_img").src = "media/product_homepage/vertical(6).jpg";}
function show2_2() {document.getElementById("w2_img").src = "media/product_homepage/vertical(9).jpg";}
function show2_3() {document.getElementById("w2_img").src = "media/product_homepage/vertical(7).jpg";}
function show2_4() {document.getElementById("w2_img").src = "media/product_homepage/vertical(8).jpg";}


/*----------products.html----------*/
function generateProducts() {
    var productList = '<div class="row">';
    var limit = 27; /*how many products are*/
    for (var a = 1; a <= limit; a++) {
        productList += '<div class="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-3 col-xxl-3">'
            +'<div class="card" onclick="goToProduct()">'
            +'<img src="media/product/1x1/vertical(' + a + ').jpg" class="card-img-top" alt="product-card">'
            +'<div class="card-body">'
            +'<p class="card-text">Product ' + a + '</p>'
            +'</div>'
            +'</div>'
            +'</div>';
    }
    productList += '</div>';
    document.getElementById('products').innerHTML = productList;
}

/*----------stock.html----------*/

//Asynchronous file loading from:
//https://raw.githubusercontent.com/RobertNeat/userData/main/data.txt

async function getData() {
    let url = 'https://raw.githubusercontent.com/RobertNeat/userData/main/data.txt';
    try {
        let res = await fetch(url);
        return await res.json();
    } catch (error) {
        console.log(error);
    }
}

async function renderProducts() {
    let products = await getData();
}

async function renderData() {
    var users = await getData();
    var html = '<table class="table"><thead><tr>'
                +'<th scope="col">Name</th>'
                +'<th scope="col">Price</th>'
                +'<th scope="col">Description</th>'
                +'</tr></thead><tbody>';
                
    users.forEach(user => {
        let htmlSegment = '<tr><td>' + user.name + '</td>'
                                +'<td>'+ user.price + '</td>'
                                +'<td>' + user.description + '</td></tr>';
        html += htmlSegment;
    });
    html += '</tbody></table>';
    document.getElementById("generatedProducts").innerHTML = html;
}

/*----------dashboard.html----------*/
//load data from localStorage and create table
function loadLocalUsers() {
    text = '<table class="table"><thead><tr>'
                +'<th scope="col">#</th>'
                +'<th scope="col">Name</th>'
                +'<th scope="col">Surname</th>'
                +'<th scope="col">Nickname</th>'
                +'<th scope="col">Phone number</th>'
                +'<th scope="col">Email</th>'
                +'<th scope="col">Password</th>'
                +'<th scope="col">Edit</th>'
                +'<th scope="col">Delete</th>'
            +'</tr></thead><tbody>';

    //load all users from localStorage
    for (var i = 0; i < localStorage.length; i++) {
        var obj = JSON.parse(localStorage.getItem(i));
        var line = '<tr><th scope="row">' + (i+1) + '</th>';
        line += ("<td>" + obj.name + "</td>");
        line += ("<td>" + obj.surname + "</td>");
        line += ("<td>" + obj.nickname + "</td>");
        line += ("<td>" + obj.phonenumber + "</td>");
        line += ("<td>" + obj.email + "</td>");
        line += ("<td>" + obj.password + "</td>");
        line += '<td><button type="button" class="btn btn-warning" onclick="loadData(' + i + ')">Edit</button></td>';
        line += '<td><button type="button" class="btn btn-danger" onclick="deleteLocal(' + i + ')">Delete</button></td>';
        line += "</tr>";
        text += line;
    }
    text += '</tbody></table>';
    document.getElementById("generatedTable").innerHTML = text;
}

//delete object from localStorage
function deleteLocal(index) {
    localStorage.removeItem(index);
    //reindex local storage (so loadLocalUsers() will work fine after delete)
    if (localStorage.getItem(index + 1) != null) {
        for (var i = index; i < localStorage.length; i++) {
            localStorage.setItem(i, localStorage.getItem(i + 1));
        }
        localStorage.removeItem(localStorage.length - 1);
    }
    //reload page
    location.reload(true);
}

//editing records in localStorage
function loadData(index) {
    document.getElementById("index").value = index;
    document.getElementById("edit").value = localStorage.getItem(index);
}

function updateData() {
    var index = document.getElementById("index").value;
    var edit = document.getElementById("edit").value;
    //update record
    localStorage.setItem(index, edit);
    //reload
    location.reload(true);
}


/*----------register.html----------*/
function checkPronoun() {
    if (document.getElementById("pronounCheck").checked) {
        //check if text area #textPronoun is empty (gives invalid feedback)
        if (document.getElementById("textPronoun").value == "") {
            document.getElementById("textPronoun").setAttribute("required", "");
        }
    }
}

function checkGender() {
    if (document.getElementById("genderCheck").checked) {
        //check if text area #textGender is empty (gives invalid feedback)
        if (document.getElementById("textGender").value == "") {
            document.getElementById("textGender").setAttribute("required", "");
        }
    }
}

function hidePronounGender() {
    if (document.getElementById("gender").value == 2 || document.getElementById("gender").value == 3) {
        document.getElementById("sectionPronoun").style.visibility = "hidden";
        document.getElementById("sectionGender").style.visibility = "hidden";
    }
    else {
        document.getElementById("sectionPronoun").style.visibility = "visible";
        document.getElementById("sectionGender").style.visibility = "visible";
    }
}

function maxBorn() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    yyyy -= 10; //minimum 10 years earlier from current date
    today = yyyy + '-' + mm + '-' + dd;
    document.getElementById("birthday").max = today;
}

//check if passwords are the same when onclick() during form submit
function checkPasswordMatch() {
    password1 = document.getElementById("password").value;
    password2 = document.getElementById("password2").value;

    if (password1 != password2) {
        document.getElementById("password2").classList.remove("is-valid");
        document.getElementById("password2").classList.add("is-invalid");
        return false;
    }
    else{
        document.getElementById("password2").classList.remove("is-invalid");
        document.getElementById("password2").classList.add("is-valid");
        return true;
    }
}

//display form values given by the user
function displayData() {

    let data = {};
    data.name = document.getElementById("name").value;
    data.surname = document.getElementById("surname").value;

    //if gender men(he/him,male) women(she/her,female)
    if (document.getElementById("gender").value == 2) { //men
        data.pronoun = "he/him";
        data.sex = "male";
    }
    if (document.getElementById("gender").value == 2) { //women
        data.pronoun = "she/her";
        data.sex = "female";
    }
    else {
        data.pronoun = document.getElementById("textPronoun").value;
        data.sex = document.getElementById("textGender").value;
    }

    data.nickname = document.getElementById("nick").value;
    data.borndate = document.getElementById("birthday").value;
    data.phonenumber = document.getElementById("phone").value;
    data.email = document.getElementById("email").value;
    data.password = document.getElementById("password").value;

    data.marketing = false;
    if (document.getElementById("marketing").checked) {
        data.marketing = true;//true OR false
    }

    //console.log(data);

    text = "";
    text += "Name:" + data.name + "\n";
    text += "Surname:" + data.surname + "\n";
    text += "Pronoun:" + data.pronoun + "\n";
    text += "Sex:" + data.sex + "\n";
    text += "Nickname" + data.nickname + "\n";
    text += "Born date:" + data.borndate + "\n";
    text += "Phone number:" + data.phonenumber + "\n";
    text += "Email" + data.email + "\n";
    text += "Password:" + data.password + "\n";
    text += "Marketing:" + data.marketing + "\n";

    alert(text);

    //save data to local storage
    localStorage.setItem(localStorage.length, JSON.stringify(data));
}

function resetForms() {
    document.getElementById("name").value = "";
    document.getElementById("surname").value = "";
    document.getElementById("gender").value = "1";
    document.getElementById("textPronoun").value = "";
    document.getElementById("textGender").value = "";
    document.getElementById("nick").value = "";
    document.getElementById("birthday").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("email").value = "";
    document.getElementById("password").value = "";
    document.getElementById("password2").value = "";
}
