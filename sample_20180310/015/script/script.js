
(() => {
    let cu;
    let gui;
    let startTime;
    let nowTime;
    let vec;
    let balls;

    const CIRCLE_COUNT = 200;
    const CIRCLE_RADIUS = 10;
    const CIRCLE_MIN_SPEED = 1;
    const CIRCLE_ADD_SPEED = 3;
    const CIRCLE_COLOR = 'rgba(245, 245, 255, 0.5)';

    window.addEventListener('load', () => {
        gui = new Gui();
        cu = new CanvasUtil(document.getElementById('canvas'));
        cu.matchSize();
        cu.clear();

        // 初期状態をボールが生成された状態にする
        balls = [];
        for(let i = 0; i < CIRCLE_COUNT; ++i){
            // 初期位置
            let x = Math.random() * window.innerWidth;
            let y = Math.random() * window.innerHeight;

            // ランダムに進行方向を決める
            // ただし全体としては右下に向かうように進行方向を調整する
            let rotatePower = (Math.PI / 4) + (Math.PI / 4 * Math.random());
            let vx = Math.cos(rotatePower);
            let vy = Math.sin(rotatePower);

            // ランダムにスピードを変える
            let speedPower = CIRCLE_MIN_SPEED + Math.random() * CIRCLE_ADD_SPEED;

            // ボールを生成する
            balls.push(new Ball(
                x,
                y,
                vx,
                vy,
                speedPower,
                CIRCLE_COLOR
            ));
        }

        startTime = Date.now();

        render();
    }, false);

    function render(){
        nowTime = Date.now() - startTime;

        cu.fillRect(0, 0, window.innerWidth, window.innerHeight, 'black');

        // すべてのボールの位置を更新する
        balls.map((ball, index) => {
            // ボールを動かす
            ball.move(nowTime);

            // ボールを描く
            let position = ball.getPosition();

            // ボールが画面外に出ていたら反対側に出現させる
            if(position.x < -CIRCLE_RADIUS){
                // 左端よりも左にいるので右端の同じ高さに移動させる
                position.x = window.innerWidth + CIRCLE_RADIUS;
                ball.setPosition(position.x, position.y);
            }
            if(position.x > window.innerWidth + CIRCLE_RADIUS){
                // 右端よりも右にいるので左端の同じ高さに移動させる
                position.x = -CIRCLE_RADIUS;
                ball.setPosition(position.x, position.y);
            }
            if(position.y < -CIRCLE_RADIUS){
                // 上端よりも上にいるので下端の同じ横位置に移動させる
                position.y = window.innerHeight + CIRCLE_RADIUS;
                ball.setPosition(position.x, position.y);
            }
            if(position.y > window.innerHeight + CIRCLE_RADIUS){
                // 下端よりも下にいるので上端の同じ横位置に移動させる
                position.y = -CIRCLE_RADIUS;
                ball.setPosition(position.x, position.y);
            }

            // 色はボール自身に設定されているものを使う
            let color = ball.getColor();

            cu.fillCircle(
                position.x,
                position.y,
                CIRCLE_RADIUS,
                color
            );
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
            this.ctx.globalCompositeOperation = 'lighter';
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
