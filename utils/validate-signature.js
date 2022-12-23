import {
  createHmac,
  timingSafeEqual,
} from 'crypto';

const s2b = (str, encoding) => Buffer.from(str, encoding);

const safeCompare = (a, b) => {
  console.log("a: ", a);
  console.log("b: ", b);
  if (a.length !== b.length) {
    return false;
  }
  console.log("Timing safe Equal of a, b: ", timingSafeEqual(a, b));
  console.log("Timing safe Equal of a, a: ", timingSafeEqual(a, a));
  console.log("Timing safe Equal of b, b: ", timingSafeEqual(b, b));
  return timingSafeEqual(a, b);
};

const validateSignature = (
  body,
  secret,
  signature,
) => safeCompare(
  createHmac('SHA256', secret).update(body).digest(),
  s2b(signature, 'base64'),
);

export default validateSignature;
