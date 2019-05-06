
/**
 * ベクトル管理クラス（static）
 * @class
 */
class Vector {
    /**
     * ベクトルの長さを返す
     * @param {number} x - ベクトルの X 要素
     * @param {number} y - ベクトルの Y 要素
     * @return {number} ベクトルの長さ（大きさ）
     */
    static calcLength(x, y){
        return Math.sqrt(x * x + y * y);
    }
    /**
     * 二点間の距離を返す
     * @param {number} x0 - ひとつ目の地点の X 座標
     * @param {number} y0 - ひとつ目の地点の Y 座標
     * @param {number} x1 - ふたつ目の地点の X 座標
     * @param {number} y1 - ふたつ目の地点の Y 座標
     * @return {number} 二点間の距離
     */
    static calcDistance(x0, y0, x1, y1){
        let x = x1 - x0;
        let y = y1 - y0;
        return Vector.calcLength(x, y);
    }
    /**
     * ベクトルを正規化した結果を返す
     * @param {number} x - ベクトルの X 要素
     * @param {number} y - ベクトルの Y 要素
     * @return {object}
     * @property {number} x - ベクトルの X 要素
     * @property {number} y - ベクトルの Y 要素
     */
    static calcNormal(x, y){
        let l = Vector.calcLength(x, y);
        if(l === 0){
            return {x: 0, y: 0};
        }
        return {x: x / l, y: y / l};
    }
}

