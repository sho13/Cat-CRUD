const express = require('express');
const router = express.Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./openAPISwagger.json');

// Routes
const authRoutes = require('./routes/authRoutes');
const catRoutes = require('./routes/catRoutes');

router.use('/auth', authRoutes);
router.use('/api', catRoutes);

// Swagger Docs
router.use('/api/docs', swaggerUi.serve);
router.get('/api/docs', swaggerUi.setup(swaggerDocument));

module.exports = router;
