const express = require('express');
const router = express.Router();
const {
  getClients,
  createClient,
  deleteClient
} = require('../controllers/clientController');
const auth = require('../middleware/auth');

router.route('/')
  .get(getClients)
  .post(auth, createClient);

router.route('/:id')
  .delete(auth, deleteClient);

module.exports = router;
