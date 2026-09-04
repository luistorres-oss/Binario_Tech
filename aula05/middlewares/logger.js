function loggerMiddleware(req, res, next) {
	const inicios = Date.now();
	const timestamp = new Date().toISOString();

	res.on('finish', () => {
		const duracao = Date.now() - inicio;
		console.log(`[LOG ${timestamp}] ${req.method} ${req.originalUrl} - Status: ${res.statusCode} (${duracao}ms)`);
	});

	next();
  }

module.exports = loggerMiddleware;
