/**
 * Middleware to restrict update fields based on user role.
 * Only allows specific fields to be updated if the user role is not admin.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {void}
 */
const restrictUpdateFieldsMiddleware = (req, res, next) => {
  try {
    const { role } = req.user;
    const updateData = req.body;
    const allowedFields = [
      "password",
      "firstName",
      "surName",
      "dateOfBirth",
      "gender",
    ];

    const filteredData = {};

    if (!role) {
      throw new Error("Unauthorized. User role is missing.");
    }

    if (role.toLowerCase() !== "admin") {
      for (const field in updateData) {
        if (
          Object.prototype.hasOwnProperty.call(updateData, field) &&
          allowedFields.includes(field)
        ) {
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
