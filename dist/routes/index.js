"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const doctorRoutes_1 = __importDefault(require("./doctorRoutes")); // Si el archivo exporta 'default'
const patientRoutes_1 = __importDefault(require("./patientRoutes"));
const appointmentRoutes_1 = __importDefault(require("./appointmentRoutes"));
const router = (0, express_1.Router)();
router.use('/doctors', doctorRoutes_1.default);
router.use('/patients', patientRoutes_1.default);
router.use('/appointments', appointmentRoutes_1.default);
exports.default = router;
