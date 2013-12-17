ig.module
(
	'game.button'
)
.requires
(
)
.defines(function ()
{
    Button = ig.Class.extend(
    {
        width: 64,
        hwidth: 32,
        height: 12,

        button: new ig.Image('media/button1.png'),

        font: new ig.Font('media/04b03.font.png'),

        x: 0,
        y: 0,
        text: '',
        hover_text: '',
        hover: false,
        id: '',
        user_data: 0,

        init: function(x, y, text, hover_text, id, user_data)
        {
            this.x = x;
            this.y = y;
            this.text = text;
            this.hover_text = hover_text;
            this.id = id;
            this.user_data = user_data;
        },

        update: function()
        {
            if (ig.input.mouse.x >= this.x && ig.input.mouse.x <= this.x + this.width
                && ig.input.mouse.y >= this.y && ig.input.mouse.y <= this.y + this.height)
            {
                this.hover = true;
                ig.game.set_message(this.hover_text);

                if (ig.input.pressed('click1'))
                {
                    ig.game.button_clicked(this.id, this.user_data);
                }
            }
            else
            {
                this.hover = false;
            }

        },

        draw: function()
        {
            this.button.drawTile(this.x, this.y, (this.hover ? 1 : 0), this.width, this.height);
     
            this.font.draw(this.text, this.x + this.hwidth, this.y + 3, ig.Font.ALIGN.CENTER);
        },
    });
});