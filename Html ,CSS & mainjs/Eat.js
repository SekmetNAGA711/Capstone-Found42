console.log("connected");


const baseURL = 'http://localhost:4004';

const bloodForm = document.querySelector('#bloodForm');
const responseSection = document.querySelector('.response-area');
const clearBtn = document.getElementById('clearResults');
const responseBox = document.getElementsByClassName('response-box');
const loadingBox = document.querySelector('.loading-box');

function submitHandler(e) {
    e.preventDefault();
    
    const name = document.getElementById('name');
    const age = document.getElementById('age');
    const gender = document.querySelector('input[name="gender"]:checked');
    const bloodType = document.getElementById('bloodType');

    let bodyObj = {
        name: name.value,
        age: age.value,
        gender: gender.value,
        bloodType: bloodType.value
    };
    loadingBox.style.display = 'block'; 
    setTimeout(() => { // Introduce a delay before fetching the results
        createResults(bodyObj);
        loadingBox.style.display = 'none'; // Hide loading box after fetching
    }, 2000);

    name.value = ''
    age.value =''
    gender.checked = false
    bloodType.value = ''
    
}


function createResults(body) {
    
    axios.post(`${baseURL}/api/bloodInfo`, body)
        .then(res => createResultsCard(res.data, body))
        .catch(err => console.error(err));
}

function createResultsCard(bloodtypeData, body) {
    let responseText = `<p>Hello, ${body.name}, for a ${body.gender} with ${body.bloodType} blood type, Here is what is recommended:</p>`;
    
    // Check if the bloodtype exists in the data.
    if (bloodtypeData[body.bloodType] && bloodtypeData[body.bloodType].foods) {
        responseText += `<p>${bloodtypeData[body.bloodType].description}</p>`;
        responseText += '<ul>';
        
        for (const item of bloodtypeData[body.bloodType].foods) {
            responseText += `<li>${item}</li>`;
        }
        
        responseText += '</ul>';
    } else {
        responseText += `<p>Data not available for this blood type.</p>`;
    }
    
    responseSection.innerHTML = responseText;
    clearBtn.style.display = 'flex'; 
    responseBox[0].style.display = 'flex';
}



function clear () {
    responseSection.innerHTML = '';
    clearBtn.style.display = 'none'; 
    responseBox[0].style.display = 'none';

}

clearResults.addEventListener('click', clear)
bloodForm.addEventListener('submit', submitHandler);
