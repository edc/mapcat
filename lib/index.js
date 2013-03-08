var SourceMapConsumer, SourceMapGenerator, path, readFileSync, writeFileSync, _ref, _ref2;

_ref = require('fs'), readFileSync = _ref.readFileSync, writeFileSync = _ref.writeFileSync;

path = require('path');

_ref2 = require('source-map'), SourceMapConsumer = _ref2.SourceMapConsumer, SourceMapGenerator = _ref2.SourceMapGenerator;

exports.cat = function(inputMapFiles, outJSFile, outMapFile) {
  var buffer, f, generator, lineOffset, map, src, srcPath, _i, _len;
  buffer = [];
  generator = new SourceMapGenerator({
    file: outJSFile
  });
  lineOffset = 0;
  for (_i = 0, _len = inputMapFiles.length; _i < _len; _i++) {
    f = inputMapFiles[_i];
    map = new SourceMapConsumer(readFileSync(f, 'utf-8'));
    srcPath = path.join(path.dirname(f), map.file);
    src = readFileSync(srcPath, 'utf-8');
    src = src.replace(/\/\/@\ssourceMappingURL[^\r\n]*/g, '//');
    buffer.push(src);
    map.eachMapping(function(mapping) {
      var origSrc;
      origSrc = path.join(path.dirname(f), mapping.source);
      mapping = {
        generated: {
          line: mapping.generatedLine + lineOffset,
          column: mapping.generatedColumn
        },
        original: {
          line: mapping.originalLine,
          column: mapping.originalColumn
        },
        source: path.relative(path.dirname(outMapFile), origSrc)
      };
      return generator.addMapping(mapping);
    });
    lineOffset += src.split('\n').length;
  }
  buffer.push("//@ sourceMappingURL=" + (path.relative(path.dirname(outJSFile), outMapFile)));
  writeFileSync(outJSFile, buffer.join('\n'), 'utf-8');
  return writeFileSync(outMapFile, generator.toString(), 'utf-8');
};
