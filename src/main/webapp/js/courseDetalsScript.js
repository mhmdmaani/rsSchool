const config = {
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
}

const courseUrl = '/rsSchool-1.0-SNAPSHOT/course';
const teacherUrl = '/rsSchool-1.0-SNAPSHOT/teacher';
const courseStudentUrl ='/rsSchool-1.0-SNAPSHOT/courseStudent';

const urlParams = new URLSearchParams(window.location.search);
const courseId = urlParams.get('id');

async function onLoad() {
    // get course data
    const courseData = await axios.get(`${courseUrl}?id=${courseId}`).then(res=>res.data);
    // get all education students
    const educationStudents = await axios.get(`${courseStudentUrl}?courseId=${courseId}&type=education`).then(res=>res.data);
  // fetch course student degree
    const students = await axios.get(`${courseStudentUrl}?courseId=${courseId}&type=course`).then(res=>res.data);
    // fetch teachers
    const teachers = await axios.get(`${teacherUrl}?courseId=${courseId}`).then(res=>res.data);
    // fetch all teachers
    const allTeachers = await  axios.get(`${teacherUrl}`).then(res=>res.data);
    // display course data
    const {id,name,description,image } = courseData;
    pageDetails(id,name,description,image);

    // display courseStudents
    students.forEach(el=>{
        addElement(el.student.id,el.student.name,el.student.email,el.student.tel,el.student.image,el.degree);
    })
    // display teachers
    teachers.forEach(el=>{
                addTeacherElement(el.id,el.name,el.tel,el.email,el.image);
            })
    // display students list in the form
    educationStudents.forEach((el) => {
                        console.log(el);
                        addStudentRadioBtn(el.id,el.name,el.tel,el.email,el.image);
                    });
    allTeachers.forEach(el=>{
        addTeacherRadioBtn(el.id,el.name,el.tel,el.email,el.image);
    })
}

/************** degree section ******************/


function onAddDegree(){
    const studentId =  document.querySelector('input[name="selectedStudent"]:checked').value;
    const degreeValue = document.getElementById("degreeValue").value;

    const params = new URLSearchParams();
    params.append("studentId",studentId);
    params.append("courseId",courseId);
    params.append("degree",degreeValue);
    return axios.post(courseStudentUrl,params).then(res=>{
        const {id,degree,student} = res.data;
        addElement(student.id,student.name,student.email,student.tel,student.image,degree);
    })
}

function addStudentRadioBtn(id,name,tel,email,image){
    const container = document.getElementById("radioBtnContainer");
    const formCheck = document.createElement("div");
    formCheck.classList.add("form-check");

    const checkInput = document.createElement("input");
    checkInput.classList.add("form-check-input");
    checkInput.setAttribute("type","radio");
    checkInput.setAttribute("value",id);
    checkInput.setAttribute("name","selectedStudent");
    checkInput.setAttribute("id",`student_${id}`);

    const checkLabel = document.createElement("label");
    checkLabel.innerHTML = name;
    checkLabel.classList.add("form-check-label");
    checkLabel.setAttribute("for",`student_${id}`);

    const imgDiv = document.createElement("img");
    imgDiv.setAttribute("src",image);
    imgDiv.classList.add("radioImg");

    formCheck.appendChild(checkInput);
    formCheck.appendChild(checkLabel);
    formCheck.appendChild(imgDiv);

    container.appendChild(formCheck);
}

function displayStudentsList(){
    document.getElementById("formStudentBtn").removeEventListener('click',onAddDegree);
    document.getElementById("degreeValue").value ='' ;
    document.getElementById("radioBtnContainer").value = '';
    document.getElementById("formStudentBtn").innerHTML="Create";
    document.getElementById("formStudentBtn").addEventListener('click',onAddDegree);
    document.getElementById("studentForm").style.display="flex";
}

function hideStudentsList(){
    document.getElementById("degreeValue").value = '';
    document.getElementById("studentForm").style.display="none";
}



/************** end degree section ******************/


function onCreate() {
    const params = new URLSearchParams();
    params.append('courseId',courseId);
    params.append('name', document.getElementById("nameId").value);
    params.append('description', document.getElementById("descriptionText").value);
    params.append('image', document.getElementById("imageId").value);
    return axios.post(courseUrl,
        params
    ).then(res=>{
        const {id , name,email,tel,image,degree} = res.data;
        addElement(id,name,email,tel,image, degree);
        hideForm();
    })
}

function deleteStudent(id) {
    return axios.delete(courseStudentUrl,{
        params:{
            studentId:id,
            courseId:courseId
        }
    }).then(dt=>{
        var item = document.getElementById(`student_${id}`);
        var container = document.getElementById("students");
        container.removeChild(item);
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
            addElement(el.id, el.name,el.email,el.tel, el.image, el.degree);
        });
    });
}

