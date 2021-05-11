const config = {
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
}
const url = '/rsSchool-1.0-SNAPSHOT/education';
const courseUrl = '/rsSchool-1.0-SNAPSHOT/course';
const detailsUrl = '/rsSchool-1.0-SNAPSHOT/courseDetails.jsp';
const studentUrl = '/rsSchool-1.0-SNAPSHOT/student';

const urlParams = new URLSearchParams(window.location.search);
const educationId = urlParams.get('id');

 async function onLoad() {
    // set default axios
    const educationInfo = await axios.get(`${url}?id=${educationId}`).then(res=>res.data);
    // get courses by education
     const courses = await axios.get(`${courseUrl}?educationId=${educationId}`).then(res=>res.data);
     //get students by education
     const students = await axios.get(`${studentUrl}?educationId=${educationId}`).then(res=>res.data);
     const {id,name,description,image} = educationInfo;

            pageDetails(id,name,description,image);

            courses.forEach((el) => {
                console.log(el);
                addElement(el.id, el.name, el.description, el.image);
            });

            students.forEach(el=>{
                addStudentElement(el.id,el.name,el.tel,el.email,el.image);
            })
}

function deleteRequest(id) {
    return axios.delete(courseUrl,{
        params:{
            id:id,
            educationId:educationId
        }
    }).then(dt=>{
        var item = document.getElementById(id);
        var container = document.getElementById("elements");
        container.removeChild(item);
    })
}

function onCreate() {
    const params = new URLSearchParams();
    params.append('educationId',educationId);
    params.append('name', document.getElementById("nameId").value);
    params.append('description', document.getElementById("descriptionText").value);
    params.append('image', document.getElementById("imageId").value);
    return axios.post(courseUrl,
        params
    ).then(res=>{
        const {id , name,description,image} = res.data;
        addElement(id,name,description,image);
        hideForm();
    })
}

function onUpdate() {
    const name = document.getElementById("nameId").value;
    const id=document.getElementById("hiddenId").value;
    const description = document.getElementById("descriptionText").value;
    const image = document.getElementById("imageId").value;
    const params = new URLSearchParams();
    params.append('name',name );
    params.append('description', description);
    params.append('image', image);
    params.append('id', id);
    params.append("educationId",educationId);
    return axios.post(courseUrl,
        params
    ).then(res=>{
        updateElement(id,name,description,image);
        hideForm();
    })
}

function onSearch(){
    const searchInput = document.getElementById("searchTxt");
    const searchText = searchInput.value;
    return axios.get(courseUrl,{
        params:{
            search:searchText,
            educationId:educationId
        }
    }).then(res=>{
        clearContainer('elements');
        res.data.forEach((el) => {
            addElement(el.id, el.name, el.description, el.image);
        });
    });
}

function addElement(id, name, description, image) {
    var container = document.getElementById('elements');
    var card = document.createElement('div');
    card.classList.add('card');
    card.style.width = '18rem';
    card.setAttribute("id",id);
    var cardImage = document.createElement('img');
    cardImage.setAttribute('src', image);
    cardImage.classList.add('card-img-top');

    var cardBody = document.createElement('div');
    cardBody.classList.add('card-body');

    var title = document.createElement('h5');
    title.classList.add('card-title');
    title.innerHTML = name;

    var descriptionTag = document.createElement('p');
    descriptionTag.classList.add('card-text');
    descriptionTag.innerHTML = description;

    var deleteBtn = document.createElement('button');
    deleteBtn.classList.add('btn');
    deleteBtn.classList.add('btn-danger');
    deleteBtn.innerHTML = "Delete";
    deleteBtn.setAttribute('type', 'button');
    deleteBtn.addEventListener('click', function () {
        const result = confirm(`Are you sure to delete ${name} ?`);
        if (result === true) {
            deleteRequest(id);
        }
    });

    var editBtn = document.createElement('button');
    editBtn.setAttribute('type', 'button');
    editBtn.innerHTML="Edit";
    editBtn.classList.add('btn');
    editBtn.classList.add('btn-primary');
    editBtn.addEventListener('click', function () {
        displayEditForm(id, name,description,image);
    });

    var viewBtn = document.createElement('a');
    viewBtn.setAttribute('type', 'button');
    viewBtn.innerHTML="View";
    viewBtn.classList.add('btn');
    viewBtn.classList.add('btn-secondary');
    viewBtn.setAttribute('href',`${detailsUrl}?id=${id}`);


    card.appendChild(cardImage);
    cardBody.appendChild(title);
    cardBody.appendChild(descriptionTag);
    cardBody.appendChild(deleteBtn);
    cardBody.appendChild(editBtn);
    cardBody.appendChild(viewBtn);
    card.appendChild(cardBody);
    container.appendChild(card);
}


