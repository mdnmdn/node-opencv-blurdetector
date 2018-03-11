const fs = require('fs');
const cv = require('opencv4nodejs');

const l = console.log.bind(console);

const variation = (mat) => {
    const meanMat =  mat.mean();
    const diffMat = mat.sub(meanMat);
    
    const [w, h] = diffMat.sizes;
    let total = 0;
    for(let x = 0; x < w; x++){
        for(let y = 0; y < h; y++){
            const v = diffMat.at(x,y);
            total += v*v;
        }
    }

    return Math.sqrt(total / (w * h));
};

const files = fs.readdirSync('./img/original');
//l(files);



files.filter(f => f.indexOf('.jpg') > 0)
    .forEach(f => {

    l(`processing ${f}`);
    const image = cv.imread(`./img/original/${f}`);
    const gray = image.cvtColor(cv.COLOR_BGR2GRAY);
    const laplacian = gray.laplacian(cv.CV_64F);
    
    //l(laplacian.std);
    //
    //cv.imwrite(`./img/output/lap2_${f}`, laplacian);
    const v = variation(laplacian);
    image.putText(
        Math.round(v).toString(),
        new cv.Point2(5, 25),
        cv.FONT_HERSHEY_SIMPLEX,
        0.7,
        new cv.Vec3(0, 0, 255),
        0, 20
    )
    cv.imwrite(`./img/output/${f}`, image);
    
});

return;


const laplacian = (image) => {
    cv.laplacian()
};

const image = cv.imread()


console.log(cv);