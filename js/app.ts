/**
 * Created by christopher on 11/10/13.
 */

/// <reference path="d.ts/DefinitelyTyped/jquery/jquery.d.ts" />

class Simon {
	public level: number = 0;
	private possible_moves: string[] = ["Red", "Blue", "Green", "Yellow"];
	private sequence: string[] = [];
	private move: number = 0;
	private light_colours = {
		"Red":    "#feaaa8",
		"Blue":   "#6a79ff",
		"Green":  "#a4fcad",
		"Yellow": "#fbfdad"
	};

	constructor() {
		this.next_level();
	}

	public click(colour: string) {
		this.blink_colour(colour);
		if (this.validate_move(colour)) {
			this.move++;

			if (this.move >= this.level) {
				this.next_level();
			}
		} else {
			this.game_over();
		}
	}

	private validate_move(move: string): boolean {
		return (this.sequence[this.move] === move);
	}

	private blink_colour(colour: string) {
		var object = $("#" + colour);
		var old_colour = object.css('background-color');
		var speed = 300;

		object.animate({
			'background-color': this.light_colours[colour]
		}, speed);

		object.animate({
			'background-color': old_colour
		}, speed);
	}

	private play_moves(index: number = 0) {
		setTimeout(() => {
			this.blink_colour(this.sequence[index]);

			index++;
			if (index < this.sequence.length) {
				this.play_moves(index);
			}
		}, 2000);
	}

	private game_over() {
		this.move = 0;
		this.sequence = [];
		this.next_level();
	}

	private next_level() {
		this.level += 1;
		this.move = 0;
		this.generate_next_move();
		this.play_moves();
	}

	private generate_next_move(): void {
		var move: number = Math.floor(Math.random() * 3);
		this.sequence.push(this.possible_moves[move]);
	}
}

$('document').ready(function () {
	var s = new Simon();
	$('.colour').click(function () {
		var id: string = $(this).attr('id');
		s.click(id);
	});
});

