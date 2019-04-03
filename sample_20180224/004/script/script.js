
(() => {
    let cu;
    let gui;
    window.addEventListener('load', () => {
        gui = new Gui();
        cu = new CanvasUtil(document.getElementById('canvas'));
        cu.matchSize();
        cu.clear();
        cu.fillRect(
            50,
            100,
            window.innerWidth / 2,
            window.innerHeight / 2,
            'rgba(255, 0, 0, 0.5)'
        );
        cu.fillCircle(
            window.innerWidth / 2,
            window.innerHeight / 2,
            200,
            'rgba(0, 255, 0, 0.5)'
        );

        // ライン（線）を描画する命令を利用
        cu.strokeLine(
            window.innerWidth / 2,
            window.innerHeight / 2,
            50,
            100,
            5,
            'rgba(0, 0, 255, 0.5)'
        );
    }, false);

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
            gui.log(`x0 = ${x0}, y0 = ${y0}, x1 = ${x1}, y1 = ${y1}, width = ${lineWidth}`);
            gui.log(`color = ${color}`);
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
            gui.log(`x = ${x}, y = ${y}, radius = ${rad}`);
            gui.log(`color = ${color}`);
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
            gui.log(`x = ${x}, y = ${y}, w = ${w}, h = ${h}`);
            gui.log(`color = ${color}`);
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