function displayCreateForm(){
    document.getElementById("formBtn").removeEventListener('click',onUpdate);
    document.getElementById("nameId").value ='' ;
    document.getElementById("descriptionText").value='';
    document.getElementById("imageId").value='';
    document.getElementById("hiddenId").value = '';

    document.getElementById("formBtn").innerHTML="Create";
    document.getElementById("formBtn").addEventListener('click',onCreate);
    document.getElementById("form").style.display="flex";
}

function hideForm(){
    document.getElementById("nameId").value='';
    document.getElementById("descriptionText").value='';
    document.getElementById("imageId").value='';
    document.getElementById("form").style.display="none";
}

function displayEditForm(id,name,description,image) {
    document.getElementById("formBtn").addEventListener('click',onCreate);

    document.getElementById("nameId").value =name ;
    document.getElementById("descriptionText").value=description;
    document.getElementById("imageId").value=image;
    document.getElementById("hiddenId").value = id;

    document.getElementById("formTitle").innerHTML=`Update ${name}`;
    document.getElementById("formBtn").innerHTML="Update";
    document.getElementById("formBtn").addEventListener('click',onUpdate);
    document.getElementById("form").style.display="flex";
}

function clearContainer(containerId){
    document.getElementById(containerId).innerHTML='';
}

function pageDetails(id,name,description,image){
    const titleEl = document.getElementById("pageTitle");
    const descriptionEl = document.getElementById("pageDescription");
    const imageEL = document.getElementById("pageImage");
    console.log(image);
    titleEl.innerHTML = name;
    descriptionEl.innerHTML = description;
    imageEL.setAttribute('src',image);
}


function updateElement(id, name,description,image){
    const container = document.getElementById(`${id}`);
    container.innerHTML = '';
    var cardImage = document.createElement('img');
    cardImage.setAttribute('src', image);
    cardImage.classList.add('card-img-top');

    var cardBody = document.createElement('div');
    cardBody.classList.add('card-body');

    var title = document.createElement('h5');
    title.classList.add('card-title');
    title.innerHTML = name;

    var descriptionTag = document.createElement('p');
    descriptionTag.classList.add('card-text');
    descriptionTag.innerHTML = description;

    var deleteBtn = document.createElement('button');
    deleteBtn.classList.add('btn');
    deleteBtn.classList.add('btn-danger');
    deleteBtn.innerHTML = "Delete";
    deleteBtn.setAttribute('type', 'button');
    deleteBtn.addEventListener('click', function () {
        const result = confirm(`Are you sure to delete ${name} ?`);
        console.log('result');
        console.log(result);
        if (result === true) {
            deleteRequest(id);
        }
    });

    var editBtn = document.createElement('button');
    editBtn.setAttribute('type', 'button');
    editBtn.innerHTML="Edit";
    editBtn.classList.add('btn');
    editBtn.classList.add('btn-primary');
    editBtn.addEventListener('click', function () {
        displayEditForm(id, name, description,image);
    });

    var viewBtn = document.createElement('a');
    viewBtn.setAttribute('type', 'button');
    viewBtn.innerHTML="View";
    viewBtn.classList.add('btn');
    viewBtn.classList.add('btn-secondary');
    viewBtn.setAttribute('href',`${detailsUrl}?id=${id}`);

    container.appendChild(cardImage);
    cardBody.appendChild(title);
    cardBody.appendChild(descriptionTag);
    cardBody.appendChild(deleteBtn);
    cardBody.appendChild(editBtn);
    cardBody.appendChild(viewBtn);
    container.appendChild(cardBody);
}



