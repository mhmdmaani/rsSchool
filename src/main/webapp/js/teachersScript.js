const config = {
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
}
const url = '/rsSchool-1.0-SNAPSHOT/education';
const detailsUrl = `/rsSchool-1.0-SNAPSHOT/teacherDetails.jsp`;

const fetchUrl = '/rsSchool-1.0-SNAPSHOT/teacher';
const createUrl = '/rsSchool-1.0-SNAPSHOT/teacher';
const updateUrl ='/rsSchool-1.0-SNAPSHOT/teacher';
const deleteUrl ='/rsSchool-1.0-SNAPSHOT/teacher';
const searchUrl = '/rsSchool-1.0-SNAPSHOT/teacher';
function onLoad() {

    axios.defaults.headers['content-type'] = 'application/x-www-form-urlencoded';
    // set default axios
    return axios
        .get(fetchUrl)
        .then((res) => {
            res.data.forEach((el) => {
                const {id,name,email,tel,image} = el;
                addElement(id, name,tel,email,image);
            });
        });
}

function deleteRequest(id) {
    return axios.delete(deleteUrl,{
        params:{
            id:id
        }
    }).then(dt=>{
        var item = document.getElementById(id);
        var container = document.getElementById("elements");
        container.removeChild(item);
    })
}

function onCreate() {
    const params = new URLSearchParams();

    const name =  document.getElementById("name").value;
    const tel =  document.getElementById("tel").value;
    const email =  document.getElementById("email").value;
    const image =  document.getElementById("image").value;

    params.append('name',name);
    params.append('tel',tel);
    params.append('email',email);
    params.append('image', image);
    return axios.post(createUrl,
        params
    ).then(res=>{
        const {id,name,tel,email,image} = res.data;
        addElement(id,name,tel,email,image);
        hideForm();
    })
}

function onUpdate() {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const tel = document.getElementById("tel").value;
    const image = document.getElementById("image").value;
    const id = document.getElementById("hiddenId").value;
    const params = new URLSearchParams();
    params.append('name',name );
    params.append('tel',tel );
    params.append('email',email );
    params.append('image', image);
    params.append('teacherId', id);
    params.append('type','update');
    return axios.post(updateUrl,
        params
    ).then(res=>{
        updateElement(id,name,tel,email,image);
        hideForm();
    });
}

function onSearch(){
    const searchInput = document.getElementById("searchTxt");
    const searchText = searchInput.value;
    return axios.get(searchUrl,{
        params:{
            search:searchText
        }
    }).then(res=>{
        clearContainer();
        res.data.forEach((el) => {
            const {id,name,tel,email,image} = el;
            addElement(id, name,tel,email,image);
        });
    });
}

function addElement(id, name, tel,email, image) {
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

    var emailTag = document.createElement('p');
    emailTag.classList.add('card-text');
    emailTag.innerHTML = `email: ${email}`;

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
            deleteRequest(id);
        }
    });

    var editBtn = document.createElement('button');
    editBtn.setAttribute('type', 'button');
    editBtn.innerHTML="Edit";
    editBtn.classList.add('btn');
    editBtn.classList.add('btn-primary');
    editBtn.addEventListener('click', function () {
        displayEditForm(id, name, tel,email,image);
    });

    var viewBtn = document.createElement('a');
    viewBtn.setAttribute('type', 'button');
    viewBtn.innerHTML="View";
    viewBtn.classList.add('btn');
    viewBtn.classList.add('btn-secondary');
    viewBtn.setAttribute('href',`${detailsUrl}?id=${id}`);

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

function displayCreateForm(){
    document.getElementById("formBtn").removeEventListener('click',onUpdate);
    document.getElementById("name").value ='' ;
    document.getElementById("email").value='';
    document.getElementById("tel").value='';
    document.getElementById("image").value='';
    document.getElementById("hiddenId").value = '';

    document.getElementById("formTitle").innerHTML=`Create a New Education`;
    document.getElementById("formBtn").innerHTML="Create";
    document.getElementById("formBtn").addEventListener('click',onCreate);
    document.getElementById("form").style.display="flex";
}

function hideForm(){
    document.getElementById("name").value='';
    document.getElementById("email").value='';
    document.getElementById("tel").value='';
    document.getElementById("image").value='';
    document.getElementById("form").style.display="none";
}

function displayEditForm(id,name,tel,email,image) {
    document.getElementById("formBtn").removeEventListener('click',onCreate);
    document.getElementById("name").value =name ;
    document.getElementById("email").value=email;
    document.getElementById("tel").value=tel;
    document.getElementById("image").value=image;
    document.getElementById("hiddenId").value = id;

    document.getElementById("formTitle").innerHTML=`Update ${name}`;
    document.getElementById("formBtn").innerHTML="Update";
    document.getElementById("formBtn").addEventListener('click',onUpdate);
    document.getElementById("form").style.display="flex";

}

function clearContainer(){
    document.getElementById("elements").innerHTML='';
}

function updateElement(id, name,tel,email,image){
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

    var emailTag = document.createElement('p');
    emailTag.classList.add('card-text');
    emailTag.innerHTML = email;
    var telTag = document.createElement('p');
    telTag.classList.add('card-text');
    telTag.innerHTML = tel;

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
    cardBody.appendChild(emailTag);
    cardBody.appendChild(telTag);
    cardBody.appendChild(deleteBtn);
    cardBody.appendChild(editBtn);
    cardBody.appendChild(viewBtn);
    container.appendChild(cardBody);
}