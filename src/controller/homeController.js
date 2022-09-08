import db from '../models/index';
import CRUDservice from '../services/CRUDservice';

//
//
let getHomePage = async (req, res) => {
    try {
        let data = await db.User.findAll();

        return res.render('homepage.ejs', { data: JSON.stringify(data) });
    } catch (e) {
        console.log(e);
    }
};

//

let getAboutpage = (req, res) => {
    return res.render('test/about.ejs');
};

//

let getCRUD = (req, res) => {
    return res.render('crud.ejs');
};
//

let postCRUD = async (req, res) => {
    let message = await CRUDservice.createNewUsers(req.body);
    console.log(message);
    return res.send('post curd form sever:');
};
//

let displayGetCRUD = async (req, res) => {
    let data = await CRUDservice.getAllUsers();
    return res.render('displayGetCRUD.ejs', { dataTable: data });
};
//

let getEditCRUD = async (req, res) => {
    let userId = req.query.id;
    if (userId) {
        let userData = await CRUDservice.getUserInforById(userId);
        //

        return res.render('editCRUD.ejs', {
            infoUser: userData,
        });
    } else {
        return res.send(' user not found');
    }
};
//

let putCRUD = async (req, res) => {
    let data = req.body;
    await CRUDservice.updateUserData(data);
    return res.send('update done');
};
//

let deleteCRUD = async (req, res) => {
    let id = req.query.id;
    if (id) {
        await CRUDservice.deleteUserById(id);
        return res.send('delete succees');
    } else {
        return res.send('user not found');
    }
};

//
module.exports = {
    getHomePage: getHomePage,
    getAboutpage: getAboutpage,
    getCRUD: getCRUD,
    postCRUD: postCRUD,
    displayGetCRUD: displayGetCRUD,
    getEditCRUD: getEditCRUD,
    putCRUD: putCRUD,
    deleteCRUD: deleteCRUD,
};
