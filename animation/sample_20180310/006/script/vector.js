
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
}

