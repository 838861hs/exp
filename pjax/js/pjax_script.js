(function() {


    var init = function () {
        // イベント処理
        events();

        // Views
        Top.init();

        // Barba.js 実行
        Barba.Pjax.start();
    };


    var events = function () {
        //
        // リンククリック後にCSSアニメーション用のクラスを追加
        //
        Barba.Dispatcher.on('linkClicked', function(HTMLElement, MouseEvent) {
            document.body.classList.add('is-transition-start');
        });

        //
        // ページ読み込み後にCSSアニメーション用のクラスを削除
        //
        Barba.Dispatcher.on('transitionCompleted', function(HTMLElement, MouseEvent) {
            document.body.classList.remove('is-transition-start');
        });

        //
        // 各ページごとに処理を実行したい場合
        //
        Barba.Dispatcher.on('newPageReady', function(currentStatus, oldStatus, container) {
            switch (currentStatus.namespace) {
            case 'top':
                // index.htmlで実行させたい処理
                console.log('topで実行されました');
                break;
            case 'page1':
                // page1.htmlで実行させたい処理
                console.log('page1で実行されました');
                break;
            case 'page2':
                // page2.htmlで実行させたい処理
                console.log('page2で実行されました');
                break;
            }
        });
    };


    var Top = Barba.BaseView.extend({
        namespace: 'top',
        onEnter: function () {
            // 新しいコンテナの準備が完了したとき
            console.log('準備完了');
        },
        onEnterCompleted: function () {
            // 準備されたコンテナへの遷移が完了したとき
            console.log('遷移完了');
        },
        onLeave: function () {
            // 新しいページへの遷移が開始されたとき
            console.log('遷移開始');
        },
        onLeaveCompleted: function () {
            // 遷移が完了し、古いコンテナがDOMから削除されたとき
            console.log('遷移完了');
        }
    });


    init();
})();