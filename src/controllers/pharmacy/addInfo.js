import { validateInfo } from "../../lib/validators.js";
import { formatPharmacy } from "../../lib/helpers.js";
import Pharmacy from "../../models/pharmacy.model.js";

export default async (req, res, next) => {
  try {
    const { id, companyName, serialNumber, registrationDate } = formatPharmacy(
      req.body
    );
    const { error } = validateInfo(req.body);
    if (error) {
      return res.status(400).json({
        error: error.details[0].message,
      });
    }

    if (id) {
      const updated = await Pharmacy.updateOne(
        {
          _id: id,
          managerId: req.manager._id,
        },
        {
          $set: {
            companyName: companyName,
            serialNumber: serialNumber,
            registrationDate: registrationDate,
          },
        }
      ).catch((e) => {
        return res.status(400).json({
          error: "Pharmacy not found",
        });
      });

      return res.status(200).json({
        message: "Pharmacy info updated successfully",
        pharmacyId: updated._id,
      });
    }

    const created = await Pharmacy.create({
      companyName,
      serialNumber,
      registrationDate,
      managerId: req.manager._id,
    });

    return res.status(200).json({
      message: "Pharmacy created successfully",
      pharmacyId: created._id,
    });
  } catch (e) {
    next(e);
  }
};
