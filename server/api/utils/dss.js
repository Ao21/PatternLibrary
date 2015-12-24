exports.angularParser = function (i, line, block, file) {
	var nextParserIndex = block.indexOf('* @', i + 1),
		markupLength = nextParserIndex > -1 ? nextParserIndex - i : block.length,
		markup = block.split('').splice(i, markupLength).join('');

	markup = (function (markup) {
		var ret = [],
			lines = markup.split('\n');

		lines.forEach(function (line) {
			var pattern = '*',
				index = line.indexOf(pattern);

			if (index > 0 && index < 10)
				line = line.split('').splice((index + pattern.length), line.length).join('');

			// multiline
			if (lines.length <= 2)
				line = dss.trim(line);

			if (line && line != '@angular')
				ret.push(line);

		});
		return ret.join('\n');
	})(markup);

	return {
		example: markup,
		escaped: markup.replace(/</g, '&lt;').replace(/>/g, '&gt;')
	};
}

exports.singleLineParser = function (i, line, block, file) {
	return line;
}