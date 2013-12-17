ig.module
( 
	'game.gameover' 
)
.requires
(
	'impact.game'
)
.defines(function()
{
	Gameover = ig.Game.extend(
	{
		font: new ig.Font('media/04b03.font.png'),

		init: function()
		{
		},

		update: function()
		{
			this.parent();

			if (ig.input.pressed("click1"))
				ig.system.setGame(Game);
		},

		draw: function()
		{
			this.parent();

			this.font.draw("THANKS FOR PLAYING! :)\n\n\nLUDUM DARE 28 GAME\nBY DANIEL BAUMARTZ\nMYYYVOTHRR.DE", 256, 146, ig.Font.ALIGN.CENTER);
		}
	});
});