/***** Students area******/
function onCreateStudent() {
    const params = new URLSearchParams();
    params.append('educationId',educationId);
    params.append('name', document.getElementById("studentNameId").value);
    params.append('tel', document.getElementById("telId").value);
    params.append('email', document.getElementById("emailId").value);
    params.append('image', document.getElementById("studentImageId").value);
    return axios.post(studentUrl,
        params
    ).then(res=>{
        const {id , name,tel,email,image} = res.data;
        addStudentElement(id,name,tel,email,image);
        hideStudentForm();
    })
}

function  onUpdateStudent(){
    const id = document.getElementById("hiddenStudentId").value;
    const name = document.getElementById("studentNameId").value;
    const tel = document.getElementById("telId").value;
    const email = document.getElementById("emailId").value;
    const image = document.getElementById("studentImageId").value;
    const params = new URLSearchParams();
    params.append('educationId',educationId);
    params.append('id',id);
    params.append('name',name);
    params.append('tel',tel );
    params.append('email', email);
    params.append('image',image );
    return axios.post(studentUrl,
        params
    ).then(res=>{
        updateStudentElement(id,name,email,tel,image);
        hideStudentForm();
    })
}

function deleteStudent(id) {
    return axios.delete(studentUrl,{
        params:{
            id:id,
            educationId:educationId
        }
    }).then(dt=>{
        var item = document.getElementById(`student_${id}`);
        var container = document.getElementById("students");
        container.removeChild(item);
    })
}

function onSearchStudent(){
    const searchInput = document.getElementById("searchStudentTxt");
    const searchText = searchInput.value;
    return axios.get(studentUrl,{
        params:{
            search:searchText,
            educationId:educationId
        }
    }).then(res=>{
        clearContainer('students');
        res.data.forEach((el) => {
            addStudentElement(el.id,el.name,el.tel,el.email, el.image);
        });
    });
}

function addStudentElement(id, name,tel,email,image){
    var container = document.getElementById('students');
    var card = document.createElement('div');
    card.classList.add('card');
    card.style.width = '18rem';
    card.setAttribute("id",`student_${id}`);
    var cardImage = document.createElement('img');
    cardImage.setAttribute('src', image);
    cardImage.classList.add('card-img-top');

    var cardBody = document.createElement('div');
    cardBody.classList.add('card-body');

    var title = document.createElement('h5');
    title.classList.add('card-title');
    title.innerHTML = name;

    var emailTag = document.createElement('p');
    emailTag.classList.add('card-text');
    emailTag.innerHTML =`email: ${email}`;

    var telTag = document.createElement('p');
    telTag.classList.add('card-text');
    telTag.innerHTML = `tel: ${tel}`;

    var deleteBtn = document.createElement('button');
    deleteBtn.classList.add('btn');
    deleteBtn.classList.add('btn-danger');
    deleteBtn.innerHTML = "Delete";
    deleteBtn.setAttribute('type', 'button');
    deleteBtn.addEventListener('click', function () {
        const result = confirm(`Are you sure to delete ${name} ?`);
        if (result === true) {
            deleteStudent(id);
        }
    });

    var editBtn = document.createElement('button');
    editBtn.setAttribute('type', 'button');
    editBtn.innerHTML="Edit";
    editBtn.classList.add('btn');
    editBtn.classList.add('btn-primary');
    editBtn.addEventListener('click', function () {

        displayEditStudentForm(id, name,email,tel,image);
    });

    var viewBtn = document.createElement('a');
    viewBtn.setAttribute('type', 'button');
    viewBtn.innerHTML="View";
    viewBtn.classList.add('btn');
    viewBtn.classList.add('btn-secondary');
    viewBtn.setAttribute('href',`${studentUrl}?id=${id}`);

    card.appendChild(cardImage);
    cardBody.appendChild(title);
    cardBody.appendChild(emailTag);
    cardBody.appendChild(telTag);
    cardBody.appendChild(deleteBtn);
    cardBody.appendChild(editBtn);
    cardBody.appendChild(viewBtn);
    card.appendChild(cardBody);
    container.appendChild(card);
}

