import config from '../config/index.js';
import {
  validateSignature,
} from '../utils/index.js';

const validateLineSignature = (req, res, next) => {
  const { rawBody } = req;
  const { LINE_CHANNEL_SECRET } = config;
  const signature = req.get('x-line-signature');
  if (LINE_CHANNEL_SECRET && !validateSignature(rawBody, LINE_CHANNEL_SECRET, signature)) {
    res.sendStatus(403);
  }
  next();
};

export default validateLineSignature;
