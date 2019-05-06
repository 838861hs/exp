
/**
 * ボール管理クラス
 * @class
 */
class Ball {
    /**
     * ライフがとり得る最大値
     * @type {number}
     */
    static get maxLife(){return 50;}
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
        this.life = Ball.maxLife;
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
     * ライフを返す
     * @return {number} 自身の life プロパティの値
     */
    getLife(){
        return this.life;
    }
    /**
     * 色を返す
     * @return {string} 自身の color プロパティの値
     */
    getColor(){
        return this.color;
    }
    /**
     * 設定されている進行方向とスピードで移動する
     */
    move(){
        let lifePower = this.life / Ball.maxLife;
        this.life = Math.max(this.life - 1, 0);
        this.x += this.velocityX * this.speed * lifePower;
        this.y += this.velocityY * this.speed * lifePower;
    }
}