function displayCreateStudentForm(){
        document.getElementById("formStudentBtn").removeEventListener('click',onUpdateStudent);
        document.getElementById("studentNameId").value ='' ;
        document.getElementById("emailId").value='';
        document.getElementById("telId").value='';
        document.getElementById("studentImageId").value='';
        document.getElementById("hiddenStudentId").value = '';

        document.getElementById("formStudentBtn").innerHTML="Create";
        document.getElementById("formStudentBtn").addEventListener('click',onCreateStudent);
        document.getElementById("studentForm").style.display="flex";
}

function hideStudentForm(){
    document.getElementById("studentNameId").value='';
    document.getElementById("emailId").value='';
    document.getElementById("telId").value='';
    document.getElementById("studentImageId").value='';
    document.getElementById("studentForm").style.display="none";
}

function displayEditStudentForm(id, name, email, tel, image) {
    document.getElementById("formStudentBtn").removeEventListener('click',onCreateStudent);
    document.getElementById("studentNameId").value =name ;
    document.getElementById("emailId").value=email;
    document.getElementById("telId").value=tel;
    document.getElementById("studentImageId").value=image;
    document.getElementById("hiddenStudentId").value = id;

    document.getElementById("formStudentBtn").innerHTML="Update";
    document.getElementById("studentFormTitle").innerHTML=`Update student ${name}`
    document.getElementById("formStudentBtn").addEventListener('click',onUpdateStudent);
    document.getElementById("studentForm").style.display="flex";
}

function updateStudentElement(id, name,email,tel,image){
    const container = document.getElementById(`student_${id}`);
    console.log('container');
    console.log(container);
    container.innerHTML = '';
    var cardImage = document.createElement('img');
    cardImage.setAttribute('src', image);
    cardImage.classList.add('card-img-top');

    var cardBody = document.createElement('div');
    cardBody.classList.add('card-body');

    var title = document.createElement('h5');
    title.classList.add('card-title');
    title.innerHTML = name;

    var emailTag = document.createElement('p');
    emailTag.classList.add('card-text');
    emailTag.innerHTML = `email: ${email}`;

    var telTag = document.createElement('p');
    telTag.classList.add('card-text');
    telTag.innerHTML =`tel: ${tel}`;

    var deleteBtn = document.createElement('button');
    deleteBtn.classList.add('btn');
    deleteBtn.classList.add('btn-danger');
    deleteBtn.innerHTML = "Delete";
    deleteBtn.setAttribute('type', 'button');
    deleteBtn.addEventListener('click', function () {
        const result = confirm(`Are you sure to delete ${name} ?`);

        if (result === true) {
            deleteStudent(id);
        }
    });

    var editBtn = document.createElement('button');
    editBtn.setAttribute('type', 'button');
    editBtn.innerHTML="Edit";
    editBtn.classList.add('btn');
    editBtn.classList.add('btn-primary');
    editBtn.addEventListener('click', function () {
        displayEditStudentForm(id, name, email,tel,image);
    });

    var viewBtn = document.createElement('a');
    viewBtn.setAttribute('type', 'button');
    viewBtn.innerHTML="View";
    viewBtn.classList.add('btn');
    viewBtn.classList.add('btn-secondary');
    viewBtn.setAttribute('href',`${studentUrl}?id=${id}`);

    container.appendChild(cardImage);
    cardBody.appendChild(title);
    cardBody.appendChild(emailTag);
    cardBody.appendChild(telTag);
    cardBody.appendChild(deleteBtn);
    cardBody.appendChild(editBtn);
    cardBody.appendChild(viewBtn);
    container.appendChild(cardBody);
}