function addElement(id, name,email,tel, image,degree) {
    const container = document.getElementById('students');
    const listItem = document.createElement('li');
    listItem.setAttribute("id",`student_${id}`)
    listItem.classList.add("list-group-item");
   const imgItem = document.createElement("img");
    imgItem.classList.add("courseStudentImg");
    imgItem.setAttribute("src",image);

    const titleP = document.createElement("p");
    titleP.classList.add("studentName");
    titleP.innerHTML = name;

    const degreeEl = document.createElement("p");
    degreeEl.classList.add("studentDegree");
    degreeEl.innerHTML = degree;

    listItem.appendChild(imgItem);
    listItem.appendChild(titleP);
    listItem.appendChild(degreeEl);

    const deleteBtn = document.createElement('button');
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


    const viewBtn = document.createElement('a');
    viewBtn.setAttribute('type', 'button');
    viewBtn.innerHTML="View";
    viewBtn.classList.add('btn');
    viewBtn.classList.add('btn-secondary');
    viewBtn.setAttribute('href',`studentDetails.jsp?id=${id}`);


    listItem.appendChild(deleteBtn);
    listItem.appendChild(viewBtn);
    container.appendChild(listItem);
}


function displayCreateForm(){
    document.getElementById("formStudentBtn").removeEventListener('click',onUpdate);
    document.getElementById("degreeValue").value ='' ;
    document.getElementById("radioBtnContainer").value = '';
    document.getElementById("formStudentBtn").innerHTML="Create";
    document.getElementById("formStudentBtn").addEventListener('click',onCreate);
    document.getElementById("form").style.display="flex";
}

function hideForm(){
    document.getElementById("degreeValue").value ='' ;
    document.getElementById("form").style.display="none";
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



/***** teacher area******/
function onCreateTeacher() {
    const params = new URLSearchParams();
    params.append('courseId',courseId);
    params.append('name', document.getElementById("teacherName").value);
    params.append('tel', document.getElementById("teacherTel").value);
    params.append('email', document.getElementById("teacherEmail").value);
    params.append('image', document.getElementById("teacherImage").value);
    return axios.post(teacherUrl,
        params
    ).then(res=>{
        const {id , name,tel,email,image} = res.data;
        addTeacherElement(id,name,tel,email,image);
        hideTeacherForm();
    })
}

function deleteTeacherFromCourse(id) {
    return axios.delete(teacherUrl,{
        params:{
            id:id,
            courseId:courseId
        }
    }).then(dt=>{
        var item = document.getElementById(`teacher_${id}`);
        var container = document.getElementById("teachers");
        container.removeChild(item);
    })
}

function  onUpdateTeacher(){
    const id = document.getElementById("hiddenTeacherId").value;
    const name = document.getElementById("teacherName").value;
    const tel = document.getElementById("teacherTel").value;
    const email = document.getElementById("teacherEmail").value;
    const image = document.getElementById("teacherImage").value;
    const params = new URLSearchParams();
    params.append('id',id);
    params.append('name',name);
    params.append('tel',tel );
    params.append('email', email);
    params.append('image',image );
    return axios.post(studentUrl,
        params
    ).then(res=>{
        updateTeacherElement(id,name,email,tel,image);
        hideTeacherForm();
    })
}

function onSearchTeacher(){
    const searchInput = document.getElementById("searchStudentTxt");
    const searchText = searchInput.value;
    return axios.get(courseStudentUrl,{
        params:{
            search:searchText,
            courseId:courseId,
            type:"search"
        }
    }).then(res=>{
        clearContainer('students');
        res.data.forEach((el) => {
            addElement(el.id,el.name,el.student.email,el.student.tel, el.student.image,el.degree);
        });
    });
}

function addTeacherElement(id, name,tel,email,image){
    var container = document.getElementById('teachers');
    var card = document.createElement('div');
    card.classList.add('card');
    card.style.width = '18rem';
    card.setAttribute("id",`teacher_${id}`);
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
            deleteTeacherFromCourse(id);
        }
    });

    var editBtn = document.createElement('button');
    editBtn.setAttribute('type', 'button');
    editBtn.innerHTML="Edit";
    editBtn.classList.add('btn');
    editBtn.classList.add('btn-primary');
    editBtn.addEventListener('click', function () {

        displayEditTeacherForm(id, name,email,tel,image);
    });

    var viewBtn = document.createElement('a');
    viewBtn.setAttribute('type', 'button');
    viewBtn.innerHTML="View";
    viewBtn.classList.add('btn');
    viewBtn.classList.add('btn-secondary');
    viewBtn.setAttribute('href',`${teacherUrl}Details.jsp?id=${id}`);

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

