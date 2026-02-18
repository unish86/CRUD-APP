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

employeeFormEle.addEventListener("submit", async (e) => {
  e.preventDefault();
  console.log("Form Submited");

  let newEmployeeData = {
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
    let resp = await fetch("http://localhost:5000/employee", {
      method: "POST",
      headers: {
        "Content-type": "application-json",
      },
      body: JSON.stringify(newEmployeeData),
    });
    console.log(resp);

    //NAVIGATION
    window.location.href = "AllEmployee.html";
  } catch (err) {
    console.log(err);
    alert("Something Went Wrong!...");
  }
  console.log(newEmployeeData);
});
