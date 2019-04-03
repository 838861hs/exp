
(() => {
    let cu;
    let gui;
    let startTime;
    let nowTime;
    let img;

    const IMAGE_SIZE = 512;

    window.addEventListener('load', () => {
        gui = new Gui();
        cu = new CanvasUtil(document.getElementById('canvas'));
        cu.matchSize();
        cu.clear();

        img = new Image();
        img.addEventListener('load', () => {
            startTime = Date.now();
            render()
        }, false);
        img.src = 'sample.jpg';

    }, false);

    function render(){
        nowTime = Date.now() - startTime;
        cu.clear();

        // まず canvas 上（左上隅）に画像を描画する
        cu.drawImage(img, 0, 0);

        // ImageData を canvas から取得する
        let imageData = cu.getImageData(0, 0, IMAGE_SIZE, IMAGE_SIZE);

        // ImageData を加工するためループを回す
        for(let i = 0; i < IMAGE_SIZE; ++i){
            for(let j = 0; j < IMAGE_SIZE; ++j){

                // 取得するピクセルのインデックスを求める
                let index = i * IMAGE_SIZE + j;

                // 各ピクセルは RGBA のチャンネルを持つので４倍する
                index *= 4;

                // RGB の各値を取得
                let R = imageData.data[index];
                let G = imageData.data[index + 1];
                let B = imageData.data[index + 2];

                // RGB をすべて足して平均化する
                let gray = (R + G + B) / 3;

                // ImageData に書き戻す
                imageData.data[index]     = gray;
                imageData.data[index + 1] = gray;
                imageData.data[index + 2] = gray;
            }
        }

        // ImageData を右側にずらした位置に書き込む
        cu.putImageData(imageData, IMAGE_SIZE, 0);

        // requestAnimationFrame(render);
    }

    function easeInCubic(t){
        return t * t * t;
    }

    function easeOutCubic(t){
        return (--t) * t * t + 1;
    }

    /**
     * canvas 2d context を操作するクラス
     * @class
     */
    class CanvasUtil {
        /**
         * @constructor
         * @param {HTMLCanvasElement} canvas - このインスタンスに紐付ける canvas
         */
        constructor(canvas){
            this.canvas = canvas;
            this.ctx = this.canvas.getContext('2d');
        }
        /**
         * canvas 全体をクリアする
         */
        clear(){
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        }
        /**
         * canvas に文字列を描画する
         * @param {string} text - 描画する文字列
         * @param {number} x - 文字列描画の基準位置の x 座標
         * @param {number} y - 文字列描画の基準位置の y 座標
         * @param {number} [maxWidth] - 文字列を描画できる最大幅
         * @param {string} [font] - フォントの指定（CSS Style）
         * @param {string} [color] - 塗りつぶす色（CSS Style）
         */
        fillText(text, x, y, maxWidth, font, color){
            if(font != null){
                this.ctx.font = font;
            }
            if(color != null){
                this.ctx.fillStyle = color;
            }
            if(maxWidth != null){
                this.ctx.fillText(text, x, y, maxWidth);
            }else{
                this.ctx.fillText(text, x, y);
            }
        }
        /**
         * canvas にラインを stroke モードで描く
         * @param {number} x0 - ラインの始点の x 座標
         * @param {number} y0 - ラインの始点の y 座標
         * @param {number} x1 - ラインの終点の x 座標
         * @param {number} y1 - ラインの終点の y 座標
         * @param {number} [lineWidth=1] - ラインの幅
         * @param {string} [color] - ラインの色（CSS Style）
         */
        strokeLine(x0, y0, x1, y1, lineWidth = 1, color){
            if(color != null){
                this.ctx.strokeStyle = color;
            }
            this.ctx.beginPath();
            this.ctx.lineWidth = lineWidth;
            this.ctx.moveTo(x0, y0);
            this.ctx.lineTo(x1, y1);
            this.ctx.closePath();
            this.ctx.stroke();
        }
        /**
         * canvas に矩形を fill モードで描く
         * @param {number} x - 円の中心位置の x 座標
         * @param {number} y - 円の中心位置の y 座標
         * @param {number} rad - 円の半径
         * @param {string} [color] - 塗りつぶす色（CSS Style）
         */
        fillCircle(x, y, rad, color){
            if(color != null){
                this.ctx.fillStyle = color;
            }
            this.ctx.beginPath();
            this.ctx.arc(x, y, rad, 0, Math.PI * 2, false);
            this.ctx.closePath();
            this.ctx.fill();
        }
        /**
         * canvas に矩形を fill モードで描く
         * @param {number} x - 矩形の左上角の x 座標
         * @param {number} y - 矩形の左上角の y 座標
         * @param {number} w - 矩形の幅
         * @param {number} h - 矩形の高さ
         * @param {string} [color] - 塗りつぶす色（CSS Style）
         */
        fillRect(x, y, w, h, color){
            if(color != null){
                this.ctx.fillStyle = color;
            }
            this.ctx.fillRect(x, y, w, h);
        }
        /**
         * canvas に画像を描く
         * @param {HTMLImageElement} image - 描画する画像
         * @param {number} x - 画像を描画する際の矩形の左上角座標 X
         * @param {number} y - 画像を描画する際の矩形の左上角座標 Y
         */
        drawImage(image, x, y){
            this.ctx.drawImage(image, x, y);
        }
        /**
         * canvas から ImageData オブジェクトを取得する
         * @param {number} x - 取得対象の矩形の左上角座標 X
         * @param {number} y - 取得対象の矩形の左上角座標 Y
         * @param {number} w - 取得する矩形の横幅
         * @param {number} h - 取得する矩形の縦幅
         * @return {ImageData} ImageData オブジェクト
         */
        getImageData(x, y, w, h){
            return this.ctx.getImageData(x, y, w, h);
        }
        /**
         * canvas から ImageData オブジェクトを取得する
         * @param {ImageData} data - ImageData オブジェクト
         * @param {number} x - 取得対象の矩形の左上角座標 X
         * @param {number} y - 取得対象の矩形の左上角座標 Y
         */
        putImageData(data, x, y){
            this.ctx.putImageData(data, x, y);
        }
        /**
         * canvas の大きさをウィンドウサイズに揃える
         */
        matchSize(){
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
        }
    }
})();
