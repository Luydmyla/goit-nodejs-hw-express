const { User } = require("../../models");
const path = require("path");
const fs = require("fs/promises");
const Jimp = require("jimp");
// можемо створити змінну ававтaрДір, щоб не писaти її кожного разу
const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

const updateAvatar = async (req, res) => {
  // в реквест файлі у нас зберігається інфо конкретно про файл що ми отримали - аватарки
  //   console.log(req.file);
  // вибираємо тимчасове сховище пас і оріджнал нейм
  const { path: tempUpload, originalname } = req.file;
  //    із реквест юзер ми витягуємо Айді користувача
  const { _id: id } = req.user;
  const avatar = await Jimp.read(tempUpload);
  avatar.resize(250, 250); // resize
  await avatar.write(tempUpload); // save

  try {
    //   перед імям картинки длобавляємо айді. Бо якщо різні користувачі будуть загружати один і той же аватар  в базу, то запишеться лише останньоій
    const imageName = `${id}_${originalname}`;
    const resultUpload = path.join(avatarsDir, imageName);
    //   використовуємо фс.ренейм (тимчаове сховище на папку з файлом)
    await fs.rename(tempUpload, resultUpload);
    // якщо все добре то записуємо в змінну аватврсЮРЛ новий шлях
    const avatarURL = path.join("public", "avatars", imageName);
    //   використовючи наш Юзер - обновляємо = записуємо його в базу
    //   Фйді ми беремо з реквест юзер, тому що ми використовуємо мідлвару аус перед нпшим контроллером, а значить в реквест юзер вжне прийшла вся інформація про користувача
    await User.findByIdAndUpdate(req.user._id, { avatarURL });
    res.json({
      status: "success",
      code: 200,
      avatarURL,
    });
    // console.log(res);
  } catch (error) {
    // памятаємо що в теорії може не вийде перейменувати, тоді потрібно видалити його з тимчасового сховища(анлинк)
    await fs.unlink(tempUpload);
    throw error;
  }
};
module.exports = updateAvatar;
