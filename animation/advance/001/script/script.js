
(() => {
    let cu;
    let gui;
    let startTime;
    let nowTime;

    const CIRCLE_RADIUS = 10;
    const CIRCLE_COLOR = 'rgba(255, 0, 255, 0.8)';
    const CIRCLE_CENTER_COLOR = 'rgba(0, 0, 255, 0.8)';

    // window.addEventListener('load', () => {
    //     gui = new Gui();
    //     cu = new CanvasUtil(document.getElementById('canvas'));
    //     cu.matchSize();
    //     cu.clear();

    //     startTime = Date.now();

    //     render();
    }, false);

    function render(){
        nowTime = Date.now() - startTime;
        cu.clear();

        // 中心座標を求め、中心位置がわかりやすいように円をひとつ描画
        let centerX = window.innerWidth / 2;
        let centerY = window.innerHeight / 2;
        cu.fillCircle(centerX, centerY, CIRCLE_RADIUS, CIRCLE_CENTER_COLOR);

        // 経過時間を % 演算し、度数として利用する
        let degrees = Math.floor(nowTime) % 360;

        // 度数をラジアンに変換する
        let radians = degrees * Math.PI / 180;

        // 変換したラジアンを用いてサインとコサインを求める
        // ※ 100 倍しているのはどうしてだろう？
        let s = Math.sin(radians) * 100;
        let c = Math.cos(radians) * 100;

        // サインとコサインから得た値を中心座標に加え、円を描画
        let x = centerX + c;
        // let y = centerY + s;
        cu.fillCircle(x, y, CIRCLE_RADIUS, CIRCLE_COLOR);

        gui.text({radian: radians, sin: s / 100, cos: c / 100});

        requestAnimationFrame(render);
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
         * canvas に矩形を fill モードで描く
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
         * canvas の大きさをウィンドウサイズに揃える
         */
        matchSize(){
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
        }
    }
})();
