
(() => {
    let cu;
    let gui;
    let startTime;
    let nowTime;
    let vec;

    const LINE_COLOR = 'rgba(64, 64, 64, 0.8)';

    window.addEventListener('load', () => {
        gui = new Gui();
        cu = new CanvasUtil(document.getElementById('canvas'));
        cu.matchSize();
        cu.clear();

        vec = new Vector(0, 0);

        window.addEventListener('mousemove', (eve) => {
            vec.setPosition(eve.clientX, eve.clientY);
        }, false);

        startTime = Date.now();

        render();
    }, false);

    function render(){
        nowTime = Date.now() - startTime;
        cu.clear();

        // 基準となる位置（ここではこれを始点とみなす）
        let tx = window.innerWidth / 2;
        let ty = window.innerHeight / 2;

        // Vector インスタンスの持つ座標（ここではこれを終点とみなす）
        let p = vec.getPosition();

        // 終点－始点とすることで、二点間を結ぶベクトルを求める
        let vx = p.x - tx;
        let vy = p.y - ty;

        // 求めたベクトルを正規化（長さを１に変換）する
        let normal = Vector.calcNormal(vx, vy);

        // 正規化したベクトルを描画する（短すぎるので１００倍している）
        cu.strokeLine(
            tx,
            ty,
            tx + normal.x * 100,
            ty + normal.y * 100,
            5,
            LINE_COLOR
        );

        gui.text({normal: normal});

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
