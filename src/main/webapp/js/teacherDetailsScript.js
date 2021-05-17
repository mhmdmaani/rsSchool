

const infoUrl = `/rsSchool-1.0-SNAPSHOT/teacher`;
const analyticsUrl =`/rsSchool-1.0-SNAPSHOT/analytics`;
const urlParams = new URLSearchParams(window.location.search);
const teacherId = urlParams.get('id');
const courseDetailsUrl = `/rsSchool-1.0-SNAPSHOT/courseDetails.jsp`;
async function onLoad(){
    const info = await axios.get(`${infoUrl}?id=${teacherId}`).then(res=>res.data);
    const courses  = await  axios.get(`${analyticsUrl}?type=teacherCourses&id=${teacherId}`).then(res=>res.data);
   const {id,name,email,tel, image } = info;
    displayInfo(id,name,email,tel,image);
    courses.map(cc=>{
        addRow(0,cc);
    })
}

function displayInfo(id,name,tel,email,image,education,degree){
    document.getElementById("pageTitle").innerHTML=name;
    document.getElementById("pageImage").setAttribute("src",image);
    document.getElementById("pageEmail").innerHTML = email;
    document.getElementById("pageTel").innerHTML = tel;
}


function addRow(degree,course) {
    const {id, name,image} = course;
    const container = document.getElementById('elements');
    const listItem = document.createElement('li');
    listItem.setAttribute("id",`course_${id}`)
    listItem.classList.add("list-group-item");
        listItem.classList.add("success");

    const imgItem = document.createElement("img");
    imgItem.classList.add("courseStudentImg");
    imgItem.setAttribute("src",image);

    const titleP = document.createElement("a");
    titleP.classList.add("studentName");
    titleP.innerHTML = name;
    titleP.setAttribute("src",`${courseDetailsUrl}?id=${id}`);

    listItem.appendChild(imgItem);
    listItem.appendChild(titleP);
    container.appendChild(listItem);
}