//hey Eddie I told you I extended the math class
//seeded random number gen
Math.seed = 6;
Math.seededRandom = function (max, min) {
    max = max || 1;
    min = min || 0;

    Math.seed = (Math.seed * 9301 + 49297) % 233280;
    var rnd = Math.seed / 233280;

    return min + rnd * (max - min);
}

function get2DArray(size) {
    var map = [];
    for (var i = 0; i < size; i++) {
        map.push([]);
        for (var j = 0; j < size; j++) {
            map[i].push(0);
        }
    }
    
    return map;
}

var size = 64;
var map = get2DArray(size);
for (var i = 0; i < size; i++) {
    for (var j = 0; j < size; j++) {
        map[i][j] = ~~Math.seededRandom(2, 0);
    }
}

var smoothness = 3;
for (var i = 0; i < smoothness; i++) {
    var new_map = get2DArray(size);
    for (var x = 0; x < size; x++) {
        for (var y = 0; y < size; y++) {
            var x_range = {low: Math.max(0, x - 1), high: Math.min(size - 1, x + 1)};  
            var y_range = {low: Math.max(0, y - 1), high: Math.min(size - 1, y + 1)};  
            var wall_count = 0;
            for (var a = x_range.low; a <= x_range.high; a++) {
                for (var b = y_range.low; b <= y_range.high; b++) {
                    if ((a == x) && (b == y))
                        continue;
                    
                    wall_count += 1 - map[a][b];
                }
            }
            if (((map[x][y] == 0) && (wall_count >= 4)) ||
                ((map[x][y] == 1) && (wall_count >= 5)) ||
                ((x == 0) || (y == 0) || (x == size - 1) || (y == size - 1)))
                    new_map[x][y] = 0;
            else
                new_map[x][y] = 1;
        }
    }
    map = new_map;
}

//texture generation function from webgl geometry terrain generation example
function generateTexture( data, width, height ) {

var canvas, canvasScaled, context, image, imageData,
level, diff, vector3, sun, shade;

vector3 = new THREE.Vector3( 0, 0, 0 );

sun = new THREE.Vector3( 1, 1, 1 );
sun.normalize();

canvas = document.createElement( 'canvas' );
canvas.width = width;
canvas.height = height;

context = canvas.getContext( '2d' );
context.fillStyle = '#000';
context.fillRect( 0, 0, width, height );

image = context.getImageData( 0, 0, canvas.width, canvas.height );
imageData = image.data;

for ( var i = 0, j = 0, l = imageData.length; i < l; i += 4, j ++ ) {

	vector3.x = data[ j - 2 ] - data[ j + 2 ];
	vector3.y = 2;
	vector3.z = data[ j - width * 2 ] - data[ j + width * 2 ];
	vector3.normalize();

	shade = vector3.dot( sun );

	imageData[ i ] = ( 96 + shade * 128 ) * ( 0.5 + data[ j ] * 0.007 );
	imageData[ i + 1 ] = ( 32 + shade * 96 ) * ( 0.5 + data[ j ] * 0.007 );
	imageData[ i + 2 ] = ( shade * 96 ) * ( 0.5 + data[ j ] * 0.007 );
}

context.putImageData( image, 0, 0 );

// Scaled 4x

canvasScaled = document.createElement( 'canvas' );
canvasScaled.width = width * 4;
canvasScaled.height = height * 4;

context = canvasScaled.getContext( '2d' );
context.scale( 4, 4 );
context.drawImage( canvas, 0, 0 );

image = context.getImageData( 0, 0, canvasScaled.width, canvasScaled.height );
imageData = image.data;

for ( var i = 0, l = imageData.length; i < l; i += 4 ) {

	var v = ~~ ( Math.random() * 5 );

	imageData[ i ] += v;
	imageData[ i + 1 ] += v;
	imageData[ i + 2 ] += v;

}

context.putImageData( image, 0, 0 );
	return canvasScaled;
};