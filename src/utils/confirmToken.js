import store from '../store/index';
import authGameToken from './jwtoken';

export default function confirm(id) {
  const token = store.getters.getToken;
  if (!token) return false;
  return authGameToken.verifyToken(token, id);
}
