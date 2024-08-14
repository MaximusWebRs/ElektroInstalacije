
function sendMail() {
    emailjs.send("service_elektro", "template_elektro", gatherParameters()).then(
        (response) => {
          alert('Upit je uspešno poslat. Hvala Vam!');
        },
        (error) => {
          alert("Upit nije poslat. Molimo Vas da probate ponovo kasnije ili da nas kontaktirate direktno.");
        });
}

function gatherParameters() {
    let checkedServices = document.querySelectorAll("input[name='extra']:checked");
    let theServices = [];
    for (let i = 0; i < checkedServices.length; i++) {
        theServices[i] = checkedServices[i].value;
    }
    let params = {
        from_name: document.getElementById("form-name").value,
        from_mail: document.getElementById("form-email").value,
        from_number: document.getElementById("form-phone").value,
        object_type: document.querySelector("input[name='offer']:checked").value,
        services: theServices
    };
    return params;
}