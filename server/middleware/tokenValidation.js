const jwt = require("jsonwebtoken")

module.exports.validateToken = (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      throw new Error("Token is missing from header")
    }

    const userToken = req.headers.authorization.split("Bearer ")[1]
    const decodedToken = jwt.verify(
      userToken,
      process.env.SECRET_KEY || "default-secret-key"
    )
    req.user = decodedToken // Stocker les informations du token dans la requête
    next()
  } catch (error) {
    console.error("Error in tokenValidation.js", error)
    res.status(401).send({ message: error.message })
  }
}
