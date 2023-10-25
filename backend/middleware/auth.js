import jwt from "jsonwebtoken";

const requireAuth = (req, res, next) => {
  const token = req.header("x-auth-token");

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded;
    next();
  } catch (ex) {
    res.status(400).json({ message: "Invalid token" });
  }
};

const requireAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(403).json({
      message: "Access forbidden. Only admins can access this route.",
    });
  }
};

export { requireAuth, requireAdmin };
