import express from "express";
import {
    addFineOrSecurity,
    getAllFinesAndSecurity,
    deleteFineOrSecurity,
} from "../controllers/fineSecurityController.js";

const router = express.Router();

router.post("/", addFineOrSecurity);
router.get("/", getAllFinesAndSecurity);
router.delete("/:id", deleteFineOrSecurity);

export default router;
