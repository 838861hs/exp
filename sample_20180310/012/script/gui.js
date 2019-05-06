
/**
 * サンプル用の GUI インスタンス
 * @class
 */
class Gui {
    /**
     * @constructor
     */
    constructor(){
        /**
         * GUI を包んでいる一番外側の DOM
         * @type {HTMLElement}
         */
        this.wrap    = document.createElement('div');
        /**
         * GUI タイトル部分の DOM
         * @type {HTMLElement}
         */
        this.title   = document.createElement('div');
        /**
         * GUI コンソール部分を包む DOM
         * @type {HTMLElement}
         */
        this.pre     = document.createElement('pre');
        /**
         * GUI コンソール部分の DOM
         * @type {HTMLElement}
         */
        this.console = document.createElement('code');

        this.wrap.style.backgroundColor = 'rgba(32, 32, 32, 0.5)';
        this.wrap.style.color           = 'white';
        this.wrap.style.width           = '25%';
        this.wrap.style.height          = '100%';
        this.wrap.style.position        = 'absolute';
        this.wrap.style.top             = '0px';
        this.wrap.style.right           = '0px';
        this.wrap.style.textShadow      = '0px 0px 5px black';
        this.wrap.style.pointerEvents   = 'none';

        this.title.textContent          = 'console:'
        this.title.style.fontSize       = 'medium';
        this.title.style.textAlign      = 'left';
        this.title.style.padding        = '5px 15px 10px';

        this.pre.style.textAlign        = 'left';
        this.pre.style.margin           = '5px 20px';
        this.pre.style.overflow         = 'auto';

        this.console.textContent        = 'new gui instance generate\nready\n';
        this.console.style.fontSize     = 'small';
        this.console.style.fontFamily   = 'Ricty, Monaco, consolas, monospace';

        this.wrap.appendChild(this.title);
        this.wrap.appendChild(this.pre);
        this.pre.appendChild(this.console);
        document.body.appendChild(this.wrap);
    }
    /**
     * GUI にデータを出力する
     * @param {string} dest - 出力したい文字や数値、オブジェクトなど
     */
    text(dest){
        switch(Object.prototype.toString.call(dest)){
            case '[object Null]':
                this.console.textContent = 'null';
                break;
            case '[object Undefined]':
                this.console.textContent = 'undefined';
                break;
            case '[object String]':
            case '[object Number]':
                this.console.textContent = dest;
                break;
            default:
                this.console.textContent = JSON.stringify(dest, null, '  ');
                break;
        }
    }
    /**
     * GUI にデータを追加出力する
     * @param {mixed} dest - 出力したい文字や数値、オブジェクトなど
     */
    log(dest){
        switch(Object.prototype.toString.call(dest)){
            case '[object Null]':
                this.console.textContent += 'null';
                break;
            case '[object Undefined]':
                this.console.textContent += 'undefined';
                break;
            case '[object String]':
            case '[object Number]':
                this.console.textContent += dest;
                break;
            default:
                this.console.textContent += JSON.stringify(dest, null, '  ');
                break;
        }
        this.console.textContent += '\n';
    }
}

