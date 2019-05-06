
/**
 * ベクトル管理クラス
 * @class
 */
class Vector {
    /**
     * @constructor
     * @param {number} [x] - x 座標
     * @param {number} [y] - y 座標
     */
    constructor(x, y){
        this.x = 0;
        this.y = 0;
        this.setPosition(x, y);
    }
    /**
     * XY 座標を設定する
     * @param {number} [x] - x 座標
     * @param {number} [y] - y 座標
     */
    setPosition(x, y){
        if(x != null){this.x = x;}
        if(y != null){this.y = y;}
    }
    /**
     * 自身に設定されている座標を返す
     * @return {object}
     * @property {number} x - x 座標
     * @property {number} y - y 座標
     */
    getPosition(){
        return {x: this.x, y: this.y};
    }
    /**
     * 自身の座標と指定された座標との間の距離を返す
     * @param {number} x - 対象となる点の x 座標
     * @param {number} y - 対象となる点の y 座標
     * @return {number} 二点間の距離
     */
    getDistance(x, y){
        let vx = this.x - x;
        let vy = this.y - y;
        return Vector.calcLength(vx, vy);
    }
    /**
     * ベクトルの長さを返す
     * @param {number} x - ベクトルの X 要素
     * @param {number} y - ベクトルの Y 要素
     * @return {number} ベクトルの長さ（大きさ）
     */
    static calcLength(x, y){
        return Math.sqrt(x * x + y * y);
    }
}

