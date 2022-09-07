import db from '../models/index';

//
let getHomePage = async (req, res) => {
    try {
        let data = await db.User.findAll();

        return res.render('homepage.ejs', { data: JSON.stringify(data) });
    } catch (e) {
        console.log(e);
    }
};
let getAboutpage = (req, res) => {
    return res.render('test/about.ejs');
};
module.exports = { getHomePage: getHomePage, getAboutpage: getAboutpage };
