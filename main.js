/*

Adventure Time
with Dean and Eddie

created by goodeddie

April 2012

*/

window.onload = function () {
    enchant();

    var game = new Game(320, 320);
    game.onload = function () {
        var scene = new Scene();
        var label = new Label("test");
        scene.addChild(label);
        game.pushScene(scene);
    };
game.start();
}
