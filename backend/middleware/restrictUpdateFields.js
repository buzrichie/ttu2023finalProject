const restrictUpdateFieldsMiddleware = (req, res, next) => {
  try {
    const { role } = req.user;
    const updateData = req.body;
    // Specify the fields that are allowed to be updated
    const allowedFields = [
      "password",
      "firstName",
      "surName",
      "dateOfBirth",
      "gender",
    ];

    const filteredData = {};

    if (!role) {
      throw new Error("Unauthorized");
    }

    if (role.toLowerCase() !== "admin") {
      for (const field in updateData) {
        if (updateData.hasOwnProperty(field) && allowedFields.includes(field)) {
          filteredData[field] = updateData[field];
        }
      }
    } else {
      Object.assign(filteredData, updateData);
    }

    req.body = filteredData; // Replace the original request body with the filtered update data
    next();
  } catch (error) {
    res.status(403).json({ error: error.message });
  }
};

module.exports = { restrictUpdateFieldsMiddleware };
