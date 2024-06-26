import AuthController from "./AuthController";
import dbClient from "../utils/db";
import mongoose from "mongoose";
import Servicing from "../models/Servicing";

const {ObjectId} = mongoose.Types;

class ServicingController {
    
    static async getAllServicingReport(req, res) {
        try {
            // perform full current check
            const verifiedJwt = await AuthController.currPreCheck(req);
            if (verifiedJwt instanceof Error) {
                return res.status(400).json({error: verifiedJwt.message});
            }
            const {id} = verifiedJwt;
            if (!id) {
                return res.status(400).json({error: 'Invalid token'});
            }
            // check DB connection
            if (!(await dbClient.isAlive())) {
                return res.status(500).json({error: 'Database connection failed'});
            }
            const admin = await AuthController.AdminCheck(new ObjectId(id));
            if (admin instanceof Error) {
                return res.status(400).json({error: admin.message});
            }
            const allServicingReport = await Servicing.find({}).select('-__v');
            res.status(200).json({
                message: 'All servicing fetched successfully',
                allServicingReport,
            });
        } catch (error) {
            if (error.message === 'jwt expired') {
                return res.status(401).json({error: error.message});
            }
            // unexpected error
            return res.status(500).json({error: error.message});
        }
    }
}

module.exports = ServicingController;