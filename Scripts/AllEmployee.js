const employeescontainerEle = document.getElementById("employees-container");

async function getAllEmployees() {
  try {
    let resp = await fetch("http://localhost:5000/employee");
    let data = await resp.json();
    console.log(data);
    displayEmployees(data);
  } catch (err) {
    console.log(err);
    alert("Something went Wrong ❌...");
  }
}

//calls FUNCTION AFTER DOM TREE CREATION
window.addEventListener("DOMContentLoaded", () => {
  getAllEmployees();
});

function displayEmployees(allEmnployees) {
  allEmnployees.map((emp) => {
    const empcard = document.createElement("article");
    empcard.className = "emp-card";

    empcard.innerHTML = `
    <header class="emp-header">
    <h3 class="emp-name">
     ${emp.firstname} ${emp.middlename} ${emp.lastname}
     </h3>
     <span class="emp-id">${emp.id}</span>
     </header>

        <section class="emp-info">
            <p><strong>Date of Birth: </strong> ${emp.dob}</p>
            <p><strong>Marital Status: </strong> ${emp.maritalstatus}</p>
        </section>

        <section class="emp-contact">
            <p><strong>Email: </strong> ${emp.emailId}</p>
            <p><strong>Phone: </strong> ${emp.mobilenumber}</p>
        </section>

        <section class="emp-address">
            <p><strong>Address: </strong></p>
            <p>
            ${emp.address.street} ,${emp.address.city},<br>
            ${emp.address.state},${emp.address.country} - ${emp.address.zipcode}
            </p>
        </section>

        <footer>
        <button class="btn edit-btn" data-id="${emp.id}">Edit</button>
        <button class="btn delete-btn" data-id="${emp.id}" >Delete</button>
        </footer>
        `;

    //apply click event in deleteBtn
    const deleteBtn = empcard.querySelector(".delete-btn");
    deleteBtn.addEventListener("click", () => {
      handleDelete(emp.id);
    });

    const editBtn = empcard.querySelector(".edit-btn");
    editBtn.addEventListener("click", () => {
      handleEdit(emp.id);
    });

    employeescontainerEle.append(empcard);
  });
}

async function handleDelete(id) {
  console.log(id);

  try {
    let resp = await fetch(`http://localhost:5000/employee/${id}`, {
      method: "DELETE",
    });
    console.log(resp);
  } catch (error) {
    console.log(error);
    alert("Unable to Delete ❌");
  }
}

function handleEdit(id) {
  window.location.href = `EditEmployee.html?id=${id}`;
}
