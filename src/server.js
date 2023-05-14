require("dotenv").config();
const nodeMailer = require("nodemailer");
const bodyParser = require("body-parser");
const hcaptcha = require("hcaptcha");

const express = require("express");
const path = require("path");
const mustacheExpress = require("mustache-express");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "public")));

// const SITE_KEY = "a2ea8bf3-0c10-403a-8fc8-d5ee034561e9";
// const SECRET_KEY = "0x23b7D7b5C7740A5C573a49Ef6997fAF6D7D5f0d7";

app.set("views", `${__dirname}/pages`);
app.set("view engine", "mustache");
app.engine("mustache", mustacheExpress());

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/contact", (req, res) => {
  res.render("contact");
});
// app.get("/contact", (req, res) => {
//   res.render("contact", { sitekey: SITE_KEY });
// });

const transporter = nodeMailer.createTransport({
  host: "mail.gmx.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_ID,
     pass: process.env.EMAIL_PASSWORD,
  },
});

app.post("/contact", (req, res) => {
  const { fullname, email, subject, message } = req.body;

  const mailOptions = {
    from: process.env.EMAIL_ID,
    to: `{process.env.EMAIL_ID}, alhajikhaleel@gmail.com`,
    subject: `New Message from ${fullname}`,
    html: `
        <p><strong>Name:</strong> ${fullname}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.status(500).send("Error sending email");
    } else {
      console.log("Email sent: " + info.response);
      res.status(200).send("Email sent successfully");
    }
  });
  res.render("msgsent", { fullname });
});

// app.post("/contact", function (req, res) {
//     const token = req.body["h-captcha-response"];
//     const name = req.body.fullname;

//   hcaptcha.verify(SECRET_KEY, token, function (err, data) {
//     if (err) {
//       console.error(err);
//       // handle error
//       res.send("hCaptcha verification failed. Please try again.");
//     } else {
//       if (data.success) {
//         // verified successfully
//         res.render("msgsent", { name });
//       } else {
//         // verification failed
//         res.send("hCaptcha verification failed. Please try again.");
//       }
//     }
//   });
// });

const port = process.env.PORT || 3000;

app.listen(port, function () {
  console.log(`Serving listening at ${port}`);
});
