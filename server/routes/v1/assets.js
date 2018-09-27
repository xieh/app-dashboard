/*
Copyright: Ambrosus Technologies GmbH
Email: tech@ambrosus.com
This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0.
If a copy of the MPL was not distributed with this file, You can obtain one at https://mozilla.org/MPL/2.0/.
This Source Code Form is “Incompatible With Secondary Licenses”, as defined by the Mozilla Public License, v. 2.0.
*/
const express = require('express');

const AssetsController = _require('/controllers/assets');

const AssetsRoutes = express.Router();

// Routes
AssetsRoutes.route('/')
  .post(AssetsController.createAsset, AssetsController.createEvents, (req, res) => { res.status(req.status).json(req.json); })
  .get(AssetsController.getAssets, (req, res) => { res.status(req.status).json(req.json); });
AssetsRoutes.route('/events')
  .post(AssetsController.createEvents, (req, res) => { res.status(req.status).json(req.json); })
  .get(AssetsController.getEvents, (req, res) => { res.status(req.status).json(req.json); });
AssetsRoutes.get('/events/:eventId', AssetsController.getEvent, (req, res) => { res.status(req.status).json(req.json); });
AssetsRoutes.get('/:assetId', AssetsController.getAsset, (req, res) => { res.status(req.status).json(req.json); });

module.exports = AssetsRoutes;