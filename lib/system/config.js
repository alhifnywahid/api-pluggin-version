const creator = `Alhifny Wahid`;
global.ResponseFalse = (res, message) => {
	return res.json({
		status: false,
		creator,
		message,
	});
};
global.ResponseTrue = (res, result) => {
	return res.json({
		status: true,
		creator,
		result,
	});
};
