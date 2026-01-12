const fs = require('fs');
const path = require('path');

const chunksDir = '.next/dev/static/chunks';
const projectRoot = process.cwd();
console.log('Project Root:', projectRoot);

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

walkDir(chunksDir, (filePath) => {
  console.log('Processing:', filePath);
  if (filePath.endsWith('.js.map')) {
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      const map = JSON.parse(content);
      
      const processMap = (sourceMap) => {
        if (sourceMap.sources && sourceMap.sourcesContent) {
          sourceMap.sources.forEach((source, index) => {
            if (source.includes('/components/')) {
               console.log('Found component source:', source);
               let relativePath = source.split('/components/')[1];
               if (relativePath) {
                  relativePath = 'components/' + relativePath;
                  const content = sourceMap.sourcesContent[index];
                  if (content) {
                    const targetPath = path.join(projectRoot, relativePath);
                    const targetDir = path.dirname(targetPath);
                    if (!fs.existsSync(targetDir)) {
                      fs.mkdirSync(targetDir, { recursive: true });
                    }
                    fs.writeFileSync(targetPath, content);
                    console.log('Recovered:', relativePath);
                  }
               }
            }
          });
        }
      };

      if (map.sections) {
        map.sections.forEach(section => {
          if (section.map) {
            processMap(section.map);
          }
        });
      } else {
        processMap(map);
      }
    } catch (e) {
      console.error('Error processing', filePath, e);
    }
  }
});
