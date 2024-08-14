function sendMail() {
    alert("sending");
    let params = {
        from_name: "test",
        from_mail: document.getElementById("contact-email").value,
        message: "testtttt",
    }
    alert("sending 2");
    emailjs.send("service_elektro", "template_elektro", params).then(
        (response) => {
          alert('SUCCESS!');
        },
        (error) => {
          alert(error);
        });
}