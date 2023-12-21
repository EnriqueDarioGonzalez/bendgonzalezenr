const { Router } = require('express');
const UserDaoMongo = require('../daos/Mongo/usersDaoMongo');

const router = Router();
const userService = new UserDaoMongo();

function validateNewUser(req, res, next) {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({
      status: 'error',
      message: 'Username, email, and password are required fields.',
    });
  }

  next();
}

router
  .get('/', async (req, res) => {
    try {
      const users = await userService.getUsers();
      res.json({
        status: 'success',
        payload: users,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        status: 'error',
        message: 'Internal Server Error',
      });
    }
  })

  .get('/:uid', async (req, res) => {
    const { uid } = req.params;

    try {
      const user = await userService.getUserById(uid);

      if (!user) {
        return res.status(404).json({
          status: 'error',
          message: 'User not found',
        });
      }

      res.json({
        status: 'success',
        payload: user,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        status: 'error',
        message: 'Internal Server Error',
      });
    }
  })

  .post('/', validateNewUser, async (req, res) => {
    const newUser = req.body;

    try {
      const result = await userService.createUser(newUser);
      res.json({
        status: 'success',
        payload: result,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        status: 'error',
        message: 'Internal Server Error',
      });
    }
  })

  .put('/:uid', async (req, res) => {
    const { uid } = req.params;
    const updatedUserData = req.body;

    try {
      const result = await userService.updateUserById(uid, updatedUserData);

      if (!result) {
        return res.status(404).json({
          status: 'error',
          message: 'User not found',
        });
      }

      res.json({
        status: 'success',
        payload: result,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        status: 'error',
        message: 'Internal Server Error',
      });
    }
  })

  .delete('/:uid', async (req, res) => {
    const { uid } = req.params;

    try {
      const result = await userService.deleteUserById(uid);

      if (!result) {
        return res.status(404).json({
          status: 'error',
          message: 'User not found',
        });
      }

      res.json({
        status: 'success',
        message: 'User deleted successfully',
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        status: 'error',
        message: 'Internal Server Error',
      });
    }
  });

module.exports = router;