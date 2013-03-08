{readFileSync, writeFileSync} = require('fs')
path = require('path')
{SourceMapConsumer, SourceMapGenerator} = require('source-map')

exports.cat = (inputMapFiles, outJSFile, outMapFile) ->
    buffer = []
    generator = new SourceMapGenerator
        file: outJSFile

    lineOffset = 0
    for f in inputMapFiles
        map = new SourceMapConsumer(readFileSync(f, 'utf-8'))

        # concatenate the file
        srcPath = path.join(path.dirname(f), map.file)
        src = readFileSync(srcPath, 'utf-8')
        src = src.replace(/\/\/@\ssourceMappingURL[^\r\n]*/g, '//')
        buffer.push(src)

        # add all mappings in this file
        map.eachMapping (mapping) ->
            origSrc = path.join(path.dirname(f), mapping.source)
            mapping =
                generated:
                    line: mapping.generatedLine + lineOffset
                    column: mapping.generatedColumn
                original:
                    line: mapping.originalLine
                    column: mapping.originalColumn
                source: path.relative(path.dirname(outMapFile), origSrc)
            generator.addMapping mapping

        # update line offset so we could start working with the next file
        lineOffset += src.split('\n').length

    buffer.push "//@ sourceMappingURL=#{path.relative(path.dirname(outJSFile), outMapFile)}"

    writeFileSync(outJSFile, buffer.join('\n'), 'utf-8')
    writeFileSync(outMapFile, generator.toString(), 'utf-8')
