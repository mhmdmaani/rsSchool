

const apiUrl = '/rsSchool-1.0-SNAPSHOT/analytics';

const studentPageUrl = '/rsSchool-1.0-SNAPSHOT/studentDetails.jsp';
const coursPageUrl ='/rsSchool-1.0-SNAPSHOT/courseDetails.jsp';
const teacherPageUrl = '/rsSchool-1.0-SNAPSHOT/teacherDetails.jsp';


async  function onLoad(){

    const {educations,students,teachers} = await axios.get(`${apiUrl}?type=counts`).then(res=>res.data);

    const studentsAvg =  await axios.get(`${apiUrl}?type=averageStudents`).then(res=>res.data);

    const coursesAvg =  await axios.get(`${apiUrl}?type=averageCourses`).then(res=>res.data);

    const allTeachers = await axios.get(`${apiUrl}?type=teachers`).then(res=>res.data);

    setInfo(educations,students,teachers);

    studentsAvg.map(student=>{
        const [id,name,image,education,avg,coursesCount] = student;
        addStudentElement(id,name,image,avg,education,coursesCount);
    })
    coursesAvg.map(course=>{
        const [id,name,image,education,studentCount,avg] = course;
        addCourseElement(id,name,image,avg,education,studentCount);
    })

    allTeachers.map(teacher=>{
        const {id,name,image}= teacher;
        addTeacherElement(id,name,image);
    })
}

function setInfo(educationsCount,studentsCount,teachersCount){
    document.getElementById('educationCount').innerHTML=`${educationsCount} Educations`;
    document.getElementById('studentsCount').innerHTML = `${studentsCount} Students`;
    document.getElementById('teachersCount').innerHTML=`${teachersCount} teachers`;
}


function addStudentElement(id,name,image,avg,education,count){
    const container = document.getElementById("latestStudents");
    const listItem = document.createElement("div");
    listItem.classList.add("listItem");

    const imgContainer = document.createElement("div");
    imgContainer.classList.add("imgContainer");

    const imgEl = document.createElement("img");
    imgEl.setAttribute("src",image);
    imgEl.setAttribute('class','homeStudentImage')
    imgContainer.appendChild(imgEl)

    const infoCont = document.createElement("div");
    infoCont.classList.add("infoCont");

    const titleEl = document.createElement("div");
    titleEl.classList.add("fw-bold");
    titleEl.innerHTML= `${name}  <span style="color:#3c3c3c50; font-size: 10px" >(${education.name})</span>`;
    infoCont.appendChild(titleEl);

    const progressCont = document.createElement("div");
    progressCont.classList.add("progress");

    const progressEl = document.createElement("div");
    progressEl.setAttribute('class','progress-bar progress-bar-striped progress-bar-animated');
    if(avg>=70){
        progressEl.classList.add("bg-success")
    }else if(avg<50){
        progressEl.classList.add("bg-danger");
    }else{
        progressEl.classList.add("bg-warning");
    }
    progressEl.innerHTML=`${avg}% (${count} course)`;
    progressEl.setAttribute("role",'progressbar');
    progressEl.setAttribute('aria-valuenow',`${avg}`);
    progressEl.setAttribute('aria-valuemin','0');
    progressEl.setAttribute('aria-valuemax','100');
    progressEl.style.width=`${avg}%`;

    progressCont.appendChild(progressEl);
    infoCont.appendChild(progressCont);

    const viewBtn = document.createElement('a');
    viewBtn.setAttribute('href',`${studentPageUrl}?id=${id}`);
    viewBtn.innerHTML="View";


    listItem.appendChild(imgContainer);
    listItem.appendChild(infoCont);
    listItem.appendChild(viewBtn);
    container.appendChild(listItem);
}

function addCourseElement(id,name,image,avg,education,count){
    const container = document.getElementById("latestCourses");
    const listItem = document.createElement("div");
    listItem.classList.add("listItem");

    const imgContainer = document.createElement("div");
    imgContainer.classList.add("imgContainer");

    const imgEl = document.createElement("img");
    imgEl.setAttribute("src",image);
    imgEl.setAttribute('class','homeStudentImage')
    imgContainer.appendChild(imgEl)

    const infoCont = document.createElement("div");
    infoCont.classList.add("infoCont");

    const titleEl = document.createElement("div");
    titleEl.classList.add("fw-bold");
    titleEl.innerHTML= `${name}  <span style="color:#3c3c3c50; font-size: 10px" >(${education.name})</span>`;
    infoCont.appendChild(titleEl);

    const progressCont = document.createElement("div");
    progressCont.classList.add("progress");

    const progressEl = document.createElement("div");
    progressEl.setAttribute('class','progress-bar progress-bar-striped progress-bar-animated');
    if(avg>=70){
        progressEl.classList.add("bg-success")
    }else if(avg<50){
        progressEl.classList.add("bg-danger");
    }else{
        progressEl.classList.add("bg-warning");
    }
    progressEl.innerHTML=`${avg}% (${count} students)`;
    progressEl.setAttribute("role",'progressbar');
    progressEl.setAttribute('aria-valuenow',`${avg}`);
    progressEl.setAttribute('aria-valuemin','0');
    progressEl.setAttribute('aria-valuemax','100');
    progressEl.style.width=`${avg}%`;

    progressCont.appendChild(progressEl);
    infoCont.appendChild(progressCont);

    const viewBtn = document.createElement('a');
    viewBtn.setAttribute('href',`${coursPageUrl}?id=${id}`);
    viewBtn.innerHTML="View";

    listItem.appendChild(imgContainer);
    listItem.appendChild(infoCont);
    listItem.appendChild(viewBtn);
    container.appendChild(listItem);
}

function  addTeacherElement(id,name,image){
    const container = document.getElementById("teachersContainer");
    const columnItem = document.createElement("div");
    columnItem.setAttribute("class",'col-2 col-md-3 col-sm-12');

    const anchor = document.createElement('a');
    anchor.setAttribute("href",`${teacherPageUrl}?id=${id}`);

    const teacherContainer = document.createElement("div");
    teacherContainer.setAttribute("class",'teacherItemContainer');

    const teacherImage = document.createElement("img");
    teacherImage.setAttribute('src',image);
    teacherImage.setAttribute('class','teacherImage')

    const teacherName = document.createElement("h5");
    teacherName.innerHTML=name;
    teacherName.setAttribute('class','teacherName');

    teacherContainer.appendChild(teacherImage);
    teacherContainer.appendChild(teacherName);

    anchor.appendChild(teacherContainer);
    columnItem.appendChild(anchor);
    container.appendChild(columnItem);
}