'use strict'

const table = document.getElementById("myTable");

function getSpecimens(){
    axios.get("http://localhost:8080/getSpecimens")
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
  deleteSpecimenButton.className = "card-link";
  deleteSpecimenButton.attachShadow;
  deleteSpecimenButton.innerHTML = "x";
  deleteSpecimenButton.addEventListener('click', function () {
    deleteSpecimen(specimen.id);
  });
  newRow.appendChild(deleteSpecimenButton);

  // update button
  const updateSpecimenButton = document.createElement("button");
  updateSpecimenButton.className = "card-link";
  updateSpecimenButton.innerHTML = "Update";
  updateSpecimenButton.addEventListener('click', function () {
    updateSpecimen(specimen.id);
  });
  newRow.appendChild(updateSpecimenButton);
}

// delete function
function deleteSpecimen(id) {
    axios.delete("http://localhost:8080/removeSpecimen/" + id)
    .then(() => getSpecimens())
    .catch(err => console.error(err));
}



getSpecimens();