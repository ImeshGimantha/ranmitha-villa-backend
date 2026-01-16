import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "imeshgimantha09@gmail.com",
        pass: "yjxqbfdynhuspcal"
    }
});

// Send an email using async/await
(async () => {
  const info = await transporter.sendMail({
    from: '"Imesh Gimantha" <imeshgimantha09@gmail.com>',
    to: "imeshgimantha09@gmail.com",
    subject: "Hello ✔",
    text: "Test mail",
    html: "<b>Hello world?</b>",
  });

  console.log("Message sent:", info.messageId);
})();