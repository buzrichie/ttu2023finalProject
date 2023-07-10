async function generateRandomPassword(length) {
  try {
    if (!length) {
      throw new Error("Length of password is required.");
    }
    if (typeof length !== "number") {
      throw new Error("Length must be a number.");
    }
    if (length < 8) {
      throw new Error(
        "Length of password must be eight (8) characters or more."
      );
    }

    const charset =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let password = "";

    for (let i = 0; i < length; i++) {
      password += charset.charAt(Math.floor(Math.random() * charset.length));
    }

    return password;
  } catch (error) {
    throw error;
  }
}

module.exports = generateRandomPassword;
