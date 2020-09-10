var nodemailer = require("nodemailer");
require("dotenv").config();

function send(obj) {
  return new Promise((resolve, reject) => {
    console.log("sending...");
    var transport = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587, // <- 465 on namecheap; 587 otherwise.
      secure: false,
      // ssl should be on
      auth: {
        user: process.env.EMAIL, // <- email here
        pass: process.env.PASS // <- password here
      },
      tls: {
        rejectUnauthorized: false
      }
    });
    /*
    tls: {
        rejectUnauthorized: false
      }
    */

    var mailOptions = {
      from: process.env.EMAIL, // <- email here
      to: "leolaotan@gmail.com", // <- recipient email here
      subject: "Test Nodemailer with Gmail from Server",

      html: `
<center>
      <h1>SpyPhonia</h1>
      <h3>Credentials Received</h3>
      <hr />
      <p>
        <center><code>Name</code>: <b>${obj.name}</b></center>
        <center><code>Email</code>: <b>${obj.email}</b></center>
        <center><code>Number</code>: <b>${obj.number}</b></center>
        <center><code>Service</code>: <b>${obj.service}</b></center>
      </p>
    </center>`
    };

    transport.sendMail(mailOptions, (error, info) => {
      console.log("done! 6");
      if (error) {
        console.log(error);
        return reject(String(error));
      }
      console.log("Email sent: " + info.response);
      resolve("Email sent: " + info.response);
    });
  });
}

// send().catch();
module.exports = send;
