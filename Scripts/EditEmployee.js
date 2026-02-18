const employeeFormEle = document.getElementById("employee-form");
const firstNameEle = document.getElementById("firstname");
const middleNameEle = document.getElementById("middlename");
const lastNameEle = document.getElementById("lastname");
const dobEle = document.getElementById("dob");
const emailEle = document.getElementById("emailId");
const maritalStatusEle = document.getElementById("maritalstatus");
const phoneNumberEle = document.getElementById("mobilenumber");
const streetEle = document.getElementById("address");
const cityEle = document.getElementById("city");
const stateEle = document.getElementById("State");
const countryEle = document.getElementById("country");
const zipCodeEle = document.getElementById("zip");

const params = new URLSearchParams(window.location.search);
const id = params.get("id");

async function getEditEmployee() {
  try {
    let resp = await fetch(`http://localhost:5000/employee/${id}`);
    let data = await resp.json();
    console.log(data);

    //PRE-FILL INPUT FIELDS
    firstNameEle.value = data.firstname;
    middleNameEle.value = data.middlename;
    lastNameEle.value = data.lastname;
    dobEle.value = data.dob;
    emailEle.value = data.email;
    maritalStatusEle.value = data.maritalstatus;
    phoneNumberEle.value = data.phoneno;
    streetEle.value = data.address.street;
    cityEle.value = data.address.city;
    stateEle.value = data.address.state;
    countryEle.value = data.address.country;
    zipCodeEle.value = data.address.zipcode;
  } catch (error) {
    console.log(error);
    alert("Something Went Wrong❌");
  }
}
window.addEventListener("DOMContentLoaded", () => {
  getEditEmployee();
});

employeeFormEle.addEventListener("submit", async (e) => {
  e.preventDefault;

  //Create NEW UPDATED EMPLOYEE OBJECT
  let UpdatedEmployeeData = {
    firstname: firstNameEle.value.trim(),
    middlename: middleNameEle.value.trim(),
    lastname: lastNameEle.value.trim(),
    dob: dobEle.value.trim(),
    email: emailEle.value.trim(),
    maritalstatus: maritalStatusEle.value,
    phoneno: phoneNumberEle.value,
    address: {
      street: streetEle.value.trim(),
      city: cityEle.value.trim(),
      state: stateEle.value.trim(),
      country: countryEle.value.trim(),
      zipcode: zipCodeEle.value.trim(),
    },
  };

  try {
    let resp = await fetch(`http://localhost:5000/employee/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(UpdatedEmployeeData),
    });
    console.log(resp);

    window.location.href = "AllEmployee.html"

  } catch (err) {
    console.log(err);
  }
});
