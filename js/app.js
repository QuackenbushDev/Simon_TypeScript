/**
* Created by christopher on 11/10/13.
*/
/// <reference path="d.ts/DefinitelyTyped/jquery/jquery.d.ts" />
var Simon = (function () {
    function Simon() {
        this.level = 0;
        this.possible_moves = ["Red", "Blue", "Green", "Yellow"];
        this.sequence = [];
        this.move = 0;
        this.light_colours = {
            "Red": "#feaaa8",
            "Blue": "#6a79ff",
            "Green": "#a4fcad",
            "Yellow": "#fbfdad"
        };
        this.next_level();
    }
    Simon.prototype.click = function (colour) {
        this.blink_colour(colour);
        if (this.validate_move(colour)) {
            this.move++;

            if (this.move >= this.level) {
                this.next_level();
            }
        } else {
            this.game_over();
        }
    };

    Simon.prototype.validate_move = function (move) {
        return (this.sequence[this.move] === move);
    };

    Simon.prototype.blink_colour = function (colour) {
        var object = $("#" + colour);
        var old_colour = object.css('background-color');
        var speed = 300;

        object.animate({
            'background-color': this.light_colours[colour]
        }, speed);

        object.animate({
            'background-color': old_colour
        }, speed);
    };

    Simon.prototype.play_moves = function (index) {
        if (typeof index === "undefined") { index = 0; }
        var _this = this;
        setTimeout(function () {
            _this.blink_colour(_this.sequence[index]);

            index++;
            if (index < _this.sequence.length) {
                _this.play_moves(index);
            }
        }, 2000);
    };

    Simon.prototype.game_over = function () {
        this.move = 0;
        this.sequence = [];
        this.next_level();
    };

    Simon.prototype.next_level = function () {
        this.level += 1;
        this.move = 0;
        this.generate_next_move();
        this.play_moves();
    };

    Simon.prototype.generate_next_move = function () {
        var move = Math.floor(Math.random() * 3);
        this.sequence.push(this.possible_moves[move]);
    };
    return Simon;
})();

$('document').ready(function () {
    var s = new Simon();
    $('.colour').click(function () {
        var id = $(this).attr('id');
        s.click(id);
    });
});
//# sourceMappingURL=app.js.map
