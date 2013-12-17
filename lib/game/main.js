ig.module
( 
	'game.main' 
)
.requires
(
//	'impact.debug.debug',
	'game.game',
	'game.gameover'
)
.defines(function()
{
	LD28 = ig.Game.extend(
	{	
	//	music: new ig.Sound('media/music1.*'),

		init: function()
		{
	/*		ig.music.add(this.music);
			ig.music.loop = true;
			ig.music.volume = 0.5;
			ig.music.play();*/

            ig.input.bind(ig.KEY.A, 'left');
            ig.input.bind(ig.KEY.LEFT_ARROW, 'left');

            ig.input.bind(ig.KEY.D, 'right');
            ig.input.bind(ig.KEY.RIGHT_ARROW, 'right');

            ig.input.bind(ig.KEY.S, 'down');
            ig.input.bind(ig.KEY.DOWN_ARROW, 'down');

            ig.input.bind(ig.KEY.W, 'up');
            ig.input.bind(ig.KEY.UP_ARROW, 'up');

            ig.input.bind(ig.KEY.MOUSE1, 'click1');
            ig.input.bind(ig.KEY.MOUSE2, 'click2');
		},

		update: function()
		{
			this.parent();

           	ig.system.setGame(Game);
		},
	});

    if (ig.ua.mobile)
        ig.Sound.enabled = false;

	ig.Sound.use = [ ig.Sound.FORMAT.OGG, ig.Sound.FORMAT.M4A ];

	ig.main('#canvas', LD28, 60, 512, 384, 2);

});
