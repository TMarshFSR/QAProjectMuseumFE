'use strict'

const table = document.getElementById("myTable");

const indexPage = "http://localhost:8080/";

let updateID = 0;

var myModal = new bootstrap.Modal(document.getElementById('exampleModalLong'), {
  keyboard: false
})



function getSpecimens(){
    axios.get(indexPage + "getSpecimens")
    .then (res => {
        const specimens = res.data;
    table.innerHTML="";

        specimens.forEach(specimen => {
            const newSpecimen = renderSpecimen(specimen);
            console.log("New specimen : ", newSpecimen);
        });
    }).catch(err => console.error(err))
}

// render specimen function

function renderSpecimen(specimen){

    
    const newRow = table.insertRow();
    
    const cell1 = newRow.insertCell();
    cell1.innerHTML = specimen.id;

    const cell2 = newRow.insertCell();
    cell2.innerHTML = specimen.latinName;

    const cell3 = newRow.insertCell();
    cell3.innerHTML = specimen.origin;

    const cell4 = newRow.insertCell();
    cell4.innerHTML = specimen.storageLocation;

    const cell5 = newRow.insertCell();
    cell5.innerHTML = specimen.dateArrived;

    const cell6 = newRow.insertCell();
    cell6.innerHTML = specimen.description;

    // delete button
    const deleteSpecimenButton = document.createElement("button");
  deleteSpecimenButton.type = "button"
  deleteSpecimenButton.id = "deleteButton"
  deleteSpecimenButton.className = "btn btn-primary";
  deleteSpecimenButton.innerHTML = '<img src="Resources/delete-24px.svg"></img>';
  deleteSpecimenButton.addEventListener('click', function () {
    deleteSpecimen(specimen.id);
  });
  newRow.append(deleteSpecimenButton);

  // update button
  const updateSpecimenButton = document.createElement("button");
  updateSpecimenButton.id = "updateButton";
  updateSpecimenButton.className = "btn btn-primary";
  updateSpecimenButton.innerHTML = '<img src="Resources/arrow_circle_up-24px.svg"></img>';
  updateSpecimenButton.addEventListener('click', function(){
      openModal(specimen.id);
  })
  newRow.appendChild(updateSpecimenButton);
}

// delete function
function deleteSpecimen(id) {
    axios.delete(indexPage + "removeSpecimen/" + id)
    .then(() => getSpecimens())
    .catch(err => console.error(err));
}


// create function

document.getElementById("specimenForm").addEventListener('submit', function(event){
    event.preventDefault();
    const data = {
      latinName: this.latinName.value,
      origin: this.origin.value,
      storageLocation: this.storageLocation.value,
      dateArrived: this.dateArrived.value,
      description: this.description.value,
    };

    axios.post(indexPage + "createSpecimen", data, {
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      }
    }).then(() => {
      this.reset();
      this.latinName.focus();
      getSpecimens();
    })
    .catch(err => console.error(err));

  });


  // modal functions
  function openModal(id) {
    updateID = id;
    myModal.show();
    console.log(updateID);
  }

  function closeModal() {
    myModal.hide();
  }

  document.getElementById("modalclose1").addEventListener('click', function(){
    closeModal();
  })

  document.getElementById("modalclose2").addEventListener('click', function(){
    closeModal();
  })

  

  // update specimen function
  document.getElementById("updateForm").addEventListener('submit', function(event){
    event.preventDefault;

    const newData = {
      latinName: this.newLatinName.value,
      origin: this.newOrigin.value,
      storageLocation: this.newStorageLocation.value,
      dateArrived: this.newArrivalDate.value,
      description: this.newDescription.value
    }

    axios.put(indexPage + "updateSpecimen/" + updateID, newData)
    .then(() => {
        getSpecimens();
    })
    .catch(err => console.error(err));
  })






getSpecimens();