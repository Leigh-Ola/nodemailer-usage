const nodemailer = require("nodemailer");

// https://www.namecheap.com/support/knowledgebase/article.aspx/9193/31/differences-between-namecheap-private-email-and-cpanel-email
function send(id, recipient = "", content = "") {
  return new Promise((resolve, reject) => {
    console.log(`Sending email to ${recipient}...`);
    var transport = nodemailer.createTransport({
      host: "premium97.web-hosting.com", // mail.privateemail.com
      port: 465, // 587
      secure: true, //  true for 465, false for other ports
      // ssl should be on
      auth: {
        user: '...', // generated ethereal user
        pass: '..' // generated ethereal password
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
    // console.log("created transporter");

    var mailOptions = {
      from: '"John Doe" <name@email.com>', // sender address
      to: recipient, // list of receivers
      subject: "Hi There", // Subject line
      text: content, // text body
    };

    transport.sendMail(mailOptions, (error, info) => {
      console.log("Resolved!");
      if (error) {
        // console.log(error);
        return reject(String(error));
      }
      console.log("Email sent: " + info.response);
      resolve(`Email '${id}' sent: ${info.response}`);
    });
  });
}

// send(new Date().getTime()).catch(console.error);
module.exports = send;
