const ApiKey = require('./../models/ApiKey');

module.exports = apikey = async (req, res, next) => {
  const apiKey = req.headers['api-key'];
  if (!apiKey) return ResponseFalse(res, "api-key di butuhkan!, silahkan chat creator untuk mendapatkan api-key (+6285655207366)");

  try {
    const apiRecord = await ApiKey.findOne({ apiKey });
    if (!apiRecord) return ResponseFalse(res, "api-key tidak valid");

    if (apiRecord.usage < apiRecord.limit) { 
      await ApiKey.updateOne({ apiKey }, { $inc: { usage: 1 } });
      next();
    } else {
      return ResponseFalse(res, "Limit permintaan telah tercapai");
    }
  } catch (err) {
    console.error(err);
    return ResponseFalse(res, "Terjadi kesalahan dalam memeriksa apiKey");
  }
}; 