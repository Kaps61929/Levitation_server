const jwt=require('jsonwebtoken');

const key=process.env.secretKey;

exports.auth = async (req, res, next) => {
    try {
      const token = req.header('token');
      if (!token) {
        return res.status(401).json({ msg: "No auth token, access denied" });
      }
      const verify = jwt.verify(token, key);
      if (!verify) {
        return res.status(401).json({ msg: "Token verification failed, access denied" });
      }
      
      req.user = verify.id;
      req.token = token;
      next();
    } catch (error) {
      // Handle token verification errors
      res.status(401).json({ msg: "Invalid token, access denied" });
    }
  };
  