import config from '../config/index.js';
import {
  validateSignature,
} from '../utils/index.js';

const validateLineSignature = (req, res, next) => {
  const { rawBody } = req;
  const { LINE_CHANNEL_SECRET } = config;
  const signature = req.headers.get('x-line-signature');
  console.log(req.headers);
  console.log("rawBody: ", rawBody);
  console.log("LINE_CHANNEL_SECRET: ", LINE_CHANNEL_SECRET);
  console.log("signature: ", signature);
  console.log("validateSignature(rawBody, LINE_CHANNEL_SECRET, signature): ", validateSignature(rawBody, LINE_CHANNEL_SECRET, signature));
  if (LINE_CHANNEL_SECRET && !validateSignature(rawBody, LINE_CHANNEL_SECRET, signature)) {
    // res.sendStatus(403);
    res.status(403).json({ "line_channel_secret": LINE_CHANNEL_SECRET,
                            "!validateSignature(rawBody, LINE_CHANNEL_SECRET, signature)": !validateSignature(rawBody, LINE_CHANNEL_SECRET, signature) });
    return;
  }
  next();
};

export default validateLineSignature;
