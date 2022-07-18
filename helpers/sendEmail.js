// сендгрід праціє лише з  сервісом сангрід
// для створення обєкту який буде відправляти нам почту імпортуємо мейл
const sgMail = require("@sendgrid/mail");
// визиваємо метод конфіг, щоб в переменні оточення можна було добавити наш апі ключ
require("dotenv").config();
// забира\мо ключ з змінних оточення
const { SENDGRID_API_KEY } = process.env;
// викликаємо метод setApiKey, добавляємо йому ключ, щоб він міг відправляти щось щоб
sgMail.setApiKey(SENDGRID_API_KEY);
// конфігурація закінчена

// напишемо функцію,яка буде отримувати вобєкті - кому відправити листа, тема з яким змістом -(дата) і від кого
const sendMail = async (data) => {
  const email = { ...data, from: "lytic.ok@gmail.com" };
  await sgMail.send(email);
  return true;
};
module.exports = sendMail;

// цю функцію можна викликати в циклі - знайти по якомусь критеріюв базі группу користувачів і відправляти їм листи
// тепер треба створити листа = це обєкт з полями  - ту(кому лист) фром сабджект(тема), штмл(код)
// створимо фуункцію, яка буде отримувати дату (налаштування і від кого буде йти розсилка)

// const email = {
//   to: "figibeh772@storypo.com",
//   from: "lytic.ok@gmail.com",
//   subject: "Нова заявка з сайту",
//   html: "<p>С сайта пришла новая заявка</p>",
// };
// тепер потрібно його відправити, визиваємо метод сенд і передаємо йому лист
// sgMail
//   .send(email)
//   // це асинхронна функція , яка повертає проміс, де зен спрацьовує, коли отправка пройшла успішно і кетч, якщо помилка
//   .then(() => console.log("Email send success"))
//   .catch((error) => console.log(error.message));

// помилка Forbidden = 403 = значить, що у нас немає прав це робити
// тому ми повинні верифіцирувати на сендгріді наш емейл з якого відправляємо

// const sgMail = require("@sendgrid/mail");
// require("dotenv").config();

// const {SENDGRID_API_KEY} = process.env;

// sgMail.setApiKey(SENDGRID_API_KEY);

// const sendEmail = async(data)=> {
//     const email = {...data, from: "bogdan.lyamzin.d@gmail.com"};
//     try {
//         await sgMail.send(email);
//         return true;
//     } catch (error) {
//         throw error;
//     }
// }

// module.exports = sendEmail;
