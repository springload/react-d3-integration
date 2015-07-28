import path from 'path';

const rootPath = path.join('./');
const appPath = path.join(rootPath, 'src');

export default {
    paths: {
        root: rootPath,
        js: path.join(appPath, 'js'),
        assets: path.join(rootPath, 'public')
    }
};
