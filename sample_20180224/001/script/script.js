
// グローバル汚染を避けるために即時関数を使って全体を囲う
(() => {
    let cu;  // CanvasUtil のインスタンス用
    let gui; // Gui のインスタンス用

    // ページのロードが完了したときに発火する load イベントを登録する
    window.addEventListener('load', () => {
        // Gui インスタンスの生成
        gui = new Gui();

        // CanvasUtil インスタンスの生成
        cu = new CanvasUtil(document.getElementById('canvas'));

        // サイズをウィンドウに揃える
        cu.matchSize();

        // 内容をクリアする
        cu.clear();

        // 色を塗る
        cu.fill();
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
         */
        fill(){
            this.ctx.fillRect(0, 0, this.110, this.canvas.height / 2);
            gui.log('run fillRect');
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
