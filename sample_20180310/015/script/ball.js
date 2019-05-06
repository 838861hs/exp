
/**
 * ボール管理クラス
 * @class
 */
class Ball {
    /**
     * @constructor
     * @param {number} x - x 座標
     * @param {number} y - y 座標
     * @param {number} vx - 進行方向ベクトルの X 要素
     * @param {number} vy - 進行方向ベクトルの Y 要素
     * @param {number} speed - スピード
     * @param {string} color - 色
     */
    constructor(x, y, vx, vy, speed, color){
        this.x = x;
        this.y = y;
        this.velocityX = vx;
        this.velocityY = vy;
        this.speed = speed;
        this.color = color;
        this.seeds = [
            Math.random(),
            Math.random(),
            Math.random()
        ];
    }
    /**
     * XY 座標を設定する
     * @param {number} x - x 座標
     * @param {number} y - y 座標
     */
    setPosition(x, y){
        this.x = x;
        this.y = y;
    }
    /**
     * 進行方向ベクトルを設定する
     * @param {number} x - 進行方向ベクトルの X 要素
     * @param {number} y - 進行方向ベクトルの Y 要素
     */
    setVelocity(x, y){
        this.velocityX = x;
        this.velocityY = y;
    }
    /**
     * 進行速度を設定する
     * @param {number} speed - 進行速度
     */
    setSpeed(speed){
        this.speed = speed;
    }
    /**
     * XY 座標を返す
     * @return {object}
     * @property {number} x - x 座標
     * @property {number} y - y 座標
     */
    getPosition(){
        return {x: this.x, y: this.y};
    }
    /**
     * 進行方向ベクトルを返す
     * @return {object}
     * @property {number} x - 進行方向ベクトルの X 要素
     * @property {number} y - 進行方向ベクトルの Y 要素
     */
    getVelocity(){
        return {x: this.velocityX, y: this.velocityY};
    }
    /**
     * 色を返す
     * @return {string} 自身の color プロパティの値
     */
    getColor(){
        return this.color;
    }
    /**
     * シードを含む配列返す
     * @return {string} 自身の seeds プロパティの値
     */
    getSeeds(){
        return this.seeds;
    }
    /**
     * 設定されている進行方向とスピードで移動する
     * @param {number} time - シード値との計算に使われる経過時間
     */
    move(time){
        // time はミリ秒なので数値が大きくなりすぎるため補正する
        let t = time / 1000;

        // シード値に応じて時間の経過速度が変化する
        let seedTime = t * this.seeds[0];

        // シード値で変換した時間経過でサインコサインを求め、
        // さらにシード値でどの程度動くのかをランダムに変える
        let seedX = Math.cos(seedTime) * this.seeds[1];
        let seedY = Math.sin(seedTime) * this.seeds[2];

        // シード値由来の値の影響を加えて座標を動かす
        this.x += this.velocityX * this.speed + seedX;
        this.y += this.velocityY * this.speed + seedY;
    }
}

