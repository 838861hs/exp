
(() => {
    let cu;
    let gui;
    window.addEventListener('load', () => {
        gui = new Gui();
        cu = new CanvasUtil(document.getElementById('canvas'));
        cu.matchSize();
        cu.clear();

        // 様々な引数を受け取り、汎用的に使えるようにした矩形描画命令を利用
        cu.fillRect(
            50,
            100,
            window.innerWidth / 2,
            window.innerHeight / 2,
            'rgba(255, 0, 0, 0.5)'
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