function hideTeacherForm(){
    document.getElementById("teacherName").value='';
    document.getElementById("teacherEmail").value='';
    document.getElementById("teacherTel").value='';
    document.getElementById("teacherImage").value='';
    document.getElementById("teacherForm").style.display="none";
}

function displayEditTeacherForm(id, name, email, tel, image) {
    document.getElementById("teacherFormBtn").removeEventListener('click',onCreateTeacher);
    document.getElementById("teacherName").value =name ;
    document.getElementById("teacherEmail").value=email;
    document.getElementById("teacherTel").value=tel;
    document.getElementById("teacherImage").value=image;
    document.getElementById("hiddenTeacherId").value = id;

    document.getElementById("teacherFormBtn").innerHTML="Update";
    document.getElementById("teacherFormTitle").innerHTML=`Update student ${name}`
    document.getElementById("teacherFormBtn").addEventListener('click',onUpdateTeacher);
    document.getElementById("teacherForm").style.display="flex";
}

function displayCreateTeacherForm(){
    document.getElementById("teacherFormBtn").removeEventListener('click',onUpdateTeacher);
    document.getElementById("teacherName").value ="" ;
    document.getElementById("teacherEmail").value="";
    document.getElementById("teacherTel").value="";
    document.getElementById("teacherImage").value="";
    document.getElementById("hiddenTeacherId").value = "";

    document.getElementById("teacherFormBtn").innerHTML="Create";
    document.getElementById("teacherFormTitle").innerHTML=`Create Teacher`
    document.getElementById("teacherFormBtn").addEventListener('click',onCreateTeacher);
    document.getElementById("teacherForm").style.display="flex";
}

function updateTeacherElement(id, name,email,tel,image){
    const container = document.getElementById(`teacher_${id}`);
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
            deleteTeacherFromCourse(id);
        }
    });

    var editBtn = document.createElement('button');
    editBtn.setAttribute('type', 'button');
    editBtn.innerHTML="Edit";
    editBtn.classList.add('btn');
    editBtn.classList.add('btn-primary');
    editBtn.addEventListener('click', function () {
        displayEditTeacherForm(id, name, email,tel,image);
    });

    var viewBtn = document.createElement('a');
    viewBtn.setAttribute('type', 'button');
    viewBtn.innerHTML="View";
    viewBtn.classList.add('btn');
    viewBtn.classList.add('btn-secondary');
    viewBtn.setAttribute('href',`${teacherUrl}Details.jsp?id=${id}`);

    container.appendChild(cardImage);
    cardBody.appendChild(title);
    cardBody.appendChild(emailTag);
    cardBody.appendChild(telTag);
    cardBody.appendChild(deleteBtn);
    cardBody.appendChild(editBtn);
    cardBody.appendChild(viewBtn);
    container.appendChild(cardBody);
}

function addTeacherRadioBtn(id,name,tel,email,image){
    const container = document.getElementById("teachersRadioBtnContainer");
    const formCheck = document.createElement("div");
    formCheck.classList.add("form-check");

    const checkInput = document.createElement("input");
    checkInput.classList.add("form-check-input");
    checkInput.setAttribute("type","radio");
    checkInput.setAttribute("value",id);
    checkInput.setAttribute("name","selectedTeacher");
    checkInput.setAttribute("id",`teacher_${id}`);

    const checkLabel = document.createElement("label");
    checkLabel.innerHTML = name;
    checkLabel.classList.add("form-check-label");
    checkLabel.setAttribute("for",`teacher_${id}`);

    const imgDiv = document.createElement("img");
    imgDiv.setAttribute("src",image);
    imgDiv.classList.add("radioImg");

    formCheck.appendChild(checkInput);
    formCheck.appendChild(checkLabel);
    formCheck.appendChild(imgDiv);

    container.appendChild(formCheck);
}

function displayTeachersList(){
    document.getElementById("teachersListForm").style.display="flex";
}

function hideTeachersList(){
    document.getElementById("teachersListForm").style.display="none";
}

function addExistedTeacher(){
    const teacherId =  document.querySelector('input[name="selectedTeacher"]:checked').value;
    const params = new URLSearchParams();
    params.append("teacherId",teacherId);
    params.append("courseId",courseId);
    return axios.post(teacherUrl,params).then(res=>{
        const {id,name,email,tel,image} = res.data;
        addTeacherElement(id,name,tel,email,image);
       hideTeacherForm();
    })
}
