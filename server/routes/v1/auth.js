/*
Copyright: Ambrosus Technologies GmbH
Email: tech@ambrosus.com
This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0.
If a copy of the MPL was not distributed with this file, You can obtain one at https://mozilla.org/MPL/2.0/.
This Source Code Form is “Incompatible With Secondary Licenses”, as defined by the Mozilla Public License, v. 2.0.
*/
const express = require('express');
const AuthController = require('../../controllers/auth');
const AuthRoutes = express.Router();

// Routes
AuthRoutes.post('/login', AuthController.login, (req, res) => { res.status(req.status).json(req.json); });
AuthRoutes.post('/signup', AuthController.signup, (req, res) => { res.status(req.status).json(req.json); });

module.exports = AuthRoutes;