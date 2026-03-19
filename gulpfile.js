const gulp = require('gulp');
const { default: rev } = require('gulp-rev');
const { default: revRewrite } = require('gulp-rev-rewrite');
const { deleteAsync } = require('del');
const { pipeline } = require('stream/promises');
const fse = require('fs-extra');
const path = require('path');
const fs = require('fs');

const paths = {
    src: 'src',
    dist: 'dist'
};

async function clean() {
    await deleteAsync([paths.dist]);
}

async function html() {
    await pipeline(
        gulp.src(`${paths.src}/index.html`),
        gulp.dest(paths.dist)
    );
}

/**
 * JS y CSS (versionados)
 */
async function assets() {
    await pipeline(
        gulp.src(
            [
                `${paths.src}/css/**/*.css`,
                `${paths.src}/js/**/*.js`
            ],
            { base: paths.src }
        ),
        rev(),
        gulp.dest(paths.dist),
        rev.manifest(),
        gulp.dest(paths.dist)
    );
}

/**
 * Imágenes y binarios (copiado directo)
 */
async function images() {
    const imagesDir = path.join(paths.src, 'images');
    const avatarsDir = path.join(paths.src, 'avatars');
    const faviconFile = path.join(paths.src, 'favicon.ico');
    const distDir = path.join(paths.dist);

    await fse.copy(imagesDir, path.join(distDir, 'images'));
    await fse.copy(avatarsDir, path.join(distDir, 'avatars'));
    // Favicon (raíz)
    //await fse.copy(path.join(paths.src, 'favicon.ico'), path.join(distDir, 'favicon.ico'));
    await fse.copy(faviconFile, path.join(distDir, 'favicon.ico'));
}

async function rewrite() {
    const manifest = fs.readFileSync(
        `${paths.dist}/rev-manifest.json`
    );

    await pipeline(
        gulp.src(`${paths.dist}/index.html`),
        revRewrite({ manifest }),
        gulp.dest(paths.dist)
    );
}

exports.build = gulp.series(
    clean,
    html,
    images,   // Antes de rewrite
    assets,
    rewrite
);
