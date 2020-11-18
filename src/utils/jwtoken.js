import * as jwt from 'jsonwebtoken';

export default {
  createToken: (id) => {
    const token = jwt.sign({
      exp: Math.floor(Date.now() / 1000) + (60),
      gameId: id,
    },
    process.env.VUE_APP_JWT_SECRET);
    return token;
  },

  verifyToken: (token, id) => {
    const decoded = jwt.verify(token, process.env.VUE_APP_JWT_SECRET);
    const { gameId } = decoded;
    return gameId === id;
  },
};
