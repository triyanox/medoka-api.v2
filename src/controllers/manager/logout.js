export default async (req, res, next) => {
  try {
    return res.clearCookie("token").status(200).json({
      message: "Successfully logged out",
    });
  } catch (e) {
    next(e);
  }
};
