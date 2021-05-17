

const infoUrl = `/rsSchool-1.0-SNAPSHOT/student`;
const analyticsUrl =`/rsSchool-1.0-SNAPSHOT/studentDetails`;
const urlParams = new URLSearchParams(window.location.search);
const studentId = urlParams.get('id');

async function onLoad(){
    const info = await axios.get(`${infoUrl}?id=${studentId}`).then(res=>res.data);
    const courses  = await  axios.get(`${analyticsUrl}?id=${studentId}`).then(res=>res.data);

    const {id,name,email,tel,image,education} =info;

    let total = 0;
    courses.forEach(el=>{
        const {degree ,course} = el;
        total+=degree;

        addRow(degree,course);
    })
    let currentDegree = courses.length==0?0: total/courses.length
    displayInfo(id,name,email,tel,image,education,currentDegree);
}

function displayInfo(id,name,tel,email,image,education,degree){
    document.getElementById("pageTitle").innerHTML=name;
    document.getElementById("pageImage").setAttribute("src",image);
    document.getElementById("pageEmail").innerHTML = email;
    document.getElementById("pageTel").innerHTML = tel;
    document.getElementById("educationName").innerHTML = education.name;
    document.getElementById("studentDegree").style.width = `${degree}%`;
    document.getElementById("studentDegree").setAttribute("aria-valuenow",degree);
    document.getElementById("studentDegree").innerHTML = `${degree}%`;
}


function addRow(degree,course) {
    const {id, name,image} = course;
    const container = document.getElementById('elements');
    const listItem = document.createElement('li');
    listItem.setAttribute("id",`course_${id}`)
    listItem.classList.add("list-group-item");
    if(degree>50){
        listItem.classList.add("success");
    }else{
        listItem.classList.add("fail");
    }
    const imgItem = document.createElement("img");
    imgItem.classList.add("courseStudentImg");
    imgItem.setAttribute("src",image);

    const titleP = document.createElement("p");
    titleP.classList.add("studentName");
    titleP.innerHTML = name;

    const degreeContainer = document.createElement("div");
    degreeContainer.classList.add("progress");

    const degreeEl = document.createElement("div");
    degreeEl.classList.add("progress-bar");
    degreeEl.setAttribute("role","progressbar");
    degreeEl.setAttribute("aria-valuenow",`${degree}`);
    degreeEl.setAttribute("aria-valuemin",`0`);
    degreeEl.setAttribute("aria-valuemax",`100`);
    degreeEl.style.width = `${degree}%`;
    degreeEl.innerHTML = `${degree}%`;
     degreeContainer.appendChild(degreeEl);
    listItem.appendChild(imgItem);
    listItem.appendChild(titleP);
    listItem.appendChild(degreeContainer);
    container.appendChild(listItem);
}