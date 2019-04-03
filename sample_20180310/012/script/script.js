
(() => {
    let cu;
    let gui;
    let startTime;
    let nowTime;
    let vec;
    let balls;

    const CIRCLE_RADIUS = 20;
    const CIRCLE_SPEED = 5;
    const CIRCLE_COLOR = 'rgba(255, 64, 0, 0.8)';
    const CIRCLE_HIT_COLOR = 'rgba(0, 255, 0, 0.8)';
    const CIRCLE_CENTER_COLOR = 'rgba(0, 0, 255, 0.8)';

    window.addEventListener('load', () => {
        gui = new Gui();
        cu = new CanvasUtil(document.getElementById('canvas'));
        cu.matchSize();
        cu.clear();

        window.addEventListener('click', (eve) => {
            let x = eve.clientX - window.innerWidth / 2;
            let y = eve.clientY - window.innerHeight / 2;
            let normal = Vector.calcNormal(x, y);
            balls.push(new Ball(
                window.innerWidth / 2,
                window.innerHeight / 2,
                normal.x,
                normal.y,
                CIRCLE_SPEED
            ));
        }, false);

        balls = [];

        startTime = Date.now();

        render();
    }, false);

    function render(){
        nowTime = Date.now() - startTime;
        cu.clear();

        let centerX = window.innerWidth / 2;
        let centerY = window.innerHeight / 2;
        cu.fillCircle(centerX, centerY, CIRCLE_RADIUS, CIRCLE_CENTER_COLOR);

        // すべてのボールの位置をまず先に更新する
        balls.map((ball) => {
            ball.move();
        });

        // 再度すべてのボールに対して処理する
        balls.map((ball) => {
            let p = ball.getPosition();
            let color = CIRCLE_COLOR;

            // 自分以外のすべてのボールとの距離を測る
            balls.map((target) => {
                // 自身の場合は return で抜ける
                if(ball === target){return;}

                // 対象となるボールの現在位置
                let t = target.getPosition();

                // 距離を測る
                let distance = Vector.calcDistance(p.x, p.y, t.x, t.y);

                // 距離が一定以下だった場合は色を変更する
                if(distance <= CIRCLE_RADIUS * 2){
                    color = CIRCLE_HIT_COLOR;
                    return;
                }
            });
            cu.fillCircle(p.x, p.y, CIRCLE_RADIUS, color);

            // 進行方向を先に取得しておく
            let velocity = ball.getVelocity();

            // 画面の端に到達していた場合進行方向を反転させる
            if(p.x < 0 || p.x > window.innerWidth){
                // 横面の場合は X を反転
                ball.setVelocity(-velocity.x, velocity.y);
            }
            if(p.y < 0 || p.y > window.innerHeight){
                // 縦面の場合は Y を反転
                ball.setVelocity(velocity.x, -velocity.y);
            }
        });

        gui.text({count: balls.length});

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
