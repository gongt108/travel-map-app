const db = require("./models");

// Implement CRUD for user model

// CREATE
async function createUser() {
  try {
    const newUser = await db.user.create({
      name: "My Name",
      email: "myemail@gmail.com",
    });
    console.log("my new user >>>", newUser);
  } catch (error) {
    console.log("new user was not created b/c of >>>", error);
  }
}
// @todo run createUser function below

// READ
// find one user
async function findOneUser() {
  try {
    const user = await db.user.findOne({
      where: { id: 1 },
    });
    console.log("current user here >>>", user);
  } catch (error) {
    console.log("did not find user b/c of >>>", error);
  }
}
// @todo run findOneUser function below

// find all users
async function findAllUsers() {
  try {
    const users = await db.user.findAll();
    console.log("all users here >>>", users);
  } catch (error) {
    console.log("did not find all users because of >>>", error);
  }
}
// @todo run findAllUsers function below

// find one user
async function findOrCreate() {
  try {
    const users = await db.user.findOrCreate({
      where: { email: "brainsmith@gmail.com" },
      defaults: {
        name: "Brian Smith",
      },
    });
    console.log("all users here >>>", users);
  } catch (error) {
    console.log("did not find all users because of >>>", error);
  }
}
// @todo run findOrCreate function below

// UPDATE
async function updateUser() {
  try {
    const numRowsUpdated = await db.user.update(
      {
        name: "Brain Taco",
      },
      {
        where: {
          email: "brainsmith@gmail.com",
        },
      }
    );
    console.log("number of users updated", numRowsUpdated);
  } catch (error) {
    console.log("did not update user(s) because of >>>", error);
  }
}
// @todo run updateUser function below

// DELETE
async function deleteUser() {
  try {
    let numOfRowsDeleted = await db.user.destroy({
      where: { email: "brainsmith@gmail.com" },
    });
    console.log("number of rows deleted >>>", numOfRowsDeleted);
  } catch (error) {
    console.log("did not delete user(s) because of >>>", error);
  }
}
// @todo run deleteUser function below

// CRUD for bookmark model

// CREATE

// db.user.findOne({ where: { id: 6 } }).then((user) => {
//   user
//     .createBookmark({
//       lat: 1.2345,
//       lng: -1.2345,
//       name: "home",
//       userId: 6,
//     })
//     .then((newBookmark) => {
//       console.log("here is the new bookmark", newBookmark.toJSON());
//     });
// });

// async function createBookmark() {
// 	try {
// 		const newBookmark = await db.bookmark.create({
// 			lat: 1.2345,
// 			lng: -1.2345,
// 			userId: 6,
// 		});
// 	} catch (error) {
// 		'new bookmark was not created b/c of >>>', error;
// 	}
// }

// find all bookmarks
// db.user.findOne().then((user) => {
//   user.getBookmarks().then((bookmarks) => {
//     bookmarks.forEach((bookmark) => {
//       console.log(bookmark.name);
//     });
//   });
// });

// async function findAllBookmarks() {
// 	try {
// 		const bookmarks = await db.bookmark.findAll();
// 		console.log('all users here >>>', bookmarks);
// 	} catch (error) {
// 		console.log('did not find all bookmarks because of >>>', error);
// 	}
// }

// // find one bookmark
// async function findOneBookmark() {
// 	try {
// 		const bookmark = await db.bookmark.findOne({
// 			where: { id: 1 },
// 		});
// 		console.log('found bookmark here >>>', bookmark);
// 	} catch (error) {
// 		console.log('did not find bookmark b/c of >>>', error);
// 	}
// }

// // UPDATE
// async function updateBookmark() {
// 	try {
// 		const numRowsUpdated = await db.bookmark.update(
// 			{
// 				name: 'home',
// 			},
// 			{
// 				where: {
// 					id: 1,
// 				},
// 			}
// 		);
// 		console.log('number of bookmarks updated', numRowsUpdated);
// 	} catch (error) {
// 		console.log('did not update bookmark(s) because of >>>', error);
// 	}
// }

// // DELETE
// async function deleteBookmark() {
// 	try {
// 		let numOfRowsDeleted = await db.bookmark.destroy({
// 			where: { id: 1 },
// 		});
// 		console.log('number of bookmarks deleted >>>', numOfRowsDeleted);
// 	} catch (error) {
// 		console.log('did not delete bookmark(s) because of >>>', error);
// 	}
// }
